import { gql } from '@apollo/client';

export const QUERY_ALL_REGIONS = gql`
  {
    regions(first: 10000) {
      edges {
        node {
          databaseId
          description
          id
          name
          slug
        }
      }
    }
  }
`;

export const QUERY_REGION_BY_SLUG = gql`
  query RegionBySlug($slug: ID!) {
    region(id: $slug, idType: SLUG) {
      databaseId
      description
      id
      name
      slug
    }
  }
`;

export const QUERY_REGION_SEO_BY_SLUG = gql`
  query RegionSEOBySlug($slug: ID!) {
    region(id: $slug, idType: SLUG) {
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
