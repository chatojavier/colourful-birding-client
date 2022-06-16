import { SiteContext } from 'hooks/use-site';
import { getInitialGlobalProps } from '__mocks__/getInitialProps';
import Footer from './Footer';

export default {
  title: 'Components/Footer',
  component: Footer,
  loaders: [
    async () => ({
      initialValues: await getInitialGlobalProps(),
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = (args, { loaded: { initialValues } }) => (
  <SiteContext.Provider value={initialValues}>
    <Footer {...args} />
  </SiteContext.Provider>
);
