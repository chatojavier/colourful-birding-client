import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Loader from 'components/Loader';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Dropdown = ({ name, items, orientation = 'left', loading = false }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="focus:ring-offset-gray-100 focus:ring-indigo-500 inline-flex w-full justify-center border-2 border-blue bg-white px-4 py-2 text-sm font-medium uppercase text-blue shadow-sm hover:border-lightblue">
          {name}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-blue" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute z-20 mt-2 w-56 cursor-pointer border border-blue bg-white text-xs uppercase shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
            orientation === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'
          }`}
        >
          <Transition
            show={!loading}
            enter="transition-opacity duration-500 transition ease-in"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500 transition ease-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="py-1">
              {items.map((item) => (
                <Menu.Item key={item.label}>
                  {({ active }) => (
                    <a
                      onClick={item.onClick}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-xs hover:text-blue'
                      )}
                    >
                      {item.label}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Transition>
          <Transition
            show={loading}
            enter="transition-opacity duration-500 transition ease-in"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500 transition ease-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="flex h-32 w-full items-center justify-center py-1">
              <Loader size="sm" />
            </div>
          </Transition>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
