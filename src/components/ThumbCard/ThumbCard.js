import PropTypes from 'prop-types';
import { getMediaQueries } from 'lib/responsive';
import Link from 'next/link';
import { postPathBySlug } from 'lib/posts';
import { getRegionIconByName } from 'lib/regions';
import Loader from 'components/Loader';

const ThumbCard = ({ title, slug, featuredImage, regions, familyName, className = '' }) => {
  const { md, lg } = getMediaQueries();
  return (
    <div className={`thumbcard | group relative max-w-[280px] ${className}`}>
      <Link href={postPathBySlug('birds', slug)}>
        <a>
          <div className="thumbcard-background | relative mb-2 aspect-square w-full overflow-hidden">
            <img
              src={featuredImage?.src || '/images/default_image.png'}
              alt={featuredImage?.altText || 'Default image'}
              srcSet={featuredImage?.srcSet || ''}
              sizes={`${lg} 280px, ${md} 33.33vw, 50vw`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-0 -z-10 flex h-full w-full items-center justify-center bg-darkgrey bg-opacity-10">
              <Loader size="sm" />
            </div>
          </div>
        </a>
      </Link>

      <div className="thumbcard-content | flex w-full items-start justify-between space-x-2 md:space-x-0">
        <div className="thumcard-content left">
          <h3 className="thumbcard-content__title | font-bebas text-xl font-bold uppercase leading-5 group-hover:text-lightblue md:text-2xl md:leading-6">
            <Link href={postPathBySlug('birds', slug)}>
              <a>{title}</a>
            </Link>
          </h3>
          <div className="thumbcard-content__subtitle | text-xs uppercase md:text-sm">{familyName}</div>
        </div>
        <div className="thumcard-content">
          <div className="thumbcard-content__regions | flex flex-col space-y-1 text-xs md:flex-row md:space-x-1 md:space-y-0">
            {regions.map((region) => (
              <span key={region.id} className=" inline-block h-6 w-6 border p-1 md:h-8 md:w-8 ">
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
