import Modal from 'components/Modal';
import Itinerary from './Itinerary';

export default {
  title: 'components/Itinerary',
  component: Itinerary,
};

const itinerary = [
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
];

const Template = (args) => {
  return (
    <Modal isOpen={true} color="lightblue">
      <Itinerary {...args} />
    </Modal>
  );
};
export const Default = Template.bind({});
Default.args = { itinerary };
