import usePageMetadata from 'hooks/use-page-metadata';

import { getPaginatedJourneys } from 'lib/journeys';
import { getPageCustomDataByUri } from 'lib/pages';

import { Helmet } from 'react-helmet';

import { WebpageJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import JumboImage from 'components/JumboImage';
import SectionRelatedPostCard from 'components/SectionRelatedPostCard';

export default function Journeys({ journeys, pageInfo }) {
  const title = 'All Journeys';
  const slug = 'journeys';

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

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <WebpageJsonLd title={title} description={metadata.description} siteTitle={siteMetadata.title} slug={slug} />

      <Header>
        <JumboImage
          featuredImage={pageInfo?.featuredImage}
          title="Find your Journey"
          subtitle="We take care to make it perfect"
        />
      </Header>

      <Section>
        <SectionRelatedPostCard posts={journeys} />
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { journeys, pagination } = await getPaginatedJourneys({
    queryIncludes: 'archive',
  });

  const pageInfo = await getPageCustomDataByUri(`/pagejourneys/`);

  return {
    props: {
      journeys,
      pagination: {
        ...pagination,
        basePath: '/journeys',
      },
      pageInfo,
    },
  };
}
