import 'swiper/css';
import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Controller } from 'swiper';

import styles from './GalleryInfo.module.scss';

const GalleryInfo = ({ children, onSwiper }) => {
  return (
    <div className="gallery-info">
      <Swiper
        modules={[EffectFade, Controller]}
        effect="fade"
        loop={true}
        loopAdditionalSlides={1}
        onSwiper={onSwiper}
        allowTouchMove={false}
        className={`w-full max-w-[250px] !overflow-visible md:max-w-[300px] ${styles.swiperInfo}`}
      >
        {children.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}>{item}</div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GalleryInfo;
