import 'swiper/css';
import 'swiper/css/navigation';

import { useState } from 'react';
import { Navigation, Controller, Autoplay, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loader from 'components/Loader';

import styles from './Gallery.module.scss';

const Gallery = ({ images = [], onSwiper, square = false }) => {
  const [swiper, setSwiper] = useState(null);
  const [isSwiperReady, setIsSwiperReady] = useState(false);
  const [updateComponent, setUpdateComponent] = useState(false);

  return (
    <div
      className={`${styles.galleryMain} absolute top-0 left-0 z-20 h-full w-full py-[10%] md:top-12 md:h-[calc(100%-1rem)] md:py-0`}
    >
      <Swiper
        onSwiper={onSwiper}
        onBeforeInit={setSwiper}
        onLazyImageReady={() => {
          setIsSwiperReady(true);
        }}
        onSliderFirstMove={() => {
          !square && setUpdateComponent(true);
        }}
        onBeforeLoopFix={() => {
          !square && setUpdateComponent(true);
        }}
        modules={[Navigation, Controller, Autoplay, Lazy]}
        slidesPerView={'auto'}
        centeredSlides={true}
        spaceBetween={12}
        breakpoints={{
          // when window width is >= 768px
          768: {
            spaceBetween: square ? '12%' : '7%',
          },
        }}
        loop={true}
        loopedSlides={2}
        autoplay
        lazy={{ loadPrevNext: true }}
        observer
        className={`${isSwiperReady ? 'opacity-1' : 'opacity-0'} transition-opacity ${
          updateComponent ? 'h-full' : 'h-[99%] '
        }`}
      >
        <>
          {images.map((image, index) => {
            const imageUpdated = image ?? {};
            const {
              id = index,
              sourceUrl = '/images/default_image.png',
              altText = 'default image',
              srcSet = '',
              mediaDetails = {},
            } = imageUpdated;
            const { height = 1500, width = 1500 } = mediaDetails;
            return (
              <SwiperSlide
                key={id}
                className={`${
                  square ? 'aspect-square !h-auto md:!h-full md:!w-auto' : '!w-auto'
                } max-w-[80%] overflow-hidden`}
              >
                {({ isPrev, isNext }) => (
                  <>
                    {(isPrev || isNext) && (
                      <div
                        onClick={() => {
                          isPrev ? swiper.slidePrev() : swiper.slideNext();
                        }}
                        className={`absolute top-0 left-0 z-10 h-full w-full ${
                          isNext ? 'cursor-e-resize' : 'cursor-w-resize'
                        }`}
                      ></div>
                    )}
                    <div className="relative h-full">
                      <img
                        data-src={sourceUrl || '/images/default_image.png'}
                        data-srcset={srcSet}
                        sizes="(min-width: 768px) 950px, 90vw"
                        height={height}
                        width={width}
                        alt={altText}
                        className={`swiper-lazy | h-full ${square ? 'w-full object-cover' : 'w-auto object-contain'}`}
                      />
                      <div className="absolute top-0 left-0 -z-10 flex h-full w-full items-center justify-center bg-darkgrey bg-opacity-40">
                        <Loader size="sm" />
                      </div>
                    </div>
                  </>
                )}
              </SwiperSlide>
            );
          })}
        </>
      </Swiper>
      <div
        className={`absolute bottom-12 z-10 flex h-full w-full items-center justify-center ${
          isSwiperReady ? 'invisible opacity-0' : 'opacity-1 visible'
        }`}
      >
        <Loader />
      </div>
    </div>
  );
};
export default Gallery;
