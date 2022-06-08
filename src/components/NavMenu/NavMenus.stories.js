import { SiteContext } from 'hooks/use-site';
import { getInitialProps } from '__mocks__/getInitialProps';
import NavMenu from './NavMenu';

export default {
  title: 'Components/NavMenu',
  component: NavMenu,
  loaders: [
    async () => ({
      initialValues: await getInitialProps(),
    }),
  ],
};

const Template = (args, { loaded: { initialValues } }) => (
  <SiteContext.Provider value={initialValues}>
    <NavMenu {...args} />
  </SiteContext.Provider>
);

export const Default = Template.bind({});
Default.args = {
  isOpen: false,
};

export const Open = Template.bind({});
Open.args = {
  isOpen: true,
};
