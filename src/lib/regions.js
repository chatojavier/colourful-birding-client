import { getApolloClient } from 'lib/apollo-client';

import { QUERY_ALL_REGIONS, QUERY_REGION_BY_SLUG, QUERY_REGION_SEO_BY_SLUG } from 'data/regions';

/**
 * regionPathBySlug
 */

export function regionPathBySlug(slug) {
  return `/regions/${slug}`;
}

/**
 * getAllRegions
 */

export async function getAllRegions() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_REGIONS,
  });

  const regions = data?.data.regions.edges.map(({ node = {} }) => node);

  return {
    regions,
  };
}

/**
 * getRegionBySlug
 */

export async function getRegionBySlug(slug) {
  const apolloClient = getApolloClient();
  const apiHost = new URL(process.env.WORDPRESS_GRAPHQL_ENDPOINT).host;

  let regionData;
  let seoData;

  try {
    regionData = await apolloClient.query({
      query: QUERY_REGION_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (e) {
    console.log(`[regions][getRegionBySlug] Failed to query region data: ${e.message}`);
    throw e;
  }

  const region = mapRegionData(regionData?.data.region);

  // If the SEO plugin is enabled, look up the data
  // and apply it to the default settings

  if (process.env.WORDPRESS_PLUGIN_SEO === true) {
    try {
      seoData = await apolloClient.query({
        query: QUERY_REGION_SEO_BY_SLUG,
        variables: {
          slug,
        },
      });
    } catch (e) {
      console.log(`[regions][getRegionBySlug] Failed to query SEO plugin: ${e.message}`);
      console.log('Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.');
      throw e;
    }

    const { seo = {} } = seoData?.data?.region || {};

    region.title = seo.title;
    region.description = seo.metaDesc;

    // The SEO plugin by default includes a canonical link, but we don't want to use that
    // because it includes the WordPress host, not the site host. We manage the canonical
    // link along with the other metadata, but explicitly check if there's a custom one
    // in here by looking for the API's host in the provided canonical link

    if (seo.canonical && !seo.canonical.includes(apiHost)) {
      region.canonical = seo.canonical;
    }

    region.og = {
      author: seo.opengraphAuthor,
      description: seo.opengraphDescription,
      image: seo.opengraphImage,
      modifiedTime: seo.opengraphModifiedTime,
      publishedTime: seo.opengraphPublishedTime,
      publisher: seo.opengraphPublisher,
      title: seo.opengraphTitle,
      type: seo.opengraphType,
    };

    region.article = {
      author: region.og.author,
      modifiedTime: region.og.modifiedTime,
      publishedTime: region.og.publishedTime,
      publisher: region.og.publisher,
    };

    region.robots = {
      nofollow: seo.metaRobotsNofollow,
      noindex: seo.metaRobotsNoindex,
    };

    region.twitter = {
      description: seo.twitterDescription,
      image: seo.twitterImage,
      title: seo.twitterTitle,
    };
  }

  return {
    region,
  };
}

/**
 * getRegions
 */

export async function getRegions({ count } = {}) {
  const { regions } = await getAllRegions();
  return {
    regions: regions.slice(0, count),
  };
}

/**
 * mapRegionData
 */

export function mapRegionData(region = {}) {
  const data = { ...region };
  return data;
}
