import ThumbCard from 'components/ThumbCard';

const CollectionThumbCard = ({ posts, className }) => {
  return (
    <div className={`collection-thumbcard | grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 ${className}`}>
      {posts.map((post) => {
        const { id, title, slug, featuredImage, regions, familyName } = post;
        return (
          <ThumbCard
            key={id}
            title={title}
            slug={slug}
            featuredImage={featuredImage}
            regions={regions}
            familyName={familyName}
            className="mx-auto"
          />
        );
      })}
    </div>
  );
};
export default CollectionThumbCard;
