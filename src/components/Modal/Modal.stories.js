import Modal from './Modal';
import { useState } from 'react';

export default {
  title: 'components/Modal',
  component: Modal,
};

const Template = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="space-y-4 p-4">
        <h2 className="text-center font-bebas text-4xl font-bold">Modal title</h2>
        <p className="text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur sagittis, nisl
          nunc ultricies nisi, eget consectetur nisl nunc eget quam.
        </p>
        <div className="flex justify-center">
          <button className="rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700">Close</button>
        </div>
      </div>
    </Modal>
  );
};

export const Default = Template.bind({});
