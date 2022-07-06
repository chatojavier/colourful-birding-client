import Modal from 'components/Modal';
import JourneyTabs from './JourneyTabs';

export default {
  title: 'components/JourneyTabs',
  component: JourneyTabs,
};

const journeyInfo = {
  accomodation: [
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
  birdsToWatch: [
    {
      id: 'cG9zdDoyOQ==',
      slug: 'yellow-scarfed-tanager',
    },
    {
      id: 'cG9zdDoyNw==',
      slug: 'inca-tern',
    },
    {
      id: 'cG9zdDoxOQ==',
      slug: 'rupicola-peruvianus',
    },
    {
      id: 'cG9zdDoyNg==',
      slug: 'toucan',
    },
  ],
  destinations: [
    {
      name: 'Cusco',
      url: 'https://colourfulperu.com/destination/cusco-2/',
    },
    {
      name: 'Manu National Park',
      url: 'https://colourfulperu.com/destination/manu-national-park/',
    },
  ],
  itinerary: [
    {
      content:
        '<p>On the first day you will be picked up at the Velazco Astete Airport (Cuz) to be brought to your selected hotel and to give you the briefing from our next adventure, we recommend to have a light dinner and to rest early.</p>\n<p>*Overnight in double room</p>\n<p><strong>Meals:</strong> None</p>\n',
      day: '1',
      title: 'Cusco: Arrival to Cusco city',
    },
    {
      content:
        '<p>Early morning on our second day we will take the road, in our private vehicle, the whole trip will have an approximate duration of 5 to 6 hours. After our first 2 hours of trip we will have breakfast and a brief rest at the picturesque town of blue balconies, Paucartambo.</p>\n<p>At approximately midday will take our box lunch next to the road, to enjoy the views of the cloud forest.</p>\n<p><strong>Meals:</strong> Breakfast, lunch and dinner</p>\n',
      day: '2',
      title: 'Cusco – Cock of the Rock lodge',
    },
    {
      content:
        '<p>Very early in the morning of our fifth day, we will take advantage of the feeders of our Lodge, while enjoying a delicious breakfast; Cock of the Rock Lodge offers a great dinner room with the perfect view to the bird feeding stations, from there we could see hummingbirds such as: Green Hermit, Many Spotted Humingbird, Wire-Crested Thorntail, etc. It`s also very likely to see colorful tanagers such as: Orange-Eared Tanager, Golden-Eared Tanager. Etc. After this activity, thought to last until 10 am, we will go to find more birds on the road, where we will be looking for mixed flocks and see more of the cloud forest environment.</p>\n<p>Once back at our lodge, we will have lunch, and afterwards will go to the barbet feeding station, where is possible to get really good pictures of the Versicolored Barbet. At 5pm, will go in our vehicle to wait the for the come out flight of one of the most emblematic birds from the area, the Lyre-Tailed Nightjar. After this final activity will return for supper, charging batteries and spend the night.</p>\n<p><strong>Meals:</strong> Breakfast, lunch and dinner</p>\n',
      day: '3',
      title: 'Cock of the Rock lodge',
    },
  ],
  mapEmbed:
    '<iframe src="https://www.google.com/maps/embed?pb=!1m40!1m12!1m3!1d496931.09805090225!2d-72.03767850473605!3d-13.333211758466078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m25!3e0!4m5!1s0x916dd5d826598431%3A0x2aa996cc2318315d!2sCusco!3m2!1d-13.53195!2d-71.96746259999999!4m5!1s0x916e3d365385d4a3%3A0xb5c871b922b802e2!2sCock%20of%20the%20Rock%20Lodge%20-%20Inkanatura%20Travel%2C%20Carretera%20a%20Manu%2C%20Las%20Cruces!3m2!1d-13.0557632!2d-71.5461524!4m5!1s0x916e159aff6f91ff%3A0x1b6bf21cbc11ee52!2sWayqecha%20Cloud%20Forest%20Biological%20Station!3m2!1d-13.174939799999999!2d-71.58718209999999!4m5!1s0x916dd5d826598431%3A0x2aa996cc2318315d!2sCusco!3m2!1d-13.53195!2d-71.96746259999999!5e0!3m2!1sen!2spe!4v1655223936027!5m2!1sen!2spe" width="474" height="474" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  price: 1915,
  programedDates: {
    from: '2022-06-22',
    to: '2022-06-29',
  },
  toursInclusions:
    '<p style="text-align: justify;"><strong>INCLUDES:</strong></p>\n<ul style="text-align: justify;">\n<li>02 nights accommodation in Cusco city</li>\n<li>02 night accommodation at Cock of the Rock Lodge</li>\n<li>02 nights accommodation at Wayquecha biological station</li>\n<li>Transfer in and transfer out</li>\n<li>All due taxes</li>\n<li>Bilingual private guide</li>\n<li>Private Van for mentioned excursions</li>\n<li>All meals stated in the itinerary</li>\n<li>Water available in lodges and Van</li>\n</ul>\n<p>&nbsp;</p>\n<p style="text-align: justify;"><strong>NOT INCLUDED:</strong></p>\n<ul>\n<li style="text-align: justify;">Domestic and international flights</li>\n<li style="text-align: justify;">Airport taxes</li>\n<li style="text-align: justify;">Fees for excess baggage</li>\n<li style="text-align: justify;">Alcoholic drinks, soft drinks or bottled water</li>\n<li style="text-align: justify;">Personal expenses</li>\n<li style="text-align: justify;">Tips</li>\n<li style="text-align: justify;">Laundry</li>\n<li style="text-align: justify;">National or international personal phone calls</li>\n<li style="text-align: justify;">Not stated meals</li>\n</ul>\n',
};

const Template = (args) => {
  return (
    <Modal isOpen={true} color="lightblue">
      <JourneyTabs {...args} />
    </Modal>
  );
};

export const Itinerary = Template.bind({});
Itinerary.args = {
  journeyInfo,
  activeTab: 0,
};

export const Accommodations = Template.bind({});
Accommodations.args = {
  journeyInfo,
  activeTab: 1,
};

export const TourInclutions = Template.bind({});
TourInclutions.args = {
  journeyInfo,
  activeTab: 2,
};
