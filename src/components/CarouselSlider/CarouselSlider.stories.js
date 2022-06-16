import CarouselSlider from './CarouselSlider';
import Container from 'components/Container';

export default {
  title: 'Components/CarouselSlider',
  component: CarouselSlider,
};

const Template = (args) => (
  <Container>
    <CarouselSlider {...args} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  post: {
    featuredImage: {
      altText: '',
      caption: null,
      sourceUrl:
        'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/a9ccd7cd1c4267a50c67ac0bd7180172_XL.jpg',
      srcSet:
        'https://admin.colourfulbirding.com/wp-content/uploads/2022/05/a9ccd7cd1c4267a50c67ac0bd7180172_XL-200x300.jpg 200w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/a9ccd7cd1c4267a50c67ac0bd7180172_XL-683x1024.jpg 683w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/a9ccd7cd1c4267a50c67ac0bd7180172_XL-768x1152.jpg 768w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/a9ccd7cd1c4267a50c67ac0bd7180172_XL-1024x1536.jpg 1024w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/a9ccd7cd1c4267a50c67ac0bd7180172_XL-1365x2048.jpg 1365w, https://admin.colourfulbirding.com/wp-content/uploads/2022/05/a9ccd7cd1c4267a50c67ac0bd7180172_XL.jpg 1600w',
      sizes: '(max-width: 200px) 100vw, 200px',
      id: 'cG9zdDozNg==',
    },
    title: 'Yellow-scarfed tanager',
    subtitle: 'Thraupidae',
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
    contentTypeName: 'birds',
  },
};

export const Posts = Template.bind({});
Posts.args = {
  post: {
    contentTypeName: 'post',
    title: 'Birdwatching by Paracas Road',
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
