import SectionSubtitle from 'components/SectionSubtitle';
import SectionTitle from 'components/SectionTitle';
import Button from 'components/Button';
import Container from 'components/Container';
import CarouselSlider from 'components/CarouselSlider';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Lazy } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { getBorderColorByName, getTextColorByName } from 'lib/util';

const DEFAULT_POST_OPTIONS = {};

const RelatedCarousel = ({
  title = 'Get Inspired',
  subtitle = 'And Fly Away',
  posts,
  postOptions = DEFAULT_POST_OPTIONS,
  slug = false,
  color = 'blue',
  reverse = false,
  button = 'See All',
}) => {
  const [initState, setInitState] = useState(0);
  const sliderIdentifier = title.toLocaleLowerCase().replace(/\s/g, '-');

  const TitleSlide = () => (
    <div
      className={`related-carousel__header | flex h-full max-w-[420px] shrink-0 flex-col px-12 ${
        slug ? 'justify-end' : 'justify-center'
      }`}
    >
      <div className={`related-carousel__title | ${slug && 'mb-8'}`}>
        <SectionTitle color={color}>{title}</SectionTitle>
        <SectionSubtitle className={`${!reverse && 'text-right'}`}>{subtitle}</SectionSubtitle>
      </div>
      {slug && (
        <Button path={slug} color={color} filled className="mx-auto block w-full text-center">
          {button}
        </Button>
      )}
    </div>
  );
  return (
    <section className={`related-carousel | relative overflow-hidden`}>
      <Container>
        <div className={`related-carousel__title | mb-4 md:hidden ${reverse && 'text-right'}`}>
          <SectionTitle color={color}>{title}</SectionTitle>
          <SectionSubtitle className={`${reverse ? 'mr-24' : 'ml-24'}`}>{subtitle}</SectionSubtitle>
        </div>
        <Swiper
          onSlideNextTransitionEnd={() => setInitState(initState + 1)}
          onSlidePrevTransitionEnd={() => setInitState(initState - 1)}
          modules={[Navigation, Lazy]}
          navigation={{
            prevEl: `.${sliderIdentifier}-buttons__prev`,
            nextEl: `.${sliderIdentifier}-buttons__next`,
          }}
          slidesPerView={'auto'}
          spaceBetween={0}
          centeredSlides={true}
          initialSlide={0}
          lazy={{ loadPrevNext: true, loadPrevNextAmount: 3 }}
          breakpoints={{
            768: {
              centeredSlides: false,
              initialSlide: reverse ? posts.length - 2 : 0,
            },
            1024: {
              lazy: { loadPrevNext: true, loadPrevNextAmount: 4 },
            },
            1540: {
              lazy: { loadPrevNext: true, loadPrevNextAmount: 5 },
            },
            2100: {
              lazy: { loadPrevNext: true, loadPrevNextAmount: 6 },
            },
            2675: {
              lazy: { loadPrevNext: true, loadPrevNextAmount: 7 },
            },
          }}
          className={`mb-4 !overflow-visible`}
        >
          {!reverse && (
            <SwiperSlide className={`hidden !h-auto !w-auto md:block`}>
              <TitleSlide />
            </SwiperSlide>
          )}
          {Array.isArray(posts) && (
            <>
              {posts.map((post) => {
                return (
                  <SwiperSlide key={post.id} className="!w-auto">
                    <div className={`related-carousel__post`}>
                      <CarouselSlider post={post} postOptions={postOptions} />
                    </div>
                  </SwiperSlide>
                );
              })}
            </>
          )}
          {reverse && (
            <SwiperSlide className={`hidden !h-auto !w-auto md:block`}>
              <TitleSlide />
            </SwiperSlide>
          )}
        </Swiper>
        {slug && (
          <Button
            path={slug}
            color={color}
            filled
            className={`p-4 md:float-none md:hidden ${reverse ? 'float-right' : 'float-left'}`}
          >
            {button}
          </Button>
        )}
      </Container>
      <div className="carousel-buttons hidden md:block">
        <ArrowPrev
          className={`${sliderIdentifier}-buttons__prev | absolute top-1/2 left-2 z-20 w-[60px] -translate-y-1/2`}
        />
        <ArrowNext
          className={`${sliderIdentifier}-buttons__next  | absolute top-1/2 right-2 z-20 w-[60px] -translate-y-1/2 ${
            reverse && initState === 1 && 'hidden'
          }`}
        />
      </div>
    </section>
  );
};

export const ArrowPrev = ({ className, color = 'blue', ...props }) => {
  return (
    <div className={`oversize | cursor-pointer bg-white bg-opacity-50 p-1 ${className}`} {...props}>
      <div
        className={`carousel-buttons__prev | border border-dashed p-3 hover:border-dotted ${getTextColorByName(
          color
        )} ${getBorderColorByName(color)}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
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
export const ArrowNext = ({ className, color = 'blue', ...props }) => {
  return (
    <div className={`oversize | cursor-pointer bg-white bg-opacity-50 p-1 ${className}`} {...props}>
      <div
        className={`carousel-buttons__next | border border-dashed p-3 hover:border-dotted ${getTextColorByName(
          color
        )} ${getBorderColorByName(color)}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
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

export default RelatedCarousel;
