import AboutUs from './AboutUs';

export default {
  title: 'sections/About Us',
  component: AboutUs,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => <AboutUs {...args} />;

export const Default = Template.bind({});
Default.args = {
  images: {
    main: {
      id: 'cG9zdDoyMzk=',
      altText: '',
      sizes: '(max-width: 300px) 100vw, 300px',
      sourceUrl:
        'https://i0.wp.com/admin.colourfulbirding.com/wp-content/uploads/2022/07/david-clode-3YEMFXYBgu8-unsplash.webp?fit=1365%2C768&ssl=1',
      srcSet:
        'https://i0.wp.com/admin.colourfulbirding.com/wp-content/uploads/2022/07/david-clode-3YEMFXYBgu8-unsplash.webp?w=1365&ssl=1 1365w, https://i0.wp.com/admin.colourfulbirding.com/wp-content/uploads/2022/07/david-clode-3YEMFXYBgu8-unsplash.webp?resize=300%2C169&ssl=1 300w, https://i0.wp.com/admin.colourfulbirding.com/wp-content/uploads/2022/07/david-clode-3YEMFXYBgu8-unsplash.webp?resize=1024%2C576&ssl=1 1024w, https://i0.wp.com/admin.colourfulbirding.com/wp-content/uploads/2022/07/david-clode-3YEMFXYBgu8-unsplash.webp?resize=768%2C432&ssl=1 768w',
      mediaDetails: {
        width: 1365,
        height: 768,
      },
    },
    secondary: {
      id: 'cG9zdDoxNTQ=',
      altText: '',
      sizes: '(max-width: 300px) 100vw, 300px',
      sourceUrl:
        'https://i0.wp.com/admin.colourfulbirding.com/wp-content/uploads/2022/06/ben-blennerhassett-khmPl-1aVig-unsplash.jpg?fit=2000%2C1333&ssl=1',
      srcSet:
        'https://i0.wp.com/admin.colourfulbirding.com/wp-content/uploads/2022/06/ben-blennerhassett-khmPl-1aVig-unsplash.jpg?w=2000&ssl=1 2000w, https://i0.wp.com/admin.colourfulbirding.com/wp-content/uploads/2022/06/ben-blennerhassett-khmPl-1aVig-unsplash.jpg?resize=300%2C200&ssl=1 300w, https://i0.wp.com/admin.colourfulbirding.com/wp-content/uploads/2022/06/ben-blennerhassett-khmPl-1aVig-unsplash.jpg?resize=1024%2C682&ssl=1 1024w, https://i0.wp.com/admin.colourfulbirding.com/wp-content/uploads/2022/06/ben-blennerhassett-khmPl-1aVig-unsplash.jpg?resize=768%2C512&ssl=1 768w, https://i0.wp.com/admin.colourfulbirding.com/wp-content/uploads/2022/06/ben-blennerhassett-khmPl-1aVig-unsplash.jpg?resize=1536%2C1024&ssl=1 1536w',
      mediaDetails: {
        width: 2000,
        height: 1333,
      },
    },
  },
  content: {
    intro: 'What makes us different',
    title: 'About Us',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
};
