import { SiteContext } from 'hooks/use-site';
import { getInitialProps } from '__mocks__/getInitialProps';
import Nav from './Nav';

export default {
  title: 'Components/Nav',
  component: Nav,
};

const Template = () => <Nav />;

export const Default = Template.bind({});
Default.loaders = [
  async () => ({
    initialValues: await getInitialProps(),
  }),
];
Default.decorators = [
  (Nav, { loaded: { initialValues } }) => (
    <SiteContext.Provider value={initialValues}>
      <Nav />
    </SiteContext.Provider>
  ),
];
Default.parameters = {
  layout: 'fullscreen',
};
