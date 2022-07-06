import Accommodations from './Accommodations';
import Modal from 'components/Modal';

export default {
  title: 'components/Accommodations',
  component: Accommodations,
};

const Template = (args) => {
  return (
    <Modal isOpen={true} color="lightblue">
      <Accommodations {...args} />
    </Modal>
  );
};
export const Default = Template.bind({});
Default.args = {
  accomodations: [
    {
      accomodation: {
        name: 'El Andariego',
        url: null,
      },
      destination: 'Cusco',
    },
    {
      accomodation: {
        name: 'Cock  of the Rock / Wayquecha',
        url: null,
      },
      destination: 'Manu National Park',
    },
  ],
};
