import { getApolloClient } from 'lib/apollo-client';
import { sortObjectsByDate } from 'lib/datetime';

import {
  QUERY_ALL_JOURNEYS_INDEX,
  QUERY_ALL_JOURNEYS_ARCHIVE,
  QUERY_ALL_JOURNEYS,
  QUERY_JOURNEY_BY_SLUG,
  QUERY_JOURNEY_SEO_BY_SLUG,
} from 'data/journeys';
import { sortObjectsRamdomly } from './util';

/**
 * journeyPathBySlug
 */

export function journeyPathBySlug(slug) {
  return `/journeys/${slug}`;
}

/**
 * getJourneyBySlug
 */

export async function getJourneyBySlug(slug) {
  const apolloClient = getApolloClient();
  const apiHost = new URL(process.env.WORDPRESS_GRAPHQL_ENDPOINT).host;

  let journeyData;
  let seoData;

  try {
    journeyData = await apolloClient.query({
      query: QUERY_JOURNEY_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (e) {
    console.log(`[journeys][getJourneyBySlug] Failed to query journey data: ${e.message}`);
    throw e;
  }

  if (!journeyData?.data.journey) return { bird: null };

  // Clean up nested properties to make more east to access

  const journey = [journeyData?.data.journey].map(mapJourneyData)[0];

  // If the SEO plugin is enabled, look up the data
  // and apply it to the default settings

  if (process.env.WORDPRESS_PLUGIN_SEO === true) {
    try {
      seoData = await apolloClient.query({
        query: QUERY_JOURNEY_SEO_BY_SLUG,
        variables: {
          slug,
        },
      });
    } catch (e) {
      console.log(`[journeys][getJourneyBySlug] Failed to query SEO plugin: ${e.message}`);
      console.log('Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.');
      throw e;
    }

    const { seo = {} } = seoData?.data?.journey || {};

    journey.metaTitle = seo.title;
    journey.metaDescription = seo.metaDesc;
    journey.readingTime = seo.readingTime;

    // The SEO plugin by default includes a canonical link, but we don't want to use that
    // because it includes the WordPress host, not the site host. We manage the canonical
    // link along with the other metadata, but explicitly check if there's a custom one
    // in here by looking for the API's host in the provided canonical link

    if (seo.canonical && !seo.canonical.includes(apiHost)) {
      journey.canonical = seo.canonical;
    }

    journey.og = {
      author: seo.opengraphAuthor,
      description: seo.opengraphDescription,
      image: seo.opengraphImage,
      modifiedTime: seo.opengraphModifiedTime,
      publishedTime: seo.opengraphPublishedTime,
      publisher: seo.opengraphPublisher,
      title: seo.opengraphTitle,
      type: seo.opengraphType,
    };

    journey.article = {
      author: journey.og.author,
      modifiedTime: journey.og.modifiedTime,
      publishedTime: journey.og.publishedTime,
      publisher: journey.og.publisher,
    };

    journey.robots = {
      nofollow: seo.metaRobotsNofollow,
      noindex: seo.metaRobotsNoindex,
    };

    journey.twitter = {
      description: seo.twitterDescription,
      image: seo.twitterImage,
      title: seo.twitterTitle,
    };
  }

  return {
    journey,
  };
}

/**
 * getAllJourneys
 */

const allJourneysIncludesTypes = {
  all: QUERY_ALL_JOURNEYS,
  archive: QUERY_ALL_JOURNEYS_ARCHIVE,
  index: QUERY_ALL_JOURNEYS_INDEX,
};

export async function getAllJourneys(options = {}) {
  const { queryIncludes = 'index' } = options;

  const apolloClient = getApolloClient();

  const journeysData = await apolloClient.query({
    query: allJourneysIncludesTypes[queryIncludes],
  });

  const journeys = journeysData?.data.journeys.nodes;

  return {
    journeys: Array.isArray(journeys) && journeys.map(mapJourneyData),
  };
}

/**
 * getJourneysByRegionId
 */

export async function getJourneysByRegionId({ regionId, ...options }) {
  const { journeys } = await getAllJourneys(options);
  const journeysByRegion = journeys.filter((journey) =>
    journey.regions.some((region) => region.databaseId === regionId)
  );

  return {
    journeys: journeysByRegion,
  };
}

/**
 * getRecentJourneys
 */

export async function getRecentJourneys({ count, ...options }) {
  const { journeys } = await getAllJourneys(options);
  const sorted = sortObjectsByDate(journeys);
  return {
    journeys: sorted.slice(0, count),
  };
}

/**
 * getRandomJourneys
 */

export async function getRandomJourneys({ count, ...options }) {
  const { journeys } = await getAllJourneys(options);
  const sorted = sortObjectsRamdomly(journeys);
  return {
    journeys: sorted.slice(0, count),
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
 * mapJourneyData
 */

export function mapJourneyData(journey = {}) {
  let data = { ...journey };

  // Clean up regions to make more easy o access

  if (data.regions) {
    data.regions = data.regions.nodes;
  }

  // Clean up journeyInfo to make more easy o access

  if (data.journeyInfo) {
    const NewJourneyInfo = data.journeyInfo;
    delete data.journeyInfo;
    data = { ...data, ...NewJourneyInfo };
  }

  // Clean up the featured image to make them more easy to access

  if (data.featuredImage) {
    data.featuredImage = data.featuredImage.node;
  }

  return data;
}

/**
 * getRelatedJourneys
 */

export async function getRelatedJourneys(regions, journeyId, count = 5) {
  if (!Array.isArray(regions) || regions.length === 0) return;

  const regionsUpdated = [...regions];
  let related = {
    region: regionsUpdated.shift(),
  };

  if (related.region) {
    const { journeys } = await getJourneysByRegionId({
      regionId: related.region.databaseId,
      queryIncludes: 'archive',
    });

    const filtered = journeys.filter(({ databaseId }) => databaseId !== journeyId);
    filtered.length > 1 && sortObjectsRamdomly(filtered);

    related.journeys = filtered.map((journey) => ({
      title: journey.title,
      slug: journey.slug,
      featuredImage: journey.featuredImage,
      contentTypeName: journey.contentTypeName,
      programedDates: journey.programedDates,
    }));
  }

  if (!Array.isArray(related.journeys) || related.journeys.length === 0) {
    const relatedJourneys = await getRelatedJourneys(regionsUpdated, journeyId, count);
    related = relatedJourneys || related;
  }

  if (Array.isArray(related.journeys) && related.journeys.length > count) {
    related.journeys = related.journeys.slice(0, count);
  }

  return related;
}

/**
 * getJourneysPerPage
 */

export function getJourneysPerPage() {
  //If JOURNEY_PER_PAGE is defined at next.config.js
  if (process.env.JOURNEYS_PER_PAGE) {
    return Number(process.env.JOURNEYS_PER_PAGE);
  }
  return 4;
}

/**
 * getPageCount
 */

export function getPagesCount(journeys, journeysPerPage) {
  const _journeysPerPage = journeysPerPage ?? getJourneysPerPage();
  return Math.ceil(journeys.length / _journeysPerPage);
}

/**
 * getPaginatedJourneys
 */

export async function getPaginatedJourneys({ currentPage = 1, ...options } = {}) {
  const { journeys } = await getAllJourneys(options);
  const journeysPerPage = getJourneysPerPage();
  const pagesCount = getPagesCount(journeys, journeysPerPage);
  let page = Number(currentPage);
  if (typeof page === 'undefined' || isNaN(page) || page > pagesCount) {
    page = 1;
  }
  const offset = journeysPerPage * (page - 1);
  return {
    journeys: journeys.slice(offset, offset + journeysPerPage),
    pagination: {
      currentPage: page,
      pagesCount,
    },
  };
}
