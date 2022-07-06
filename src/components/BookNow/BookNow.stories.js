import Modal from 'components/Modal';
import BookNow from './BookNow';

export default {
  title: 'components/BookNow',
  component: BookNow,
};

const Template = (args) => {
  return (
    <Modal isOpen={true} color="lightblue">
      <BookNow {...args} />
    </Modal>
  );
};
export const Default = Template.bind({});
Default.args = {
  price: 1915,
  programedDates: {
    from: '2022-06-22',
    to: '2022-06-29',
  },
  color: 'lightblue',
};
