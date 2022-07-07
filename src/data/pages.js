import { gql } from '@apollo/client';

export const PAGE_FIELDS = gql`
  fragment PageFields on Page {
    children {
      edges {
        node {
          id
          slug
          uri
          ... on Page {
            id
            title
          }
        }
      }
    }
    id
    menuOrder
    parent {
      node {
        id
        slug
        uri
        ... on Page {
          title
        }
      }
    }
    slug
    title
    uri
  }
`;

export const QUERY_ALL_PAGES_INDEX = gql`
  ${PAGE_FIELDS}
  query AllPagesIndex {
    pages(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          ...PageFields
        }
      }
    }
  }
`;

export const QUERY_ALL_PAGES_ARCHIVE = gql`
  ${PAGE_FIELDS}
  query AllPagesIndex {
    pages(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          ...PageFields
        }
      }
    }
  }
`;

export const QUERY_ALL_PAGES = gql`
  ${PAGE_FIELDS}
  query AllPagesIndex {
    pages(first: 10000, where: { hasPassword: false }) {
      edges {
        node {
          ...PageFields
          content
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
        }
      }
    }
  }
`;

export const QUERY_PAGE_BY_URI = gql`
  query PageByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
      children {
        edges {
          node {
            id
            slug
            uri
            ... on Page {
              id
              title
            }
          }
        }
      }
      content
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
      id
      jumboimage {
        headerImage {
          desktop {
            id
            altText
            sizes
            sourceUrl
            srcSet
            mediaDetails {
              height
              width
            }
          }
          mobile {
            id
            altText
            sizes
            sourceUrl
            srcSet
            mediaDetails {
              height
              width
            }
          }
        }
        headerText {
          title
          subtitle
        }
      }
      menuOrder
      parent {
        node {
          id
          slug
          uri
          ... on Page {
            title
          }
        }
      }
      slug
      title
      uri
    }
  }
`;

export const QUERY_PAGE_SEO_BY_URI = gql`
  query PageSEOByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
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

export const QUERY_PAGE_CUSTOMDATA_BY_URI = gql`
  query PageCustomDataByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
      content
      jumboimage {
        headerImage {
          desktop {
            id
            altText
            sizes
            sourceUrl
            srcSet
            mediaDetails {
              height
              width
            }
          }
          mobile {
            id
            altText
            sizes
            sourceUrl
            srcSet
            mediaDetails {
              height
              width
            }
          }
        }
        headerText {
          title
          subtitle
        }
      }
      id
      title
    }
  }
`;

export const QUERY_PAGE_HOME = gql`
  query Home {
    page(id: "/home/", idType: URI) {
      id
      jumbotron {
        journeysToShow {
          ... on Journey {
            id
            slug
          }
        }
      }
      aboutUsBlock {
        auImages {
          main {
            id
            altText
            sizes
            sourceUrl
            srcSet
            mediaDetails {
              width
              height
            }
          }
          secondary {
            id
            altText
            sizes
            sourceUrl
            srcSet
            mediaDetails {
              width
              height
            }
          }
        }
        auContent {
          intro
          title
          description
        }
      }
      featuredBirdsBlock {
        fbTitle
        fbSubtitle
        fbButton
        featuredBirds {
          ... on Bird {
            id
            slug
          }
        }
      }
      findYourJourney {
        fjTitle
        fjSubtitle
        button
        featuredJourneys {
          ... on Journey {
            id
            slug
          }
        }
      }
      tailorMadeBlock {
        tmImage {
          id
          altText
          sizes
          sourceUrl
          srcSet
          mediaDetails {
            width
            height
          }
        }
        tmContent {
          title
          subtitle
          button
        }
      }
      testimonialsBlock {
        testTitle
        testSubtitle
        testimonials {
          name
          testimony
        }
      }
    }
  }
`;
