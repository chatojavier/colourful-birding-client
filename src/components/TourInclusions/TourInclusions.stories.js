import TourInclusions from './TourInclusions';
import Modal from 'components/Modal';

export default {
  title: 'components/TourInclusions',
  component: TourInclusions,
};

const Template = (args) => {
  return (
    <Modal isOpen={true} color="lightblue">
      <TourInclusions {...args} />
    </Modal>
  );
};

export const Default = Template.bind({});
Default.args = {
  toursInclusions:
    '<p style="text-align: justify;"><strong>INCLUDES:</strong></p>\n<ul style="text-align: justify;">\n<li>02 nights accommodation in Cusco city</li>\n<li>02 night accommodation at Cock of the Rock Lodge</li>\n<li>02 nights accommodation at Wayquecha biological station</li>\n<li>Transfer in and transfer out</li>\n<li>All due taxes</li>\n<li>Bilingual private guide</li>\n<li>Private Van for mentioned excursions</li>\n<li>All meals stated in the itinerary</li>\n<li>Water available in lodges and Van</li>\n</ul>\n<p>&nbsp;</p>\n<p style="text-align: justify;"><strong>NOT INCLUDED:</strong></p>\n<ul>\n<li style="text-align: justify;">Domestic and international flights</li>\n<li style="text-align: justify;">Airport taxes</li>\n<li style="text-align: justify;">Fees for excess baggage</li>\n<li style="text-align: justify;">Alcoholic drinks, soft drinks or bottled water</li>\n<li style="text-align: justify;">Personal expenses</li>\n<li style="text-align: justify;">Tips</li>\n<li style="text-align: justify;">Laundry</li>\n<li style="text-align: justify;">National or international personal phone calls</li>\n<li style="text-align: justify;">Not stated meals</li>\n</ul>\n',
};
