import { ListboxMultiple } from './ListBox';

export default {
  title: 'components/Dropdown',
  component: ListboxMultiple,
};

const Template = (args) => <ListboxMultiple {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Order by:',
  active: true,
  items: [
    {
      label: 'Account settings',
      onClick: () => {},
    },
    {
      label: 'Support',
      onClick: () => {},
    },
    {
      label: 'License',
      onClick: () => {},
    },
    {
      label: 'Sign out',
      onClick: () => {},
    },
  ],
};
Default.argTypes = {
  active: { control: { type: 'boolean' } },
  items: { control: { type: 'array' } },
};
Default.parameters = {
  docs: {
    description: {
      component: `
                    A dropdown menu that can be toggled on and off.
                `,
    },
  },
};
Default.decorators = [
  (Story) => (
    <div className="flex w-full justify-center">
      <Story />
    </div>
  ),
];
