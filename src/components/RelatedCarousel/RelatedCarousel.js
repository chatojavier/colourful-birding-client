import SectionSubtitle from 'components/SectionSubtitle';
import SectionTitle from 'components/SectionTitle';
import Button from 'components/Button';
import Container from 'components/Container';
import CarouselSlider from 'components/CarouselSlider';
import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const DEFAULT_POST_OPTIONS = {};

const SectionRelatedCarousel = ({
  title = 'Get Inspired',
  subtitle = 'And Fly Away',
  posts,
  postOptions = DEFAULT_POST_OPTIONS,
  slug = false,
  color = 'blue',
}) => {
  const mainSwiper = useRef(null);

  useEffect(() => {
    console.log('mainSwiper', mainSwiper.current);
  }, [mainSwiper]);

  return (
    <section className="related-carousel | relative overflow-hidden">
      <Container>
        <div className="related-carousel__title | mb-4 md:hidden">
          <SectionTitle color={color}>{title}</SectionTitle>
          <SectionSubtitle className="ml-24">{subtitle}</SectionSubtitle>
        </div>
        <Swiper
          onSwiper={(swiper) => (mainSwiper.current = swiper)}
          modules={[Navigation]}
          navigation={{
            prevEl: '.related-carousel-buttons__prev',
            nextEl: '.related-carousel-buttons__next',
          }}
          slidesPerView={'auto'}
          spaceBetween={0}
          centeredSlides={true}
          breakpoints={{
            768: {
              centeredSlides: false,
            },
          }}
          className={`mb-4 !overflow-visible`}
        >
          <SwiperSlide className="hidden !h-auto !w-auto md:block">
            <div
              className={`related-carousel__header | flex h-full max-w-[420px] shrink-0 flex-col px-12 ${
                slug ? 'justify-end' : 'justify-center'
              }`}
            >
              <div className={`related-carousel__title | ${slug && 'mb-8'}`}>
                <SectionTitle color={color}>{title}</SectionTitle>
                <SectionSubtitle className="text-right">{subtitle}</SectionSubtitle>
              </div>
              {slug && (
                <Button path={slug} color={color} filled className="mx-auto block w-full text-center">
                  See All the Birds
                </Button>
              )}
            </div>
          </SwiperSlide>
          {Array.isArray(posts) && (
            <>
              {posts.map((post) => {
                return (
                  <SwiperSlide key={post.id} className="!w-auto">
                    <div className="related-carousel__post" key={post.databaseId}>
                      <CarouselSlider post={post} postOptions={postOptions} />
                    </div>
                  </SwiperSlide>
                );
              })}
            </>
          )}
        </Swiper>
        {slug && (
          <Button path={slug} color={color} filled className="p-4 md:hidden">
            See All the Birds
          </Button>
        )}
      </Container>
      <div className="carousel-buttons hidden md:block">
        <ArrowPrev className="related-carousel-buttons__prev | absolute top-1/2 left-2 z-20 -translate-y-1/2" />
        <ArrowNext className="related-carousel-buttons__next | absolute top-1/2 right-2 z-20 -translate-y-1/2" />
      </div>
    </section>
  );
};

const ArrowPrev = ({ className, ...props }) => {
  return (
    <div className={`oversize | cursor-pointer bg-white bg-opacity-50 p-1 ${className}`} {...props}>
      <div className={`carousel-buttons__prev | border border-dashed border-blue p-3 text-blue`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-left"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </div>
    </div>
  );
};
const ArrowNext = ({ className, ...props }) => {
  return (
    <div className={`oversize | cursor-pointer bg-white bg-opacity-50 p-1 ${className}`} {...props}>
      <div className={`carousel-buttons__next | border border-dashed border-blue p-3 text-blue`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-right"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </div>
  );
};

export default SectionRelatedCarousel;
