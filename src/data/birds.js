import { gql } from '@apollo/client';

export const BIRD_FIELDS = gql`
  fragment BirdFields on Bird {
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

export const QUERY_ALL_BIRDS_INDEX = gql`
  ${BIRD_FIELDS}
  query AllBirdsIndex {
    birds(first: 10000, where: { hasPassword: false }) {
      nodes {
        ...BirdFields
      }
    }
  }
`;

export const QUERY_ALL_BIRDS_ARCHIVE = gql`
  ${BIRD_FIELDS}
  query AllBirdsArchive {
    birds(first: 10000, where: { hasPassword: false }) {
      nodes {
        ...BirdFields
        birdInfo {
          familyName
        }
      }
    }
  }
`;

export const QUERY_ALL_BIRDS = gql`
  ${BIRD_FIELDS}
  query AllBirds {
    birds(first: 10000, where: { hasPassword: false }) {
      nodes {
        ...BirdFields
        content
        excerpt
        birdInfo {
          familyName
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
        modified
      }
    }
  }
`;

export const QUERY_BIRD_BY_SLUG = gql`
  ${BIRD_FIELDS}
  query BirdBySlug($slug: ID!) {
    bird(id: $slug, idType: SLUG) {
      ...BirdFields
      content
      excerpt
      birdInfo {
        familyName
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
      modified
    }
  }
`;

export const QUERY_BIRDS_BY_AUTHOR_SLUG_INDEX = gql`
  ${BIRD_FIELDS}
  query BirdByAuthorSlugIndex($slug: String!) {
    birds(where: { authorName: $slug, hasPassword: false }) {
      nodes {
        ...BirdFields
      }
    }
  }
`;

export const QUERY_BIRDS_BY_AUTHOR_SLUG_ARCHIVE = gql`
  ${BIRD_FIELDS}
  query BirdByAuthorSlugArchive($slug: String!) {
    birds(where: { authorName: $slug, hasPassword: false }) {
      nodes {
        ...BirdFields
        birdInfo {
          familyName
        }
      }
    }
  }
`;

export const QUERY_BIRDS_BY_AUTHOR_SLUG = gql`
  ${BIRD_FIELDS}
  query BirdByAuthorSlug($slug: String!) {
    birds(where: { authorName: $slug, hasPassword: false }) {
      nodes {
        ...BirdFields
        excerpt
        featuredImage {
          node {
            altText
            caption
            id
            sizes
            sourceUrl
            srcSet
          }
        }
        modified
      }
    }
  }
`;

export const QUERY_BIRD_SEO_BY_SLUG = gql`
  query BirdSEOBySlug($slug: ID!) {
    bird(id: $slug, idType: SLUG) {
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
