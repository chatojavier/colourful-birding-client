import Layout from 'components/Layout';
import usePageMetadata from 'hooks/use-page-metadata';

import { getPaginatedPosts } from 'lib/posts';
import { getAllJourneys } from 'lib/journeys';
import { getAllRegions } from 'lib/regions';
import { WebpageJsonLd } from 'lib/json-ld';
import Helmet from 'react-helmet';

import useSite from 'hooks/use-site';
import { helmetSettingsFromMetadata } from 'lib/site';
import ToggleButton from 'components/ToggleButton';
import Section from 'components/Section';
import Container from 'components/Container';
import CollectionThumbCard from 'components/CollectionThumbCard';

export default function Birds({ posts }) {
  const title = 'All Birds';
  const slug = 'birds';

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      description: false,
    },
  });

  const { metadata: siteMetadata = {} } = useSite();

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  const FilterBar = ({ className }) => (
    <div className={`birds__filter-bar | flex w-full flex-wrap gap-4 ${className}`}>
      <div className="birds__filter-bar-item | flex-1">
        <ToggleButton color="lightblue" className="w-full">
          Coast
        </ToggleButton>
      </div>
      <div className="birds__filter-bar-item | flex-1">
        <ToggleButton color="lightblue" className="w-full">
          Mountains
        </ToggleButton>
      </div>
      <div className="birds__filter-bar-item | flex-1">
        <ToggleButton color="lightblue" className="w-full">
          Rainforest
        </ToggleButton>
      </div>
    </div>
  );

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <WebpageJsonLd title={title} description={metadata.description} sitetitle={siteMetadata.title} slug={slug} />

      <Section className="birds-collection">
        <Container>
          <FilterBar className="mb-12" />
          <CollectionThumbCard posts={posts} />
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { posts, pagination } = await getPaginatedPosts({
    postType: 'birds',
    postsPerPage: 12,
    queryIncludes: 'archive',
  });
  const { journeys } = await getAllJourneys({ queryIncludes: 'archive' });
  const { regions } = await getAllRegions();
  const allPosts = journeys;

  return {
    props: {
      posts,
      pagination: {
        ...pagination,
        basePath: '/journeys',
      },
      allPosts,
      regions,
    },
  };
}
