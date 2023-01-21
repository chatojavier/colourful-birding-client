/* eslint-disable react-hooks/rules-of-hooks */
import { Helmet } from 'react-helmet';

import { getPostBySlug, getAllPosts, getRelatedPosts } from 'lib/posts';
import { categoryPathBySlug } from 'lib/categories';
import { ArticleJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';

import ArticleContent from 'components/ArticleContent/ArticleContent';
import JumboImage from 'components/JumboImage';
import RelatedCarousel from 'components/RelatedCarousel';
import { getRandomJourneys } from 'lib/journeys';
import CollectionPostCard from 'components/CollectionPostCard';
import Loader from 'components/Loader';

export default function Post({ post, socialImage, related, journeys }) {
  if (!post) {
    return (
      <Layout>
        <Section className="flex h-96 items-center justify-center">
          <Loader />
        </Section>
      </Layout>
    );
  }

  const { title, metaTitle, description, content, date, author, imagePost } = post;

  const { metadata: siteMetadata = {}, homepage } = useSite();

  if (!post.og) {
    post.og = {};
  }

  post.og.imageUrl = post.og.image?.sourceUrl || `${homepage}${socialImage}`;
  post.og.imageSecureUrl = `${homepage}${socialImage}`;
  post.og.imageWidth = post.og.image?.mediaDetails?.width || 2000;
  post.og.imageHeight = post.og.image?.mediaDetails?.height || 1000;

  const { metadata } = usePageMetadata({
    metadata: {
      ...post,
      title: metaTitle || title,
      description: description || post.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const { posts: relatedPostsList } = related || {};

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  const imageDesktop = imagePost.desktop;
  const imageMobile = imagePost?.mobile ?? imagePost.desktop;

  return (
    <Layout>
      <Helmet {...helmetSettings}>
        <meta name="robots" content="all" />
      </Helmet>

      <ArticleJsonLd post={post} siteTitle={siteMetadata.title} />

      <Header>
        <JumboImage imageDesktop={imageDesktop} imageMobile={imageMobile} title={title} />
      </Header>

      <Section>
        <Container>
          <ArticleContent author={author} date={date}>
            {content}
          </ArticleContent>
        </Container>
      </Section>

      {relatedPostsList && relatedPostsList.length > 0 && (
        <Section>
          <RelatedCarousel
            title="Other Stories"
            subtitle="And Experiences"
            posts={relatedPostsList}
            slug="/posts"
            color="blue"
            button="See All the Stories"
          />
        </Section>
      )}
      {journeys && journeys.length > 0 && (
        <Section>
          <CollectionPostCard
            posts={journeys}
            title="Find your Journey"
            subtitle="We take care to make it perfect"
            button="See all the journeys"
            slug="/journeys"
          />
        </Section>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { post } = await getPostBySlug(params?.slug);

  if (!post) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  const { categories, databaseId: postId } = post;

  const props = {
    post,
    socialImage: `${process.env.OG_IMAGE_DIRECTORY}/${params?.slug}.png`,
  };

  const { category: relatedCategory, posts: relatedPosts } = (await getRelatedPosts(categories, postId)) || {};
  const hasRelated = relatedCategory && Array.isArray(relatedPosts) && relatedPosts.length;

  if (hasRelated) {
    props.related = {
      posts: relatedPosts,
      title: {
        name: relatedCategory.name || null,
        link: categoryPathBySlug(relatedCategory.slug),
      },
    };
  }

  const { journeys } = await getRandomJourneys({
    count: 2,
    queryIncludes: 'archive',
  });

  if (Array.isArray(journeys) && journeys.length > 0) {
    props.journeys = journeys;
  }

  return {
    props,
  };
}

export async function getStaticPaths() {
  const { posts } = await getAllPosts({
    queryIncludes: 'index',
  });

  const paths = posts
    .filter(({ slug }) => typeof slug === 'string')
    .map(({ slug }) => ({
      params: {
        slug,
      },
    }));

  return {
    paths,
    fallback: true,
  };
}
