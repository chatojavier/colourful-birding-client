import { SiteContext } from 'hooks/use-site';
import Footer from './Footer';

export default {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
};

const initialValues = {
  metadata: {
    title: 'Colourful Birding',
    siteTitle: 'Colourful Birding',
    description: 'Multiflash Birding Photography',
    language: 'en',
    social: {
      facebook: 'https://facebook.com/colourfulperu',
      twitter: {
        url: 'https://twitter.com/',
      },
    },
    webmaster: {},
    twitter: {
      username: '',
      cardType: 'summary_large_image',
    },
    og: {
      url: 'https://colourfulbirding.com/birds/',
    },
  },
  recentPosts: [
    {
      __typename: 'Post',
      contentTypeName: 'post',
      id: 'cG9zdDoxOTg=',
      categories: [
        {
          __typename: 'Category',
          databaseId: 1,
          id: 'dGVybTox',
          name: 'Uncategorized',
          slug: 'uncategorized',
        },
      ],
      databaseId: 198,
      date: '2022-06-22T14:43:27',
      isSticky: false,
      postId: 198,
      slug: 'diam-donec-adipiscing-tristique',
      title: 'Diam donec adipiscing tristique',
    },
    {
      __typename: 'Post',
      contentTypeName: 'post',
      id: 'cG9zdDoxOTY=',
      categories: [
        {
          __typename: 'Category',
          databaseId: 1,
          id: 'dGVybTox',
          name: 'Uncategorized',
          slug: 'uncategorized',
        },
      ],
      databaseId: 196,
      date: '2022-06-22T14:42:15',
      isSticky: false,
      postId: 196,
      slug: 'tellus-molestie-nunc-non-blandit',
      title: 'Tellus molestie nunc non blandit',
    },
    {
      __typename: 'Post',
      contentTypeName: 'post',
      id: 'cG9zdDoxOTM=',
      categories: [
        {
          __typename: 'Category',
          databaseId: 1,
          id: 'dGVybTox',
          name: 'Uncategorized',
          slug: 'uncategorized',
        },
      ],
      databaseId: 193,
      date: '2022-06-22T14:40:37',
      isSticky: false,
      postId: 193,
      slug: 'cum-sociis-natoque-penatibus-et-magnis',
      title: 'Cum sociis natoque penatibus et magnis.',
    },
    {
      __typename: 'Post',
      contentTypeName: 'post',
      id: 'cG9zdDoxOTA=',
      categories: [
        {
          __typename: 'Category',
          databaseId: 1,
          id: 'dGVybTox',
          name: 'Uncategorized',
          slug: 'uncategorized',
        },
      ],
      databaseId: 190,
      date: '2022-06-22T14:38:55',
      isSticky: false,
      postId: 190,
      slug: 'convallis-aenean-et-tortor-at-risus-viverra',
      title: 'Convallis aenean et tortor at risus viverra.',
    },
    {
      __typename: 'Post',
      contentTypeName: 'post',
      id: 'cG9zdDox',
      categories: [
        {
          __typename: 'Category',
          databaseId: 1,
          id: 'dGVybTox',
          name: 'Uncategorized',
          slug: 'uncategorized',
        },
      ],
      databaseId: 1,
      date: '2022-05-05T02:25:05',
      isSticky: false,
      postId: 1,
      slug: 'hello-world',
      title: 'Mauris nunc congue nisi vitae.',
    },
  ],
  categories: [
    {
      __typename: 'Category',
      databaseId: 1,
      description: null,
      id: 'dGVybTox',
      name: 'Uncategorized',
      slug: 'uncategorized',
    },
  ],
  menus: [
    {
      __typename: 'Menu',
      id: 'dGVybTo4',
      menuItems: [
        {
          __typename: 'MenuItem',
          cssClasses: [],
          id: 'cG9zdDoxNDU=',
          parentId: null,
          label: 'Information & Local Regulations',
          title: null,
          target: null,
          path: '/information-local-regulations/',
        },
        {
          __typename: 'MenuItem',
          cssClasses: [],
          id: 'cG9zdDoxNDQ=',
          parentId: null,
          label: 'Privacy Policy',
          title: null,
          target: null,
          path: '/privacy-policy/',
        },
        {
          __typename: 'MenuItem',
          cssClasses: [],
          id: 'cG9zdDoxNDY=',
          parentId: null,
          label: 'Terms & Conditions',
          title: null,
          target: null,
          path: '/terms-conditions/',
        },
      ],
      name: 'footer',
      slug: 'footer',
      locations: ['FOOTER_MENU'],
    },
    {
      __typename: 'Menu',
      id: 'dGVybTo2',
      menuItems: [
        {
          __typename: 'MenuItem',
          cssClasses: [],
          id: 'cG9zdDoxMjk=',
          parentId: null,
          label: 'Birds',
          title: null,
          target: null,
          path: '/birds',
        },
        {
          __typename: 'MenuItem',
          cssClasses: [],
          id: 'cG9zdDoxMzA=',
          parentId: null,
          label: 'Suggested Journeys',
          title: null,
          target: null,
          path: '/journeys',
        },
        {
          __typename: 'MenuItem',
          cssClasses: [],
          id: 'cG9zdDoxMzE=',
          parentId: null,
          label: 'Tailor-Made Journey',
          title: null,
          target: null,
          path: '/contact',
        },
        {
          __typename: 'MenuItem',
          cssClasses: [],
          id: 'cG9zdDoxMjg=',
          parentId: null,
          label: 'Contact',
          title: null,
          target: null,
          path: '/contact/',
        },
        {
          __typename: 'MenuItem',
          cssClasses: [],
          id: 'cG9zdDoxMzI=',
          parentId: null,
          label: 'Blog',
          title: null,
          target: null,
          path: '/posts',
        },
      ],
      name: 'header',
      slug: 'header',
      locations: ['MAIN_MENU'],
    },
    {
      menuItems: [
        {
          label: 'Birds',
          path: '/pagebirds/',
          id: 'cG9zdDoxNzA=',
        },
        {
          label: 'Journeys',
          path: '/pagejourneys/',
          id: 'cG9zdDoxNTU=',
        },
        {
          label: 'Information & Local Regulations',
          path: '/information-local-regulations/',
          id: 'cG9zdDoxMzc=',
        },
        {
          label: 'Terms & Conditions',
          path: '/terms-conditions/',
          id: 'cG9zdDoxMzQ=',
        },
        {
          label: 'Contact',
          path: '/contact/',
          id: 'cG9zdDoxMjU=',
        },
        {
          label: 'Home',
          path: '/',
          id: 'cG9zdDoxMDU=',
        },
        {
          label: 'Privacy Policy',
          path: '/privacy-policy/',
          id: 'cG9zdDoz',
        },
      ],
      locations: ['DEFAULT_NAVIGATION'],
    },
  ],
  homepage: 'https://colourfulbirding.com',
};

export const Default = (args) => (
  <SiteContext.Provider value={initialValues}>
    <Footer {...args} />
  </SiteContext.Provider>
);
