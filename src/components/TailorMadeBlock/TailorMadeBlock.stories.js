import TailorMadeBlock from './TailorMadeBlock';

export default {
  title: 'sections/TailorMadeBlock',
  component: TailorMadeBlock,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => <TailorMadeBlock {...args} />;

export const Default = Template.bind({});
Default.args = {
  image: {
    __typename: 'MediaItem',
    id: 'cG9zdDoyNDI=',
    altText: '',
    sizes: '(max-width: 300px) 100vw, 300px',
    sourceUrl:
      'https://i0.wp.com/admin.colourfulbirding.com/wp-content/uploads/2022/07/david-clode-3YEMFXYBgu8-unsplash-scaled.jpg?fit=2560%2C1808&ssl=1',
    srcSet:
      'https://i0.wp.com/admin.colourfulbirding.com/wp-content/uploads/2022/07/david-clode-3YEMFXYBgu8-unsplash-scaled.jpg?w=2560&ssl=1 2560w, https://i0.wp.com/admin.colourfulbirding.com/wp-content/uploads/2022/07/david-clode-3YEMFXYBgu8-unsplash-scaled.jpg?resize=300%2C212&ssl=1 300w, https://i0.wp.com/admin.colourfulbirding.com/wp-content/uploads/2022/07/david-clode-3YEMFXYBgu8-unsplash-scaled.jpg?resize=1024%2C723&ssl=1 1024w, https://i0.wp.com/admin.colourfulbirding.com/wp-content/uploads/2022/07/david-clode-3YEMFXYBgu8-unsplash-scaled.jpg?resize=768%2C542&ssl=1 768w, https://i0.wp.com/admin.colourfulbirding.com/wp-content/uploads/2022/07/david-clode-3YEMFXYBgu8-unsplash-scaled.jpg?resize=1536%2C1085&ssl=1 1536w, https://i0.wp.com/admin.colourfulbirding.com/wp-content/uploads/2022/07/david-clode-3YEMFXYBgu8-unsplash-scaled.jpg?resize=2048%2C1446&ssl=1 2048w',
    mediaDetails: {
      __typename: 'MediaDetails',
      width: 2560,
      height: 1808,
    },
  },
  content: {
    __typename: 'Page_Tailormadeblock_TmContent',
    title: 'Or let your imagination fly',
    subtitle: 'And let’s make your dreamed venture together.',
    button: 'Ask for a tailor made journey',
  },
};
