import SectionRelatedPostCard from './SectionRelatedPostCard';

export default {
  title: 'sections/RelatedPostCard',
  component: SectionRelatedPostCard,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => <SectionRelatedPostCard {...args} />;

export const Journeys = Template.bind({});
Journeys.args = {
  posts: [
    {
      contentTypeName: 'journeys',
      id: 'cG9zdDo5OQ==',
      databaseId: 99,
      date: '2022-05-24T13:37:24',
      slug: 'birdwatching-by-paracas-road-7days-6nights',
      title: 'Birdwatching by Paracas Road 7days/6nights',
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
      excerpt:
        '<p>This trip has been specially designed for lovers of photography and birdwatching at Manu National Park. </p>\n',
      price: 1415,
      programedDates: {
        to: '2022-06-29',
        from: '2022-06-22',
      },
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
    {
      contentTypeName: 'journeys',
      id: 'cG9zdDo5OA==',
      databaseId: 98,
      date: '2022-05-24T13:36:06',
      slug: 'birdwatching-by-tarapoto-road-7days-6nights',
      title: 'Birdwatching by Tarapoto Road 7days/6nights',
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
      excerpt:
        '<p>This trip has been specially designed for lovers of photography and birdwatching at Manu National Park. </p>\n',
      price: 1415,
      programedDates: {
        to: '2022-06-29',
        from: '2022-06-22',
      },
      featuredImage: {
        altText: '',
        caption: null,
        sourceUrl: 'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/1800-1.jpeg',
        srcSet:
          'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/1800-1-300x225.jpeg 300w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/1800-1-1024x768.jpeg 1024w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/1800-1-768x576.jpeg 768w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/1800-1-1536x1152.jpeg 1536w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/1800-1.jpeg 1686w',
        sizes: '(max-width: 300px) 100vw, 300px',
        id: 'cG9zdDozNA==',
      },
    },
    {
      contentTypeName: 'journeys',
      id: 'cG9zdDo5Nw==',
      databaseId: 97,
      date: '2022-05-24T13:35:26',
      slug: 'birdwatching-through-the-andes-road-7days-6nights',
      title: 'Birdwatching through the Andes Road 7days/6nights',
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
      excerpt:
        '<p>This trip has been specially designed for lovers of photography and birdwatching at Manu National Park. </p>\n',
      price: 1415,
      programedDates: {
        to: '2022-06-29',
        from: '2022-06-22',
      },
      featuredImage: {
        altText: '',
        caption: null,
        sourceUrl: 'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/Andean-Condor-3-650x425-1.jpeg',
        srcSet:
          'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/Andean-Condor-3-650x425-1-300x196.jpeg 300w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/Andean-Condor-3-650x425-1.jpeg 650w',
        sizes: '(max-width: 300px) 100vw, 300px',
        id: 'cG9zdDo0Ng==',
      },
    },
  ],
};
