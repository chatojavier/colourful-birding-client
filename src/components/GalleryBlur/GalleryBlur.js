import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { EffectFade, Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getMediaQueries } from 'lib/responsive';
import Loader from 'components/Loader';

const GalleryBlur = ({ galleryDesktop = [], galleryMobile = [], control }) => {
  const { md } = getMediaQueries();
  return (
    <div className="gallery-background">
      <Swiper
        modules={[EffectFade, Controller]}
        effect="fade"
        loop={true}
        onSwiper={control}
        className="md:h=[578px] h-[472px]"
      >
        {galleryDesktop.map((item, index) => (
          <SwiperSlide key={item.id} className="overflow-hidden">
            <picture>
              {galleryDesktop[index]?.srcSet && (
                <source data-srcSet={galleryDesktop[index]?.srcSet} sizes={galleryDesktop[index]?.sizes} media={md} />
              )}
              {galleryMobile && galleryMobile[index]?.srcSet && (
                <source data-srcSet={galleryMobile[index].srcSet} sizes={galleryMobile[index].sizes} />
              )}
              <img
                data-src={galleryDesktop[index].sourceUrl}
                alt={galleryDesktop[index].altText}
                className="swiper-lazy h-full w-full scale-150 object-cover blur-lg"
              />
              <Loader size="sm" className="swiper-lazy-preloader" />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="overlay | absolute top-0 left-0 z-10 h-full w-full bg-black opacity-10 mix-blend-multiply"></div>
    </div>
  );
};
export default GalleryBlur;
