import { Tab } from '@headlessui/react';
import Accommodations from 'components/Accommodations';
import Itinerary from 'components/Itinerary';
import TourInclusions from 'components/TourInclusions';
import { Fragment } from 'react';

const JourneyTabs = ({ journeyInfo, activeTab, className = '' }) => {
  const tabList = [
    {
      label: 'Itinerary',
    },
    {
      label: 'Accommodations',
    },
    {
      label: 'Tour Inclusions',
    },
  ];

  const { itinerary, accomodation, toursInclusions } = journeyInfo;

  return (
    <div className={`journey-tabs | relative h-full ${className}`}>
      <Tab.Group defaultIndex={activeTab}>
        <Tab.List
          className={`relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-lightblue`}
        >
          {tabList.map((tab, index) => (
            <Tab key={index} as={Fragment}>
              {({ selected }) => (
                <div
                  className={`journey-tab | relative border-r border-lightblue py-2 px-6 font-bebas text-xl ${
                    selected
                      ? 'inline-block text-lightblue'
                      : 'hidden cursor-pointer text-lightblue-500 hover:text-lightblue md:inline-block'
                  }`}
                >
                  <div className="journey-tab__title">
                    <span className="journey-tab__title-text">{tab.label}</span>
                  </div>
                  {selected && (
                    <div className="journey-tab__effect | absolute bottom-0 left-0 z-10 h-[1px] w-full bg-white" />
                  )}
                </div>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className={'h-[511px] max-h-full p-6'}>
          <Tab.Panel className="flex h-full justify-center overflow-scroll ">
            <Itinerary itinerary={itinerary} />
          </Tab.Panel>
          <Tab.Panel className="mt-6 flex h-full justify-center overflow-scroll ">
            <Accommodations accomodations={accomodation} />
          </Tab.Panel>
          <Tab.Panel className="flex h-full justify-center overflow-scroll ">
            <TourInclusions toursInclusions={toursInclusions} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default JourneyTabs;
