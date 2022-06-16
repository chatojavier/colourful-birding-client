import 'swiper/css';
import 'swiper/css/navigation';

import { useRef } from 'react';
import { Navigation, Controller, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getMediaQueries } from 'lib/responsive';

const Gallery = ({ galleryDesktop = [], galleryMobile = [], control, square = false }) => {
  const { md } = getMediaQueries();
  const mainSwiper = useRef(null);
  return (
    <div className="gallery-main absolute top-0 left-0 z-20 h-full w-full py-[10%] md:top-12 md:h-[calc(100%-1rem)] md:py-0">
      <Swiper
        onInit={(swiper) => (mainSwiper.current = swiper)}
        modules={[Navigation, Controller, Autoplay]}
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
                      isPrev ? mainSwiper.current.slidePrev() : mainSwiper.current.slideNext();
                    }}
                    className={`absolute top-0 left-0 z-10 h-full w-full ${
                      isNext ? 'cursor-e-resize' : 'cursor-w-resize'
                    }`}
                  ></div>
                )}
                <picture>
                  <source srcSet={galleryDesktop[index].srcSet} sizes={galleryDesktop[index].sizes} media={md} />
                  <source srcSet={galleryMobile[index].srcSet} sizes={galleryMobile[index].sizes} />
                  <img
                    src={galleryDesktop[index].sourceUrl}
                    alt={galleryDesktop[index].altText}
                    className={`h-full ${square ? 'w-full object-cover' : 'w-auto object-contain'}`}
                  />
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
