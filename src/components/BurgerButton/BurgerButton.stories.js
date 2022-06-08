import BurgerButton from 'components/BurgerButton/';

export default {
  title: 'Components/BurgerButton',
  component: BurgerButton,
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
};

const Template = (args) => (
  <div className="p-8">
    <BurgerButton {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  isOpen: false,
};

export const Open = Template.bind({});
Open.args = {
  isOpen: true,
};
