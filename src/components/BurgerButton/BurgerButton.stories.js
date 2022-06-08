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

const Template = () => <BurgerButton />;

export const Default = Template.bind({});
Default.decorators = [
  (BurgerButton) => (
    <div className="p-8">
      <BurgerButton />
    </div>
  ),
];
