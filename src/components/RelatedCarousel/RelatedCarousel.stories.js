import SectionRelatedCarousel from './RelatedCarousel';

export default {
  title: 'Sections/RelatedCarousel',
  component: SectionRelatedCarousel,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => <SectionRelatedCarousel {...args} />;

export const Birds = Template.bind({});
Birds.args = {
  posts: [
    {
      contentTypeName: 'birds',
      id: 'cG9zdDoyOQ==',
      databaseId: 29,
      date: '2022-05-24T00:21:24',
      slug: 'yellow-scarfed-tanager',
      title: 'Yellow-scarfed tanager',
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
      familyName: 'Thraupidae',
      featuredImage: {
        altText: '',
        caption: null,
        sourceUrl: 'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/be201badf3f1b81ac2a69ba16b895672.jpg',
        srcSet:
          'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/be201badf3f1b81ac2a69ba16b895672-300x201.jpg 300w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/be201badf3f1b81ac2a69ba16b895672.jpg 500w',
        sizes: '(max-width: 300px) 100vw, 300px',
        id: 'cG9zdDo1Mg==',
      },
    },
    {
      contentTypeName: 'birds',
      id: 'cG9zdDoyOA==',
      databaseId: 28,
      date: '2022-05-24T00:13:00',
      slug: 'andean-condor',
      title: 'Andean condor',
      regions: [
        {
          databaseId: 4,
          id: 'dGVybTo0',
          name: 'Mountains',
          slug: 'mountains',
        },
      ],
      familyName: 'Cathartidae',
      featuredImage: {
        altText: '',
        caption: null,
        sourceUrl:
          'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/andean-condor-square-1-scaled.jpg.optimal.jpg',
        srcSet:
          'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/andean-condor-square-1-scaled.jpg.optimal-300x300.jpg 300w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/andean-condor-square-1-scaled.jpg.optimal-1024x1024.jpg 1024w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/andean-condor-square-1-scaled.jpg.optimal-150x150.jpg 150w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/andean-condor-square-1-scaled.jpg.optimal-768x768.jpg 768w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/andean-condor-square-1-scaled.jpg.optimal-1536x1536.jpg 1536w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/andean-condor-square-1-scaled.jpg.optimal-2048x2048.jpg 2048w',
        sizes: '(max-width: 300px) 100vw, 300px',
        id: 'cG9zdDo0OQ==',
      },
    },
    {
      contentTypeName: 'birds',
      id: 'cG9zdDoyNw==',
      databaseId: 27,
      date: '2022-05-24T00:06:21',
      slug: 'inca-tern',
      title: 'Inca tern',
      regions: [
        {
          databaseId: 5,
          id: 'dGVybTo1',
          name: 'Coast',
          slug: 'coast',
        },
      ],
      familyName: 'Laridae',
      featuredImage: {
        altText: '',
        caption: null,
        sourceUrl: 'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/dfasfasfasfd.png',
        srcSet:
          'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/dfasfasfasfd-300x159.png 300w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/dfasfasfasfd-1024x543.png 1024w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/dfasfasfasfd-768x407.png 768w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/dfasfasfasfd-1536x815.png 1536w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/dfasfasfasfd-2048x1087.png 2048w',
        sizes: '(max-width: 300px) 100vw, 300px',
        id: 'cG9zdDo0NQ==',
      },
    },
    {
      contentTypeName: 'birds',
      id: 'cG9zdDoyNg==',
      databaseId: 26,
      date: '2022-05-23T23:56:53',
      slug: 'toucan',
      title: 'Toucan',
      regions: [
        {
          databaseId: 3,
          id: 'dGVybToz',
          name: 'Rainforest',
          slug: 'rainforest',
        },
      ],
      familyName: 'Ramphastidae',
      featuredImage: {
        altText: '',
        caption: null,
        sourceUrl: 'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/birds-toucan-i96984.jpg',
        srcSet:
          'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/birds-toucan-i96984-300x200.jpg 300w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/birds-toucan-i96984-1024x683.jpg 1024w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/birds-toucan-i96984-768x512.jpg 768w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/birds-toucan-i96984.jpg 1125w',
        sizes: '(max-width: 300px) 100vw, 300px',
        id: 'cG9zdDozNw==',
      },
    },
    {
      contentTypeName: 'birds',
      id: 'cG9zdDozMA==',
      databaseId: 30,
      date: '2022-05-23T23:52:15',
      slug: 'marvelous-spatuletail',
      title: 'Marvelous spatuletail',
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
      familyName: 'Trochilidae',
      featuredImage: {
        altText: '',
        caption: null,
        sourceUrl: 'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/download-1.jpeg',
        srcSet:
          'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/download-1-200x300.jpeg 200w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/download-1.jpeg 427w',
        sizes: '(max-width: 200px) 100vw, 200px',
        id: 'cG9zdDozMQ==',
      },
    },
    {
      contentTypeName: 'birds',
      id: 'cG9zdDoxOQ==',
      databaseId: 19,
      date: '2022-05-23T22:30:19',
      slug: 'rupicola-peruvianus',
      title: 'Rupicola peruvianus',
      regions: [
        {
          databaseId: 3,
          id: 'dGVybToz',
          name: 'Rainforest',
          slug: 'rainforest',
        },
      ],
      familyName: 'Cotingidae',
      featuredImage: {
        altText: '',
        caption: null,
        sourceUrl: 'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/foto-del-gallito-de-las-rocas.jpeg',
        srcSet:
          'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/foto-del-gallito-de-las-rocas-300x225.jpeg 300w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/foto-del-gallito-de-las-rocas-1024x768.jpeg 1024w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/foto-del-gallito-de-las-rocas-768x576.jpeg 768w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/foto-del-gallito-de-las-rocas-1536x1152.jpeg 1536w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/foto-del-gallito-de-las-rocas.jpeg 1602w',
        sizes: '(max-width: 300px) 100vw, 300px',
        id: 'cG9zdDoyMA==',
      },
    },
  ],
};
