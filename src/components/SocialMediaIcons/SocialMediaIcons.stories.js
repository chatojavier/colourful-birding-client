import SocialMediaIcons from './SocialMediaIcons';

export default {
  title: 'Components/SocialMediaIcons',
  component: SocialMediaIcons,
};

const Template = (args) => <SocialMediaIcons {...args} />;

export const Default = Template.bind({});
Default.args = {
  iconSize: 14,
};
Default.decorators = [
  (SocialMediaIcons) => (
    <div className="p-8">
      <SocialMediaIcons />
    </div>
  ),
];
