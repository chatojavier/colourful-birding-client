import 'swiper/css';
import 'swiper/css/navigation';

import { useState } from 'react';
import { Navigation, Controller, Autoplay, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getMediaQueries } from 'lib/responsive';
import Loader from 'components/Loader';

import styles from './Gallery.module.scss';

const Gallery = ({ galleryDesktop, galleryMobile = [], onSwiper, square = false }) => {
  const { md } = getMediaQueries();
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
          {galleryDesktop.map((item, index) => {
            const galleryMobileUpdated = galleryMobile && galleryMobile?.length > 0 ? galleryMobile : galleryDesktop;
            const galleryDesktopHeight = galleryDesktop[index].mediaDetails.height;
            const galleryDesktopWidth = galleryDesktop[index].mediaDetails.width;
            const galleryMobileHeight = galleryMobileUpdated[index].mediaDetails.height;
            const galleryMobileWidth = galleryMobileUpdated[index].mediaDetails.width;
            return (
              <SwiperSlide
                key={item.id}
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
                    <picture className="relative">
                      <source
                        data-srcset={galleryDesktop[index]?.srcSet}
                        sizes="(min-width: 768px) 950px, 90vw"
                        media={md}
                        width={galleryDesktopWidth}
                        height={galleryDesktopHeight}
                      />
                      <source
                        data-srcset={galleryMobileUpdated[index].srcSet}
                        sizes="(min-width: 768px) 950px, 90vw"
                        width={galleryMobileWidth}
                        height={galleryMobileHeight}
                      />
                      <img
                        data-src={galleryDesktop[index].sourceUrl}
                        alt={galleryDesktop[index].altText}
                        className={`swiper-lazy | h-full ${square ? 'w-full object-cover' : 'w-auto object-contain'}`}
                      />
                      <div className="absolute top-0 left-0 -z-10 flex h-full w-full items-center justify-center bg-darkgrey bg-opacity-20">
                        <Loader size="sm" />
                      </div>
                    </picture>
                  </>
                )}
              </SwiperSlide>
            );
          })}
        </>
      </Swiper>
      <div
        className={`absolute bottom-12 z-10 flex h-full w-full items-center justify-center ${
          isSwiperReady ? 'opacity-0' : 'opacity-1'
        }`}
      >
        <Loader />
      </div>
    </div>
  );
};
export default Gallery;
