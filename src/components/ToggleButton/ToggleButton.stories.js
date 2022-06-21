import ToggleButton from './ToggleButton';

export default {
  title: 'components/ToggleButton',
  component: ToggleButton,
};

const Template = (args) => <ToggleButton {...args}>Toggle Button</ToggleButton>;

export const Default = Template.bind({});
