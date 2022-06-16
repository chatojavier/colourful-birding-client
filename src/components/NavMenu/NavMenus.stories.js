import { SiteContext } from 'hooks/use-site';
import { getInitialGlobalProps } from '__mocks__/getInitialProps';
import NavMenu from './NavMenu';

export default {
  title: 'Components/NavMenu',
  component: NavMenu,
  loaders: [
    async () => ({
      initialValues: await getInitialGlobalProps(),
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
