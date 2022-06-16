import Container from 'components/Container';
import JourneyInfo from './JourneyInfo';

const props = {
  contentTypeName: 'journeys',
  title: 'Birdwatching by Paracas Road',
  regions: [
    {
      databaseId: 4,
      id: 'dGVybTo0',
      name: 'Mountains',
      slug: 'mountains',
    },
    {
      databaseId: 3,
      id: 'dGVybToz',
      name: 'Rainforest',
      slug: 'rainforest',
    },
  ],
  content:
    '\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n\n\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n',
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
  mapEmbed:
    '<iframe src="https://www.google.com/maps/embed?pb=!1m40!1m12!1m3!1d496931.09805090225!2d-72.03767850473605!3d-13.333211758466078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m25!3e0!4m5!1s0x916dd5d826598431%3A0x2aa996cc2318315d!2sCusco!3m2!1d-13.53195!2d-71.96746259999999!4m5!1s0x916e3d365385d4a3%3A0xb5c871b922b802e2!2sCock%20of%20the%20Rock%20Lodge%20-%20Inkanatura%20Travel%2C%20Carretera%20a%20Manu%2C%20Las%20Cruces!3m2!1d-13.0557632!2d-71.5461524!4m5!1s0x916e159aff6f91ff%3A0x1b6bf21cbc11ee52!2sWayqecha%20Cloud%20Forest%20Biological%20Station!3m2!1d-13.174939799999999!2d-71.58718209999999!4m5!1s0x916dd5d826598431%3A0x2aa996cc2318315d!2sCusco!3m2!1d-13.53195!2d-71.96746259999999!5e0!3m2!1sen!2spe!4v1655223936027!5m2!1sen!2spe" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  programedDates: {
    from: '2022-06-22',
    to: '2022-06-29',
  },
  price: 1415.75,
};

export default {
  title: 'sections/JourneyInfo',
  component: JourneyInfo,
};

export const Default = (args) => <JourneyInfo {...args} />;
Default.decorators = [
  (Story) => (
    <Container>
      <Story />
    </Container>
  ),
];
Default.args = {
  ...props,
};
