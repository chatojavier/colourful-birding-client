import Link from 'next/link';

import { postPathBySlug } from 'lib/posts';
import { sanitizeExcerpt } from 'lib/posts';
import DateFromTo from 'components/DateFromTo';
import DateFormated from 'components/DateFormated';
import { getMediaQueries } from 'lib/responsive';
import Button from 'components/Button';
import { useEffect, useRef, useState } from 'react';
import useWindowSize from 'hooks/use-window-resize';

const PostCard = ({ post, options = {}, color = 'purple' }) => {
  const {
    title,
    slug,
    date,
    author,
    categories = null,
    regions = null,
    featuredImage,
    imagePost,
    contentTypeName,
    programedDates,
    excerpt,
  } = post;
  const sliderImage = imagePost?.desktop ?? featuredImage;
  const featuredImageHtml = useRef(null);
  const backgroundHtml = useRef(null);
  const [bottomSpace, setBottomSpace] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [windowWidth] = useWindowSize();

  const { md, lg } = getMediaQueries();
  const { excludeMetadata = [] } = options;

  const metadata = {};

  const categoriesUpdated = categories || regions;

  if (!excludeMetadata.includes('author')) {
    metadata.author = author;
  }

  if (!excludeMetadata.includes('date')) {
    metadata.date = date;
  }

  if (!excludeMetadata.includes('categories')) {
    metadata.categories = categoriesUpdated;
  }

  useEffect(() => {
    const featuredImageHieght = featuredImageHtml.current.offsetHeight;
    const backgroundHeight = backgroundHtml.current.offsetHeight;
    const bottomSpace = featuredImageHieght + 64 - backgroundHeight;
    if (bottomSpace > 0 && windowWidth >= 768) {
      setBottomSpace(bottomSpace + 24);
    } else {
      setBottomSpace(24);
    }
  }, [windowWidth, refresh]);

  useEffect(() => {
    let timeout;
    if (bottomSpace === 0) {
      timeout = setTimeout(() => setRefresh(refresh + 1), 500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [bottomSpace]);

  return (
    <>
      <div className="post-card | relative md:py-16">
        <div className="postcard__main | md:relative md:mx-auto md:w-[80%] md:max-w-[800px]">
          <div
            className="postcard__main__featured-image | h-[280px] w-full overflow-hidden md:absolute md:right-0 md:aspect-square md:h-auto md:w-[50%] md:max-w-[485px] md:shrink-0 md:group-even:left-0"
            ref={featuredImageHtml}
          >
            <Link href={postPathBySlug(contentTypeName, slug)}>
              <a>
                {sliderImage && (
                  <img
                    src={sliderImage?.sourceUrl}
                    srcSet={sliderImage?.srcSet}
                    sizes={`${lg} 400px, ${md} 35.5vw, 100vw`}
                    alt={sliderImage?.altText}
                    title={title}
                    loading="lazy"
                    className="postcard__main__featured-image__image h-full w-full object-cover"
                  />
                )}
              </a>
            </Link>
          </div>
          <div className="postcard__main__content | relative -mt-16 w-10/12 bg-white px-8 py-4 group-even:ml-auto group-even:flex group-even:flex-col group-even:items-end md:mt-0 md:w-1/2 md:bg-opacity-0 md:group-even:block">
            <h4 className="postcard__main__content__title | font-bebas text-4xl uppercase group-even:text-right md:text-5xl md:group-even:text-left lg:text-6xl">
              <Link href={postPathBySlug(contentTypeName, slug)}>
                <a>{title}</a>
              </Link>
            </h4>
            <div className="postcard__main__content__date | mb-4 text-xs md:text-sm lg:text-base">
              {contentTypeName === 'journeys' && programedDates && (
                <DateFromTo from={programedDates.from} to={programedDates.to} />
              )}
              {contentTypeName === 'post' && <DateFormated date={date} />}
            </div>
            {contentTypeName === 'post' && (
              <div className="postcard__main__content__excerpt | mb-4 text-xs md:text-sm lg:text-base">
                {excerpt && (
                  <div
                    className="postcard__main__content__excerpt__text | line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeExcerpt(excerpt),
                    }}
                  />
                )}
              </div>
            )}
            <Button
              className="postcard__main__content__button | inline-block md:mt-4"
              path={postPathBySlug(contentTypeName, slug)}
              variant="primary"
              size="large"
              color={color}
            >
              {contentTypeName === 'journeys' ? 'Discover' : 'Read More'}
            </Button>
          </div>
        </div>
        <div
          className={`postcard__backgorund | -z-10 hidden h-full w-full md:absolute md:top-0 md:right-0 md:grid ${
            contentTypeName === 'post' && excerpt
              ? 'md:grid-cols-[20%_60%_20%] lg:grid-cols-[1fr_660px_1fr]'
              : 'md:grid-cols-[1fr_86%_1fr] lg:grid-cols-[1fr_875px_1fr]'
          }`}
          ref={backgroundHtml}
        >
          <div className="postcard__background__left col-start-1 col-end-3 h-full overflow-hidden group-even:col-start-2 group-even:col-end-4">
            {sliderImage && (
              <img
                src={sliderImage.sourceUrl}
                srcSet={sliderImage.srcSet}
                sizes={`80vw`}
                alt={sliderImage.altText}
                title={title}
                className="postcard__background__image h-full w-full scale-125 object-cover object-center blur-md"
              />
            )}
            <div className="postcard__background__overlay | absolute top-0 left-0 z-20 h-full w-full bg-white opacity-75"></div>
          </div>
          <div className="postcard__backgrund__center h-full"></div>
          <div className="postcard__backgrund__right h-full"></div>
        </div>
      </div>
      <div className="post-card__bottomSpace" style={{ height: bottomSpace }}></div>
    </>
  );
};

export default PostCard;
