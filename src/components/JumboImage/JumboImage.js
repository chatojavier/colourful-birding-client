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
          sizes={featuredImage.sizes}
          className="h-full w-full scale-150 object-cover blur-lg"
        />
      </div>
      <div className="jumbo-image-main | absolute top-0 right-1/2 z-20 h-full w-full max-w-[65%] translate-x-1/2 py-[10%] md:right-[38%] md:top-12 md:h-[calc(100%-1rem)] md:py-0">
        <img
          src={featuredImage.sourceUrl}
          alt={featuredImage.altText}
          srcSet={featuredImage.srcSet}
          sizes={featuredImage.sizes}
          className={`h-full w-full object-cover`}
        />
      </div>
      {title && subtitle && (
        <div className="absolute top-[60%] left-[35%] z-20 -translate-y-1/2 -translate-x-1/2 md:left-[35%]">
          <div className="gallery-info-card__header | space-y-2">
            <Title color={'white'} className="">
              {title}
            </Title>
            <Subtitle className="text-white">{subtitle}</Subtitle>
          </div>
        </div>
      )}
    </div>
  );
};

export default JumboImage;
