import 'swiper/css';
import 'swiper/css/navigation';

import { useEffect, useState } from 'react';
import { Navigation, Controller, Autoplay, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getMediaQueries } from 'lib/responsive';
import Loader from 'components/Loader';

const Gallery = ({ galleryDesktop = [], galleryMobile = [], control, square = false }) => {
  const { md } = getMediaQueries();
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    let timeout;
    if (swiper === null) {
      timeout = setTimeout(() => swiper.update(), 500);
    }
    console.log(swiper);
    return () => {
      clearTimeout(timeout);
    };
  }, [swiper]);

  return (
    <div className="gallery-main absolute top-0 left-0 z-20 h-full w-full py-[10%] md:top-12 md:h-[calc(100%-1rem)] md:py-0">
      <Swiper
        onInit={(swiper) => setSwiper(swiper)}
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
        controller={{ control: control }}
        loop={true}
        autoplay
        lazy={{
          loadPrevNext: true,
        }}
        className="h-full"
      >
        {galleryDesktop.map((item, index) => (
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
                      data-srcSet={galleryDesktop[index]?.srcSet}
                      sizes="(min-width: 768px) 950px, 90vw"
                      media={md}
                    />
                  )}
                  {galleryMobile && galleryMobile[index]?.srcSet && (
                    <source data-srcSet={galleryMobile[index].srcSet} sizes="(min-width: 768px) 950px, 90vw" />
                  )}
                  <img
                    data-src={galleryDesktop[index].sourceUrl}
                    alt={galleryDesktop[index].altText}
                    className={`swiper-lazy | h-full ${square ? 'w-full object-cover' : 'w-auto object-contain'}`}
                  />
                  <div className="swiper-lazy-preloader | absolute top-0 left-0 flex h-full w-full items-center justify-center bg-white bg-opacity-75">
                    <Loader size="sm" />
                  </div>
                </picture>
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
