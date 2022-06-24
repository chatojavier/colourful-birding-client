import DateFormated from 'components/DateFormated';
import { getRegionIconByName } from 'lib/regions';
import { postPathBySlug } from 'lib/posts';
import Link from 'next/link';

const CarouselSlider = ({ post }) => {
  const { featuredImage, title, familyName, regions, contentTypeName, excerpt, slug, date, imagePost } = post;
  const sliderImage = imagePost?.mobile ?? featuredImage;
  return (
    <div className="carousel-slider | group relative h-[495px] w-[280px] p-4">
      <Link href={postPathBySlug(contentTypeName, slug) || '/'}>
        <a>
          <div className="carousel-slider__content | flex h-full flex-col justify-between text-white">
            <div className="carousel-slider__content__regions | flex justify-end space-x-2">
              {regions &&
                regions.map((region, index) => (
                  <div
                    className="carousel-slider__content__region-icon | w-10 border border-white fill-white p-1"
                    key={index}
                  >
                    {getRegionIconByName(region.name)}
                  </div>
                ))}
            </div>
            <div className="carousel-slider--bottom | m-4">
              <div className="carousel-slider__title | font-bebas text-2xl">
                <h2>{title}</h2>
              </div>
              <div className="carousel-slider__subtitle | text-sm uppercase">
                <div>{familyName ? familyName : date ? <DateFormated date={date} /> : ''}</div>
              </div>
              {contentTypeName === 'post' && excerpt && (
                <div className="carousel-slider__excerpt | mt-2 h-0 overflow-hidden text-sm transition-all group-hover:h-20">
                  <div dangerouslySetInnerHTML={{ __html: excerpt }} className="line-clamp-4"></div>
                </div>
              )}
            </div>
          </div>
          <div className="carousel-slider__image | absolute top-0 left-0 -z-10 h-full w-full overflow-hidden">
            <img
              src={sliderImage?.sourceUrl ?? 'https://source.unsplash.com/random/280×500/?birds'}
              srcSet={sliderImage?.srcSet ?? ''}
              sizes="500w"
              width="280"
              height="495"
              alt={`${sliderImage?.altText}`}
              loading="lazy"
              className={`h-full w-full object-cover transition-transform duration-500 ${
                contentTypeName === 'post' ? 'scale-105 group-hover:scale-100' : 'group-hover:scale-105'
              }`}
            />
            <div className="carousel-slider__image__overlay | absolute top-0 left-0 flex h-full w-full flex-col justify-between">
              <div className="carousel-slider__image__overlay--top | h-[33%] w-full bg-gradient-to-t from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.60)]"></div>
              <div className="carousel-slider__image__overlay--bottom | h-[33%] w-full bg-gradient-to-t from-[rgba(0,0,0,0.60)] to-[rgba(0,0,0,0)]"></div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
export default CarouselSlider;
