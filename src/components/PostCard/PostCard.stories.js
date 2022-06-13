import PostCard from './PostCard';

export default {
  title: 'components/PostCard',
  component: PostCard,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => <PostCard {...args} />;

export const Journeys = Template.bind({});
Journeys.args = {
  post: {
    contentTypeName: 'journeys',
    title: 'Birdwatching by Paracas Road 7days/6nights',
    excerpt:
      '<p>This trip has been specially designed for lovers of photography and birdwatching at Manu National Park. </p>\n',
    slug: 'birdwatching-by-paracas-road-7days-6nights',
    date: '2022-05-24T13:37:24',
    author: {
      avatar: {
        height: 96,
        url: 'https://secure.gravatar.com/avatar/c2b06ae950033b392998ada50767b50e?s=96&d=mm&r=g',
        width: 96,
      },
      id: 'dXNlcjox',
      name: 'colourful',
      slug: 'colourful',
    },
    regions: [
      {
        databaseId: 4,
        id: 'dGVybTo0',
        name: 'Mountains',
        slug: 'mountains',
      },
      {
        databaseId: 3,
        id: 'dGVybToz',
        name: 'Rainforest',
        slug: 'rainforest',
      },
    ],
    featuredImage: {
      altText: '',
      caption: null,
      sourceUrl: 'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/1800-3.jpeg',
      srcSet:
        'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/1800-3-300x225.jpeg 300w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/1800-3-1024x768.jpeg 1024w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/1800-3-768x576.jpeg 768w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/1800-3-1536x1152.jpeg 1536w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/1800-3.jpeg 1800w',
      sizes: '(max-width: 300px) 100vw, 300px',
      id: 'cG9zdDo0NA==',
    },
    programedDates: {
      to: '2022-06-29',
      from: '2022-06-22',
    },
  },
  options: {
    excludeMetadata: ['categories'],
  },
};

export const Posts = Template.bind({});
Posts.args = {
  post: {
    contentTypeName: 'post',
    title: 'Birdwatching by Paracas Road 7days/6nights',
    excerpt:
      '<p>This trip has been specially designed for lovers of photography and birdwatching at Manu National Park. </p>\n',
    slug: 'birdwatching-by-paracas-road-7days-6nights',
    date: '2022-05-24T13:37:24',
    author: {
      avatar: {
        height: 96,
        url: 'https://secure.gravatar.com/avatar/c2b06ae950033b392998ada50767b50e?s=96&d=mm&r=g',
        width: 96,
      },
      id: 'dXNlcjox',
      name: 'colourful',
      slug: 'colourful',
    },
    regions: [
      {
        databaseId: 4,
        id: 'dGVybTo0',
        name: 'Mountains',
        slug: 'mountains',
      },
      {
        databaseId: 3,
        id: 'dGVybToz',
        name: 'Rainforest',
        slug: 'rainforest',
      },
    ],
    featuredImage: {
      altText: '',
      caption: null,
      sourceUrl: 'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/1800-3.jpeg',
      srcSet:
        'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/1800-3-300x225.jpeg 300w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/1800-3-1024x768.jpeg 1024w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/1800-3-768x576.jpeg 768w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/1800-3-1536x1152.jpeg 1536w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/1800-3.jpeg 1800w',
      sizes: '(max-width: 300px) 100vw, 300px',
      id: 'cG9zdDo0NA==',
    },
  },
};
