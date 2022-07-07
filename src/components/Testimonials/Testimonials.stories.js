import Container from 'components/Container';
import Testimonials from './Testimonials';

export default {
  title: 'sections/Testimonials',
  component: Testimonials,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => (
  <Container>
    <Testimonials {...args} />
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Some Words',
  subtitle: 'of dreamers like you.',
  testimonials: [
    {
      name: 'Fist Lastname',
      testimony: '“This product is so cool and creates so much value bla bla bla bla”',
    },
    {
      name: 'Fist Lastname',
      testimony: '“This product is so cool and creates so much value bla bla bla bla”',
    },
    {
      name: 'Fist Lastname',
      testimony: '“This product is so cool and creates so much value bla bla bla bla”',
    },
    {
      name: 'Fist Lastname',
      testimony: '“This product is so cool and creates so much value bla bla bla bla”',
    },
    {
      name: 'Fist Lastname',
      testimony: '“This product is so cool and creates so much value bla bla bla bla”',
    },
  ],
};
