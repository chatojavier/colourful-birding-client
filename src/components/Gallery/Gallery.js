import 'swiper/css';
import 'swiper/css/navigation';

import { useEffect, useState } from 'react';
import { Navigation, Controller, Autoplay, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getMediaQueries } from 'lib/responsive';
import Loader from 'components/Loader';
import useWindowSize from 'hooks/use-window-resize';

import styles from './Gallery.module.scss';

const Gallery = ({ galleryDesktop = [], galleryMobile = [], onSwiper, square = false }) => {
  const { md } = getMediaQueries();
  const [swiper, setSwiper] = useState(null);
  const [windowWidth] = useWindowSize();
  const mdWidth = md.replace(/\D/g, '');

  useEffect(() => {
    let timeout;
    if (swiper !== null) {
      timeout = setTimeout(() => swiper.update(), 500);
    }
    console.log(swiper);
    return () => {
      clearTimeout(timeout);
    };
  }, [swiper]);

  return (
    <div
      className={`${styles.galleryMain} absolute top-0 left-0 z-20 h-full w-full py-[10%] md:top-12 md:h-[calc(100%-1rem)] md:py-0`}
    >
      <Swiper
        onSwiper={onSwiper}
        onBeforeInit={setSwiper}
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
        className="h-full"
      >
        {galleryDesktop.map((item, index) => {
          const galleryDesktopHeight = 456;
          const galleryDesktopWidth =
            (galleryDesktopHeight * galleryDesktop[index].mediaDetails.width) /
            galleryDesktop[index].mediaDetails.height;
          const galleryMobileHeight = 390;
          const galleryMobileWidth =
            galleryMobile && galleryMobile[index]
              ? (galleryMobileHeight * galleryMobile[index].mediaDetails.width) /
                galleryMobile[index].mediaDetails.height
              : 0;
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
                  <picture>
                    {galleryDesktop[index]?.srcSet && (
                      <source
                        data-srcset={galleryDesktop[index]?.srcSet}
                        sizes="(min-width: 768px) 950px, 90vw"
                        media={md}
                        width={galleryDesktopWidth}
                        height={galleryDesktopHeight}
                      />
                    )}
                    {galleryMobile && galleryMobile[index]?.srcSet && (
                      <source
                        data-srcset={galleryMobile[index].srcSet}
                        sizes="(min-width: 768px) 950px, 90vw"
                        width={galleryMobileWidth}
                        height={galleryMobileHeight}
                      />
                    )}
                    <img
                      data-src={galleryDesktop[index].sourceUrl}
                      alt={galleryDesktop[index].altText}
                      width={windowWidth >= mdWidth ? galleryDesktopWidth : galleryMobileWidth}
                      height={windowWidth >= mdWidth ? galleryDesktopHeight : galleryMobileHeight}
                      className={`swiper-lazy | h-full ${square ? 'w-full object-cover' : 'w-auto object-contain'}`}
                    />
                    <div className="swiper-lazy-preloader | absolute top-0 left-0 flex h-full w-full items-center justify-center bg-white bg-opacity-75">
                      <Loader size="sm" />
                    </div>
                  </picture>
                </>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Gallery;
