import SectionTitle from 'components/SectionTitle';
import SectionSubtitle from 'components/SectionSubtitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import { DividerH } from 'components/Divider';
import { ArrowPrev, ArrowNext } from 'components/RelatedCarousel/RelatedCarousel';

import styles from './Testimonials.module.scss';

const Testimonials = ({ title, subtitle, testimonials }) => {
  return (
    <div className={`testimonials ${styles.testimonials}`}>
      <div className="testimonials__header | mx-auto mb-16 px-8 md:w-[450px] md:px-0">
        <SectionTitle color="lightblue">{title}</SectionTitle>
        <SectionSubtitle className="text-right">{subtitle}</SectionSubtitle>
      </div>
      <div className="testimonials__testimonials | relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            prevEl: '.testimonial__prev',
            nextEl: '.testimonial__next',
          }}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
          autoplay
          className="w-10/12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="space-y-4">
              <div className="testimonials__description">{testimonial.testimony}</div>
              <DividerH className="w-1/2" />
              <div className="testimonials__name | uppercase">{testimonial.name}</div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="carousel-buttons hidden md:block">
          <ArrowPrev
            color="lightblue"
            className="testimonial__prev | absolute top-1/2 left-0 z-20 w-12 -translate-y-1/2"
          />
          <ArrowNext
            color="lightblue"
            className={`testimonial__next | absolute top-1/2 right-2 z-20 w-12 -translate-y-1/2 `}
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
