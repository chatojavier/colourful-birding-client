import { ListboxSingle } from './ListBox';

export default {
  title: 'components/Listbox',
  component: ListboxSingle,
};

const Template = (args) => <ListboxSingle {...args} />;

export const Single = Template.bind({});
Single.args = {
  name: 'Order by:',
  items: [
    {
      label: 'A-Z',
      onClick: () => {},
    },
    {
      label: 'Price',
      onClick: () => {},
    },
    {
      label: 'Dates',
      onClick: () => {},
    },
  ],
  selected: {
    label: 'A-Z',
    onClick: () => {},
  },
  setSelected: (value) => console.log(value),
};
Single.argTypes = {
  selected: { control: { type: 'object' } },
  items: { control: { type: 'array' } },
};
Single.parameters = {
  docs: {
    description: {
      component: `
                    A dropdown menu that can be toggled on and off.
                `,
    },
  },
};
Single.decorators = [
  (Story) => (
    <div className="flex w-full justify-center">
      <Story />
    </div>
  ),
];
