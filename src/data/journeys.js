import { gql } from '@apollo/client';

export const JOURNEY_FIELDS = gql`
  fragment JourneyFields on Journey {
    contentTypeName
    id
    databaseId
    date
    slug
    title
    regions {
      nodes {
        databaseId
        id
        name
        slug
      }
    }
  }
`;

export const JOURNEY_INFO = gql`
  fragment JourneyInfo on Journey {
    journeyInfo {
      accomodation {
        accomodation {
          name
          url
        }
        destination
      }
      birdsToWatch {
        ... on Bird {
          id
          slug
        }
      }
      destinations {
        name
        url
      }
      itinerary {
        content
        day
        title
      }
      mapEmbed
      price
      programedDates {
        from
        to
      }
      toursInclusions
    }
  }
`;

export const QUERY_ALL_JOURNEYS_INDEX = gql`
  ${JOURNEY_FIELDS}
  query AllJourneysIndex {
    journeys(first: 10000, where: { hasPassword: false }) {
      nodes {
        ...JourneyFields
      }
    }
  }
`;

export const QUERY_ALL_JOURNEYS_ARCHIVE = gql`
  ${JOURNEY_FIELDS}
  query AllJourneysArchive {
    journeys(first: 10000, where: { hasPassword: false }) {
      nodes {
        ...JourneyFields
        excerpt
        journeyInfo {
          price
          programedDates {
            to
            from
          }
          birdsToWatch {
            ... on Bird {
              id
              slug
            }
          }
        }
        featuredImage {
          node {
            altText
            caption
            sourceUrl
            srcSet
            sizes
            id
          }
        }
      }
    }
  }
`;

export const QUERY_ALL_JOURNEYS = gql`
  ${JOURNEY_FIELDS}
  ${JOURNEY_INFO}
  query AllJourneys {
    journeys(first: 10000, where: { hasPassword: false }) {
      nodes {
        ...JourneyFields
        ...JourneyInfo
        content
        excerpt
        featuredImage {
          node {
            altText
            caption
            sourceUrl
            srcSet
            sizes
            id
          }
        }
        modified
      }
    }
  }
`;

export const QUERY_JOURNEY_BY_SLUG = gql`
  ${JOURNEY_FIELDS}
  ${JOURNEY_INFO}
  query JourneyBySlug($slug: ID!) {
    journey(id: $slug, idType: SLUG) {
      ...JourneyFields
      ...JourneyInfo
      content
      excerpt
      featuredImage {
        node {
          altText
          caption
          sourceUrl
          srcSet
          sizes
          id
        }
      }
      modified
      gallery {
        galleryDesktop {
          altText
          sourceUrl
          srcSet
          sizes
          id
          mediaDetails {
            height
            width
          }
        }
        galleryMobile {
          altText
          sourceUrl
          srcSet
          sizes
          id
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
`;

export const QUERY_JOURNEYS_BY_AUTHOR_SLUG_INDEX = gql`
  ${JOURNEY_FIELDS}
  query JourneyByAuthorSlugIndex($slug: String!) {
    journeys(where: { authorName: $slug, hasPassword: false }) {
      nodes {
        ...JourneyFields
      }
    }
  }
`;

export const QUERY_JOURNEYS_BY_AUTHOR_SLUG_ARCHIVE = gql`
  ${JOURNEY_FIELDS}
  query JourneyByAuthorSlugArchive($slug: String!) {
    journeys(where: { authorName: $slug, hasPassword: false }) {
      nodes {
        ...JourneyFields
        excerpt
        journeyInfo {
          price
          programedDates {
            to
            from
          }
        }
      }
    }
  }
`;

export const QUERY_JOURNEYS_BY_AUTHOR_SLUG = gql`
  ${JOURNEY_FIELDS}
  ${JOURNEY_INFO}
  query JourneyByAuthorSlug($slug: String!) {
    journeys(where: { authorName: $slug, hasPassword: false }) {
      nodes {
        ...JourneyFields
        ...JourneyInfo
        content
        excerpt
        featuredImage {
          node {
            altText
            caption
            sourceUrl
            srcSet
            sizes
            id
          }
        }
        modified
      }
    }
  }
`;

export const QUERY_JOURNEY_SEO_BY_SLUG = gql`
  query JourneySEOBySlug($slug: ID!) {
    journey(id: $slug, idType: SLUG) {
      id
      seo {
        canonical
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        opengraphModifiedTime
        opengraphPublishedTime
        opengraphPublisher
        opengraphTitle
        opengraphType
        readingTime
        title
        twitterDescription
        twitterTitle
        twitterImage {
          altText
          sourceUrl
          mediaDetails {
            width
            height
          }
        }
        opengraphImage {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
`;

// export const QUERY_JOURNEY_PER_PAGE = gql`
//   query JourneyPerPage {
//     allSettings {
//       readingSettingsJourneysPerPage
//     }
//   }
// `;
