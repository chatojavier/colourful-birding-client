import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid';
import Accordion from 'components/Accordion';
import { DividerH } from 'components/Divider';

const Itinerary = ({ itinerary }) => {
  return (
    <Accordion>
      {itinerary.map((item, index) => {
        const { day, title, content } = item;
        return (
          <Accordion.item key={index}>
            {({ isOpen }) => (
              <>
                <Accordion.header>
                  <div className="relative -left-4 font-bebas text-xl text-lightblue">
                    {isOpen ? (
                      <MinusSmIcon className={`inline-block h-4 w-4`} />
                    ) : (
                      <PlusSmIcon className="inline-block h-4 w-4" />
                    )}
                    <span>{`Day ${day}`}</span>
                  </div>
                  <div className="text-sm uppercase">{title}</div>
                  <DividerH className="!h-[2px]" />
                </Accordion.header>
                <Accordion.content>
                  <p className="text-justify text-sm" dangerouslySetInnerHTML={{ __html: content }} />
                </Accordion.content>
              </>
            )}
          </Accordion.item>
        );
      })}
    </Accordion>
  );
};
export default Itinerary;
