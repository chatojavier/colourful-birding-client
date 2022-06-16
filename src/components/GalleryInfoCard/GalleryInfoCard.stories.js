import GalleryInfoCard from './GalleryInfoCard';
import DateFromTo from 'components/DateFromTo';

export default {
  title: 'components/GalleryInfoCard',
  component: GalleryInfoCard,
};

const Template = (args) => <GalleryInfoCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Gallery Info Card',
  subtitle: <DateFromTo from="2022-06-02" to="2022-06-08" />,
  button: {
    path: '/',
    text: 'Button',
    color: 'green',
  },
};
