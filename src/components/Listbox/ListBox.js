import { Transition, Listbox } from '@headlessui/react';
import { Fragment } from 'react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

function isSelected(value, arr) {
  const arrUpdated = Array.isArray(arr) ? arr : [arr];
  return arrUpdated.find((el) => el === value) ? true : false;
}

export function ListboxMultiple({ items, name, className = '', selected, setSelected }) {
  function handleSelect(value) {
    if (!isSelected(value, selected)) {
      const selectedUpdated = [...selected, items.find((el) => el === value)];
      setSelected(selectedUpdated);
    } else {
      handleDeselect(value);
    }
  }

  function handleDeselect(value) {
    const selectedUpdated = selected.filter((el) => el !== value);
    setSelected(selectedUpdated);
  }

  return (
    <div className={`relative inline-block w-full text-left md:w-52 ${className}`}>
      <Listbox value={selected} onChange={(value) => handleSelect(value)}>
        <div className="relative mt-1">
          <Listbox.Label className="mb-1 block text-sm uppercase text-blue">{name}</Listbox.Label>
          <Listbox.Button className="relative w-full border-2 border-blue bg-white py-2 pl-3 pr-10 text-left text-blue sm:text-sm">
            <span className="block truncate">
              {selected.length < 1
                ? 'Select an option'
                : selected
                    .map((item) => {
                      return item?.label;
                    })
                    .join(', ')}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon className="text-gray-400 h-5 w-5" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((item, itemIdx) => {
                const selectedItem = isSelected(item, selected);
                return (
                  <Listbox.Option
                    key={itemIdx}
                    className={`group relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-blue hover:text-white`}
                    value={item}
                  >
                    <>
                      <span className={`block truncate ${selectedItem && 'text-blue group-hover:text-white'}`}>
                        {item.label}
                      </span>
                      {selectedItem ? (
                        <span className="text-amber-600 absolute inset-y-0 left-0 flex items-center pl-3 text-blue group-hover:text-white">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export function ListboxSingle({ items, name, className = '', selected, setSelected }) {
  const selectedItem = selected;
  const setSelectedItem = setSelected;
  return (
    <div className={`relative inline-block w-full text-left md:w-52 ${className}`}>
      <Listbox value={selectedItem} onChange={setSelectedItem}>
        <div className="relative mt-1">
          <Listbox.Label className="mb-1 block text-sm uppercase text-blue">{name}</Listbox.Label>
          <Listbox.Button className="relative w-full border-2 border-blue bg-white py-2 pl-3 pr-10 text-left text-blue sm:text-sm">
            <span className="block truncate">{selectedItem.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon className="text-gray-400 h-5 w-5" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((item, itemIdx) => {
                const selected = item.label === selectedItem.label;
                return (
                  <Listbox.Option
                    key={itemIdx}
                    className={`group relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-blue hover:text-white`}
                    value={item}
                    onClick={item.onClick}
                  >
                    <>
                      <span className={`block truncate ${selected && 'text-blue group-hover:text-white'}`}>
                        {item.label}
                      </span>
                      {selected ? (
                        <span className="text-amber-600 absolute inset-y-0 left-0 flex items-center pl-3 text-blue group-hover:text-white">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
