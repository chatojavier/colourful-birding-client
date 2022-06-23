import Title from 'components/Title';
import Subtitle from 'components/Subtitle';

const JumboImage = ({ featuredImage, title, subtitle }) => {
  return (
    <div className="jumbo-image relative w-full">
      <div className="jumbo-image-blur | md:h=[578px] h-[472px] overflow-hidden">
        <img
          src={featuredImage.sourceUrl}
          alt={featuredImage.altText}
          srcSet={featuredImage.srcSet}
          sizes="(max-width: 1024px) 55vw, 1024px"
          className="h-full w-full scale-150 object-cover blur-lg"
        />
      </div>
      <div className="jumbo-image-main | container absolute right-1/2 top-12 z-20 h-full w-[80%] max-w-5xl translate-x-1/2 shadow-md md:right-[38%] md:h-[calc(100%-1rem)] md:w-[55%]">
        <img
          src={featuredImage.sourceUrl}
          alt={featuredImage.altText}
          srcSet={featuredImage.srcSet}
          sizes="(max-width: 1024px) 55vw, 1024px"
          className={`h-full w-full object-cover`}
        />
      </div>
      {title && subtitle && (
        <div className="absolute top-[90%] left-[35%] z-20 w-[60%] -translate-y-1/2 -translate-x-1/2 px-3 md:top-[60%] md:left-[35%] md:w-auto md:px-0">
          <div className="gallery-info-card__header | space-y-2">
            <Title color={'white'} className="">
              {title}
            </Title>
            <Subtitle className="relative left-20 text-white md:text-right">{subtitle}</Subtitle>
          </div>
        </div>
      )}
    </div>
  );
};

export default JumboImage;
