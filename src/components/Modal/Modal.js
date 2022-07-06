import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { getBorderColorByName, getTextColorByName } from 'lib/util';

const Modal = ({ children, isOpen, setIsOpen, color = 'green', fixed = false }) => {
  return (
    <Transition
      show={isOpen}
      enter="transition duration-300 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-250 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="flex min-h-full w-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`relative mx-auto w-[95%] max-w-[760px] bg-white shadow ${fixed ? 'h-[555px]' : 'h-auto'}`}
              >
                <div
                  className={`close-button | absolute -top-3 -right-3 z-50 h-8 w-8 cursor-pointer border bg-white p-2 font-bebas ${getBorderColorByName(
                    color
                  )} ${getTextColorByName(color)}`}
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    className="fill-current h-full w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
