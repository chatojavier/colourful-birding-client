import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { EffectFade, Controller, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getMediaQueries } from 'lib/responsive';

const GalleryBlur = ({ galleryDesktop = [], galleryMobile = [], onSwiper }) => {
  const { md } = getMediaQueries();
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
        {galleryDesktop.map((item, index) => {
          const galleryMobileUpdated = galleryMobile && galleryMobile?.length > 0 ? galleryMobile : galleryDesktop;
          const galleryDesktopHeight = galleryDesktop[index].mediaDetails.height;
          const galleryDesktopWidth = galleryDesktop[index].mediaDetails.width;
          const galleryMobileHeight = galleryMobileUpdated[index].mediaDetails.height;
          const galleryMobileWidth = galleryMobileUpdated[index].mediaDetails.width;
          return (
            <SwiperSlide key={item.id} className="overflow-hidden">
              <picture>
                <source
                  data-srcset={galleryDesktop[index]?.srcSet}
                  sizes="(min-width: 768px) 950px, 90vw"
                  media={md}
                  height={galleryDesktopHeight}
                  width={galleryDesktopWidth}
                />
                <source
                  data-srcset={galleryMobileUpdated[index].srcSet}
                  sizes="(min-width: 768px) 950px, 90vw"
                  height={galleryMobileHeight}
                  width={galleryMobileWidth}
                />
                <img
                  data-src={galleryDesktop[index].sourceUrl}
                  alt={galleryDesktop[index].altText}
                  className="swiper-lazy h-full w-full scale-150 object-cover blur-lg"
                />
              </picture>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="overlay | absolute top-0 left-0 z-10 h-full w-full bg-black opacity-10 mix-blend-multiply"></div>
    </div>
  );
};
export default GalleryBlur;
