// core version + navigation, pagination modules:
import { useEffect, useRef } from 'react';
import GalleryBlur from 'components/GalleryBlur';
import Gallery from 'components/Gallery';
import GalleryInfoCard from 'components/GalleryInfoCard';
import GalleryInfo from 'components/GalleryInfo';
import JumboImage from 'components/JumboImage';

const JumboGallery = ({ galleryImages, featuredImage, square = false, info = false }) => {
  const swiperGallery = useRef(null);
  const swiperInfo = useRef(null);
  const swiperBlur = useRef(null);

  useEffect(() => {
    if (swiperGallery.current) {
      swiperGallery.current.controller.control = swiperBlur.current;
      swiperBlur.current.controller.control = swiperInfo.current;
    }
  }, []);

  return (
    <div className="jumboGallery relative w-full">
      {galleryImages?.length > 1 ? (
        <>
          <GalleryBlur
            images={galleryImages}
            onSwiper={(swiper) => {
              swiperBlur.current = swiper;
            }}
          />
          <Gallery
            images={galleryImages}
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
      ) : galleryImages?.length === 1 ? (
        <>
          <JumboImage imageDesktop={galleryImages[0]} />
          {info && Array.isArray(info) && square && (
            <div className="absolute -bottom-5 left-[35%] z-20 -translate-x-1/2 md:left-[35%]">
              <GalleryInfoCard title={info[0].title} subtitle={info[0].subtitle} button={info[0].button} />
            </div>
          )}
          {info && !Array.isArray(info) && square && (
            <div className="absolute -bottom-5 left-[35%] z-20 -translate-x-1/2 md:left-[35%]">
              <GalleryInfoCard title={info.title} subtitle={info.subtitle} button={info.button} />
            </div>
          )}
        </>
      ) : (
        <>
          <JumboImage imageDesktop={featuredImage} />
          {info && !Array.isArray(info) && square && (
            <div className="absolute -bottom-5 left-[35%] z-20 -translate-x-1/2 md:left-[35%]">
              <GalleryInfoCard title={info.title} subtitle={info.subtitle} button={info.button} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JumboGallery;
