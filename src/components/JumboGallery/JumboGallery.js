// core version + navigation, pagination modules:
import { useState } from 'react';
import GalleryBlur from 'components/GalleryBlur';
import Gallery from 'components/Gallery';
import GalleryInfoCard from 'components/GalleryInfoCard';

const JumboGallery = ({ galleryDesktop = [], galleryMobile, featuredImage, square = false, info = false }) => {
  // store controlled swiper instance
  const [controlledSwiper, setControlledSwiper] = useState(null);
  return (
    <div className="jumboGallery relative w-full">
      {galleryDesktop || galleryDesktop?.length > 0 ? (
        <>
          <GalleryBlur galleryDesktop={galleryDesktop} galleryMobile={galleryMobile} control={setControlledSwiper} />
          <Gallery
            galleryDesktop={galleryDesktop}
            galleryMobile={galleryMobile}
            control={controlledSwiper}
            square={square}
          />
          {info && square && (
            <div className="absolute -bottom-5 left-[35%] z-20 -translate-x-1/2 md:left-[35%]">
              <GalleryInfoCard title={info.title} subtitle={info.subtitle} button={info.button} />
            </div>
          )}
        </>
      ) : (
        <div className="md:h=[578px] h-[472px] w-full overflow-hidden">
          <img
            src={featuredImage.sourceUrl}
            alt={featuredImage.altText}
            srcSet={featuredImage.srcSet}
            sizes="100vw"
            className="h-full w-full object-cover object-center"
          />
        </div>
      )}
    </div>
  );
};

export default JumboGallery;
