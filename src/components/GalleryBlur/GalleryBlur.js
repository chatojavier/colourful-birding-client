import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { EffectFade, Controller, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const GalleryBlur = ({ images = [], onSwiper }) => {
  return (
    <div className="gallery-background">
      <Swiper
        onSwiper={onSwiper}
        modules={[EffectFade, Controller, Lazy]}
        effect="fade"
        loop={true}
        loopAdditionalSlides={1}
        lazy={{ loadPrevNext: true }}
        allowTouchMove={false}
        className="h-[472px] md:h-[578px]"
      >
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
            <SwiperSlide key={id} className="overflow-hidden">
              <img
                data-src={sourceUrl || '/images/default_image.png'}
                data-srcset={srcSet}
                sizes="(min-width: 768px) 950px, 90vw"
                height={height}
                width={width}
                alt={altText}
                onContextMenu={(e) => e.preventDefault()}
                className="swiper-lazy h-full w-full scale-150 object-cover blur-lg"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="overlay | absolute top-0 left-0 z-10 h-full w-full bg-black opacity-10 mix-blend-multiply"></div>
    </div>
  );
};
export default GalleryBlur;
