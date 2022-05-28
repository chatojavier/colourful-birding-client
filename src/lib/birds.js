import { getApolloClient } from 'lib/apollo-client';
import { sortObjectsByDate } from 'lib/datetime';
import { sortObjectsRamdomly } from 'lib/util';

import {
  QUERY_ALL_BIRDS_INDEX,
  QUERY_ALL_BIRDS_ARCHIVE,
  QUERY_ALL_BIRDS,
  QUERY_BIRD_BY_SLUG,
  QUERY_BIRD_SEO_BY_SLUG,
} from 'data/birds';

/**
 * birdPathBySlug
 */

export function birdPathBySlug(slug) {
  return `/birds/${slug}`;
}

/**
 * getBirdBySlug
 */

export async function getBirdBySlug(slug) {
  const apolloClient = getApolloClient();
  const apiHost = new URL(process.env.WORDPRESS_GRAPHQL_ENDPOINT).host;

  let birdData;
  let seoData;

  try {
    birdData = await apolloClient.query({
      query: QUERY_BIRD_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (e) {
    console.log(`[birds][getBirdBySlug] Failed to query bird data: ${e.message}`);
    throw e;
  }

  // Clean up nested properties to make more east to access

  const bird = [birdData?.data.bird].map(mapBirdData)[0];

  // If the SEO plugin is enabled, look up the data
  // and apply it to the default settings

  if (process.env.WORDPRESS_PLUGIN_SEO === true) {
    try {
      seoData = await apolloClient.query({
        query: QUERY_BIRD_SEO_BY_SLUG,
        variables: {
          slug,
        },
      });
    } catch (e) {
      console.log(`[birds][getBirdBySlug] Failed to query SEO plugin: ${e.message}`);
      console.log('Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.');
      throw e;
    }

    const { seo = {} } = seoData?.data?.bird || {};

    bird.metaTitle = seo.title;
    bird.metaDescription = seo.metaDesc;
    bird.readingTime = seo.readingTime;

    // The SEO plugin by default includes a canonical link, but we don't want to use that
    // because it includes the WordPress host, not the site host. We manage the canonical
    // link along with the other metadata, but explicitly check if there's a custom one
    // in here by looking for the API's host in the provided canonical link

    if (seo.canonical && !seo.canonical.includes(apiHost)) {
      bird.canonical = seo.canonical;
    }

    bird.og = {
      author: seo.opengraphAuthor,
      description: seo.opengraphDescription,
      image: seo.opengraphImage,
      modifiedTime: seo.opengraphModifiedTime,
      publishedTime: seo.opengraphPublishedTime,
      publisher: seo.opengraphPublisher,
      title: seo.opengraphTitle,
      type: seo.opengraphType,
    };

    bird.article = {
      author: bird.og.author,
      modifiedTime: bird.og.modifiedTime,
      publishedTime: bird.og.publishedTime,
      publisher: bird.og.publisher,
    };

    bird.robots = {
      nofollow: seo.metaRobotsNofollow,
      noindex: seo.metaRobotsNoindex,
    };

    bird.twitter = {
      description: seo.twitterDescription,
      image: seo.twitterImage,
      title: seo.twitterTitle,
    };
  }

  return {
    bird,
  };
}

/**
 * getAllBirds
 */

const allBirdsIncludesTypes = {
  all: QUERY_ALL_BIRDS,
  archive: QUERY_ALL_BIRDS_ARCHIVE,
  index: QUERY_ALL_BIRDS_INDEX,
};

export async function getAllBirds(options = {}) {
  const { queryIncludes = 'index' } = options;

  const apolloClient = getApolloClient();

  const birdsData = await apolloClient.query({
    query: allBirdsIncludesTypes[queryIncludes],
  });

  const birds = birdsData?.data.birds.nodes;

  return {
    birds: Array.isArray(birds) && birds.map(mapBirdData),
  };
}

/**
 * getBirdsByRegionId
 */

export async function getBirdsByRegionId({ regionId, ...options }) {
  const { birds } = await getAllBirds(options);
  const birdsByRegion = birds.filter((bird) => bird.regions.some((region) => region.databaseId === regionId));
  console.log(birdsByRegion);

  return {
    birds: birdsByRegion,
  };
}

/**
 * getRecentBirds
 */

export async function getRecentBirds({ count, ...options }) {
  const { birds } = await getAllBirds(options);
  const sorted = sortObjectsByDate(birds);
  return {
    birds: sorted.slice(0, count),
  };
}

/**
 * sanitizeExcerpt
 */

export function sanitizeExcerpt(excerpt) {
  if (typeof excerpt !== 'string') {
    throw new Error(`Failed to sanitize excerpt: invalid type ${typeof excerpt}`);
  }

  let sanitized = excerpt;

  // If the theme includes [...] as the more indication, clean it up to just ...

  sanitized = sanitized.replace(/\s?\[&hellip;\]/, '&hellip;');

  // If after the above replacement, the ellipsis includes 4 dots, it's
  // the end of a setence

  sanitized = sanitized.replace('....', '.');
  sanitized = sanitized.replace('.&hellip;', '.');

  // If the theme is including a "Continue..." link, remove it

  sanitized = sanitized.replace(/\w*<a class="more-link".*<\/a>/, '');

  return sanitized;
}

/**
 * mapBirdData
 */

export function mapBirdData(bird = {}) {
  let data = { ...bird };

  // Clean up regions to make more easy o access

  if (data.regions) {
    data.regions = data.regions.nodes;
  }

  // Clean up birdInfo to make more easy o access

  if (data.birdInfo) {
    const NewBirdInfo = data.birdInfo;
    delete data.birdInfo;
    data = { ...data, ...NewBirdInfo };
  }

  // Clean up the featured image to make them more easy to access

  if (data.featuredImage) {
    data.featuredImage = data.featuredImage.node;
  }

  return data;
}

/**
 * getRelatedBirds
 */

export async function getRelatedBirds(regions, birdId, count = 5) {
  if (!Array.isArray(regions) || regions.length === 0) return;

  let related = {
    region: regions && [...regions].shift(),
  };

  if (related.region) {
    const { birds } = await getBirdsByRegionId({
      regionId: related.region.databaseId,
      queryIncludes: 'archive',
    });

    const filtered = birds.filter(({ databaseId }) => databaseId !== birdId);
    sortObjectsRamdomly(filtered);

    related.birds = filtered.map((bird) => ({ title: bird.title, slug: bird.slug }));
  }

  if (!Array.isArray(related.birds) || related.birds.length === 0) {
    const relatedBirds = await getRelatedBirds(regions, birdId, count);
    related = relatedBirds || related;
  }

  if (Array.isArray(related.birds) && related.birds.length > count) {
    return related.birds.slice(0, count);
  }

  return related;
}

/**
 * getBirdsPerPage
 */

export function getBirdsPerPage() {
  //If BIRD_PER_PAGE is defined at next.config.js
  if (process.env.BIRDS_PER_PAGE) {
    return Number(process.env.BIRDS_PER_PAGE);
  }
  return 16;
}

/**
 * getPageCount
 */

export function getPagesCount(birds, birdsPerPage) {
  const _birdsPerPage = birdsPerPage ?? getBirdsPerPage();
  return Math.ceil(birds.length / _birdsPerPage);
}

/**
 * getPaginatedBirds
 */

export async function getPaginatedBirds({ currentPage = 1, ...options } = {}) {
  const { birds } = await getAllBirds(options);
  const birdsPerPage = getBirdsPerPage();
  const pagesCount = getPagesCount(birds, birdsPerPage);
  let page = Number(currentPage);
  if (typeof page === 'undefined' || isNaN(page) || page > pagesCount) {
    page = 1;
  }
  const offset = birdsPerPage * (page - 1);
  return {
    birds: birds.slice(offset, offset + birdsPerPage),
    pagination: {
      currentPage: page,
      pagesCount,
    },
  };
}
