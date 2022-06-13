import SectionSubtitle from 'components/SectionSubtitle';
import SectionTitle from 'components/SectionTitle';
import PostCard from 'components/PostCard';
import Button from 'components/Button';

const DEFAULT_POST_OPTIONS = {};

const SectionRelatedPostCard = ({
  title = 'Find your Journey',
  subtitle = 'We take care to make it perfect.',
  posts,
  postOptions = DEFAULT_POST_OPTIONS,
  slug = 'journeys',
}) => {
  return (
    <div className="related-posts">
      <div className="related-posts__header |  mb-4 flex flex-col items-end p-6">
        <SectionTitle color={'purple'}>{title}</SectionTitle>
        <SectionSubtitle>{subtitle}</SectionSubtitle>
      </div>
      <div className="related-posts__posts">
        {Array.isArray(posts) && (
          <>
            {posts.map((post) => {
              return (
                <div className="related-posts__post | group mb-6" key={post.databaseId}>
                  <PostCard post={post} postOptions={postOptions} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="related-posts__button mx-auto w-fit">
        <Button href={slug} color="purple" filled className="mx-auto">
          See All the Journeys
        </Button>
      </div>
    </div>
  );
};

export default SectionRelatedPostCard;
