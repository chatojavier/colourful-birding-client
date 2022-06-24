import Title from 'components/Title';
import Subtitle from 'components/Subtitle';
import { getMediaQueries } from 'lib/responsive';
import useWindowSize from 'hooks/use-window-resize';
import Loader from 'components/Loader';

const JumboImage = ({ imageDesktop, imageMobile, title, subtitle }) => {
  const { md } = getMediaQueries();
  const [windowWidth] = useWindowSize();
  const mdWidth = md.replace(/\D/g, '');

  return (
    <div className="jumbo-image relative w-full">
      <div className="jumbo-image-blur | md:h=[578px] h-[472px] overflow-hidden">
        <picture>
          {imageDesktop?.srcSet && (
            <source
              srcSet={imageDesktop?.srcSet}
              sizes="(max-width: 1024px) 55vw, (max-width: 768px) 1024px, 100vw"
              media={md}
              width={imageDesktop?.width}
              height={imageDesktop?.height}
            />
          )}
          {imageMobile && imageMobile?.srcSet && (
            <source
              srcSet={imageMobile?.srcSet}
              sizes="(max-width: 1024px) 55vw, (max-width: 768px) 1024px, 100vw"
              width={imageMobile?.width}
              height={imageMobile?.height}
            />
          )}
          <img
            src={imageDesktop?.sourceUrl}
            alt={imageDesktop?.altText}
            width={windowWidth >= mdWidth ? imageDesktop?.width : imageMobile?.width}
            height={windowWidth >= mdWidth ? imageDesktop?.height : imageMobile?.height}
            className="h-full w-full scale-150 object-cover blur-lg"
          />
        </picture>
      </div>
      <div className="jumbo-image-main | container absolute right-1/2 top-12 z-20 h-full w-[80%] max-w-5xl translate-x-1/2 shadow-md md:right-[38%] md:h-[calc(100%-1rem)] md:w-[55%]">
        <picture>
          {imageDesktop?.srcSet && (
            <source
              srcSet={imageDesktop?.srcSet}
              sizes="(max-width: 1024px) 55vw, (max-width: 768px) 1024px, 100vw"
              media={md}
              width={imageDesktop?.width}
              height={imageDesktop?.height}
            />
          )}
          {imageMobile && imageMobile?.srcSet && (
            <source
              srcSet={imageMobile?.srcSet}
              sizes="(max-width: 1024px) 55vw, (max-width: 768px) 1024px, 100vw"
              width={imageMobile?.width}
              height={imageMobile?.height}
            />
          )}
          <img
            src={imageDesktop?.sourceUrl}
            alt={imageDesktop?.altText}
            width={windowWidth >= mdWidth ? imageDesktop?.width : imageMobile?.width ?? imageDesktop?.width}
            height={windowWidth >= mdWidth ? imageDesktop?.height : imageMobile?.height ?? imageDesktop?.height}
            className="h-full w-full object-cover"
          />
          <div className="preloader | absolute top-0 left-0 -z-10 flex h-full w-full items-center justify-center bg-white bg-opacity-75">
            <Loader size="sm" />
          </div>
        </picture>
      </div>
      {title && (
        <div className="absolute top-[80%] left-[35%] z-20 w-[70%] -translate-y-1/2 -translate-x-1/2 px-3 md:top-[60%] md:left-[35%] md:w-auto md:px-0">
          <div className="gallery-info-card__header | space-y-2 drop-shadow md:drop-shadow-lg ">
            <Title color={'white'} className="">
              {title}
            </Title>
            {subtitle && <Subtitle className="relative left-20 text-white md:text-right">{subtitle}</Subtitle>}
          </div>
        </div>
      )}
    </div>
  );
};

export default JumboImage;
