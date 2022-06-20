import PropTypes from 'prop-types';
import { getMediaQueries } from 'lib/responsive';
import Link from 'next/link';
import { postPathBySlug } from 'lib/posts';
import { getRegionIconByName } from 'lib/regions';

const ThumbCard = ({ title, slug, featuredImage, regions, familyName, className = '' }) => {
  const { md, lg } = getMediaQueries();
  return (
    <div className={`thumbcard | group max-w-[280px] ${className}`}>
      <Link href={postPathBySlug('birds', slug)}>
        <a>
          <div className="thumbcard-background | mb-2 aspect-square h-full w-full overflow-hidden">
            <img
              src={featuredImage.src}
              alt={featuredImage.altText}
              srcSet={featuredImage.srcSet}
              sizes={`${lg} 280px, ${md} 33.33vw, 50vw`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </a>
      </Link>

      <div className="thumbcard-content | flex w-full items-center justify-between">
        <div className="thumcard-content left">
          <h3 className="thumbcard-content__title | font-bebas text-2xl font-bold uppercase group-hover:text-lightblue">
            <Link href={postPathBySlug('birds', slug)}>
              <a>{title}</a>
            </Link>
          </h3>
          <div className="thumbcard-content__subtitle | text-xs uppercase md:text-sm">{familyName}</div>
        </div>
        <div className="thumcard-content right">
          <div className="thumbcard-content__regions | space-x-2 text-xs">
            {regions.map((region) => (
              <span key={region.id} className="inline-block h-[40px] w-[40px] border p-1">
                {getRegionIconByName(region.name)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ThumbCard.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  featuredImage: PropTypes.shape({
    altText: PropTypes.string,
    caption: PropTypes.string,
    sourceUrl: PropTypes.string,
    srcSet: PropTypes.string,
    sizes: PropTypes.string,
    id: PropTypes.string,
  }),
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
  familyName: PropTypes.string,
};

export default ThumbCard;
