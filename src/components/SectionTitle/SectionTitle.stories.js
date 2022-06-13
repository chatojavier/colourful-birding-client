import SectionTitle from './SectionTitle';

export default {
  title: 'components/SectionTitle',
  component: SectionTitle,
  parameters: {
    notes: {
      markdown: ` 
            ## SectionTitle
            #### Props
            | Prop | Type | Description |
            | --- | --- | --- |
            | children | string | The text to display |
            | color | string | The color of the text |
            `,
    },
    options: {
      showPanel: false,
    },
    decorators: [
      (Story) => (
        <div className="container">
          <Story />
        </div>
      ),
    ],
  },
};

const Template = (args) => <SectionTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: 'green',
  children: 'SectionTitle',
};
