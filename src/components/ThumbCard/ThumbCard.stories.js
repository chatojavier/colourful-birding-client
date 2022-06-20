import ThumbCard from './ThumbCard';

export default {
  title: 'component/ThumbCard',
  component: ThumbCard,
};

const Template = (args) => <ThumbCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Bird',
  slug: 'bird',
  featuredImage: {
    altText: 'Bird',
    caption: 'Bird',
    sourceUrl: 'https://source.unsplash.com/random/800x600',
    srcSet: 'https://source.unsplash.com/random/800x600',
    sizes: '800w',
    id: '1',
  },
  regions: [
    {
      id: '1',
      name: 'Coast',
      slug: 'coast',
    },
    {
      id: '2',
      name: 'Mountains',
      slug: 'mountains',
    },
  ],
  familyName: 'Family',
};
