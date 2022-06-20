import SectionSubtitle from 'components/SectionSubtitle';
import SectionTitle from 'components/SectionTitle';
import PostCard from 'components/PostCard';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { Transition } from '@headlessui/react';

const DEFAULT_POST_OPTIONS = {};

const CollectionPostCard = ({
  title = 'Find your Journey',
  subtitle = 'We take care to make it perfect.',
  posts,
  postOptions = DEFAULT_POST_OPTIONS,
  slug = 'journeys',
  button = 'See All the Journeys',
  loading = false,
  color = 'purple',
}) => {
  return (
    <div className="related-posts">
      {title && (
        <div className="related-posts__header | container mx-auto mb-4 flex flex-col items-end p-6">
          <SectionTitle color={color} className="text-right">
            {title}
          </SectionTitle>
          <SectionSubtitle>{subtitle}</SectionSubtitle>
        </div>
      )}
      <Transition
        show={!loading}
        enter="transition-opacity duration-250"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-250"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={`related-posts__posts | h-full transition-all ${loading ? 'opacity-0' : 'opacity-100'}`}>
          {posts && Array.isArray(posts) && posts.length > 0 ? (
            <>
              {posts.map((post) => {
                console.log(post);
                return (
                  <div className="related-posts__post | group mb-6" key={post.slug}>
                    <PostCard post={post} postOptions={postOptions} color={color} />
                  </div>
                );
              })}
            </>
          ) : (
            <div className="related-posts__no-posts |  flex h-full min-h-[500px] w-full flex-col items-center justify-center space-y-2 text-blue">
              <p className="block font-bebas text-xl">There are no Journeys found</p>
              <div className="no-poct-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </Transition>
      <Transition
        show={loading}
        enter="transition-opacity duration-250"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-250"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="loading | flex h-full min-h-[500px] w-full  items-center justify-center">
          <div className="loading__icon">
            <Loader size={'medium'} />
          </div>
        </div>
      </Transition>
      {button && (
        <div className="related-posts__button mx-auto w-fit">
          <Button path={slug} color={color} filled className="mx-auto">
            {button}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CollectionPostCard;
