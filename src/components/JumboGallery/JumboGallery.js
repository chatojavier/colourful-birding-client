// core version + navigation, pagination modules:
import { useLayoutEffect, useRef } from 'react';
import GalleryBlur from 'components/GalleryBlur';
import Gallery from 'components/Gallery';
import GalleryInfoCard from 'components/GalleryInfoCard';
import GalleryInfo from 'components/GalleryInfo';

const JumboGallery = ({ galleryDesktop = [], galleryMobile, featuredImage, square = false, info = false }) => {
  const swiperGallery = useRef(null);
  const swiperInfo = useRef(null);
  const swiperBlur = useRef(null);

  useLayoutEffect(() => {
    if (swiperGallery.current) {
      swiperGallery.current.controller.control = swiperBlur.current;
      swiperBlur.current.controller.control = swiperInfo.current;
    }
  }, []);

  return (
    <div className="jumboGallery relative w-full">
      {galleryDesktop || galleryDesktop?.length > 0 ? (
        <>
          <GalleryBlur
            galleryDesktop={galleryDesktop}
            galleryMobile={galleryMobile}
            onSwiper={(swiper) => {
              swiperBlur.current = swiper;
            }}
          />
          <Gallery
            galleryDesktop={galleryDesktop}
            galleryMobile={galleryMobile}
            // control={controlledSwiper}
            square={square}
            onSwiper={(swiper) => {
              swiperGallery.current = swiper;
            }}
          />
          {info && square && (
            <div className="absolute -bottom-5 left-[35%] z-20 -translate-x-1/2 md:left-[35%]">
              {!Array.isArray(info) ? (
                <GalleryInfoCard title={info.title} subtitle={info.subtitle} button={info.button} />
              ) : (
                <GalleryInfo
                  onSwiper={(swiper) => {
                    swiperInfo.current = swiper;
                  }}
                >
                  {info.map((item, index) => (
                    <GalleryInfoCard key={index} title={item.title} subtitle={item.subtitle} button={item.button} />
                  ))}
                </GalleryInfo>
              )}
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
