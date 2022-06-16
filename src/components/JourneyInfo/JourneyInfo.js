import Title from 'components/Title';
import FormatedContent from 'components/FormatedContent';
import { Calendar, Location, Price } from 'components/SVG';
import DateFromTo from 'components/DateFromTo';
import EmbedCode from 'components/EmbedCode';
import Button from 'components/Button';

const JourneyInfo = ({ contentTypeName, content, destinations, mapEmbed, programedDates, price, className }) => {
  const FeaturedInfoCard = ({ label, icon, children, className }) => (
    <div className={`journey-info__header__featured-info | flex flex-col  items-center ${className}`}>
      <div className="journey-info__header__featured-info__icon | mb-2">{icon}</div>
      <div className="journey-info__header__featured-info__label | text-center text-sm uppercase md:text-lg">
        {label}
      </div>
      <div className="journey-info__header__featured-info__content | text-center text-xs md:text-base">{children}</div>
    </div>
  );

  return (
    <div className={`journey-info ${className}`}>
      <div className="journey-info__header | md:flex md:items-center md:justify-between md:space-x-8">
        <div className="journey-info__header__featured-info | mb-8 grid grid-cols-2 gap-x-4 gap-y-8 md:max-w-2xl md:grid-cols-3">
          <FeaturedInfoCard label="Programed Dates" icon={<Calendar />}>
            <DateFromTo from={programedDates.from} to={programedDates.to} />
          </FeaturedInfoCard>
          <FeaturedInfoCard label="Price" icon={<Price />}>
            <span className="text-lightblue">USD {price}</span> per person
          </FeaturedInfoCard>
          <FeaturedInfoCard label="Destinations" icon={<Location />}>
            {destinations.map((destination, index) => (
              <div key={index}>
                <a href={destination.url} className="hover:text-lightblue">
                  {destination.name}
                </a>
              </div>
            ))}
          </FeaturedInfoCard>
        </div>
        <div className="journey-info__header__book-now | hidden shrink-0 md:block">
          <Button path={`/book-now/${contentTypeName}/${content.slug}`} color="lightblue" filled>
            Book Now
          </Button>
        </div>
      </div>
      <div className="journey-info__body">
        <Title color="lightblue" className="md:mb-8">
          Overview
        </Title>
        <div className="journey-info__content | lg:flex lg:space-x-8">
          <FormatedContent content={content} className="mb-8 lg:mb-0" />
          <EmbedCode
            code={mapEmbed}
            className="aspect-square md:aspect-video md:shrink-0 lg:aspect-square lg:w-[45%]"
          />
        </div>
      </div>
    </div>
  );
};
export default JourneyInfo;
