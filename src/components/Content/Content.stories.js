import Content from './Content';

export default {
  name: 'components/Content',
  component: Content,
};

const Template = (args) => <Content {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Content',
};
