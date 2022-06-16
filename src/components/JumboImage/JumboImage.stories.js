import JumboImage from './JumboImage';

export default {
  title: 'components/JumboImage',
  component: JumboImage,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => <JumboImage {...args} />;

export const JumboImageStory = Template.bind({});
JumboImageStory.args = {
  featuredImage: {
    altText: '',
    sourceUrl:
      'https://admin.colourfulbirding.com/wp-content/uploads/2022/06/ben-blennerhassett-khmPl-1aVig-unsplash.jpg',
    srcSet:
      'https://admin.colourfulbirding.com/wp-content/uploads/2022/06/ben-blennerhassett-khmPl-1aVig-unsplash-300x200.jpg 300w, https://admin.colourfulbirding.com/wp-content/uploads/2022/06/ben-blennerhassett-khmPl-1aVig-unsplash-1024x682.jpg 1024w, https://admin.colourfulbirding.com/wp-content/uploads/2022/06/ben-blennerhassett-khmPl-1aVig-unsplash-768x512.jpg 768w, https://admin.colourfulbirding.com/wp-content/uploads/2022/06/ben-blennerhassett-khmPl-1aVig-unsplash-1536x1024.jpg 1536w, https://admin.colourfulbirding.com/wp-content/uploads/2022/06/ben-blennerhassett-khmPl-1aVig-unsplash.jpg 2000w',
    sizes: '(max-width: 300px) 100vw, 300px',
  },
  title: 'A New Blog Post',
  subtitle: 'This is a new blog post',
};
