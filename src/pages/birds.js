import Layout from 'components/Layout';
import usePageMetadata from 'hooks/use-page-metadata';

import { getPaginatedBirds } from 'lib/birds';
import { WebpageJsonLd } from 'lib/json-ld';
import Helmet from 'react-helmet';

import useSite from 'hooks/use-site';
import { helmetSettingsFromMetadata } from 'lib/site';
import ToggleButton from 'components/ToggleButton';
import Section from 'components/Section';
import Container from 'components/Container';

export default function Birds() {
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

  const FilterBar = () => (
    <div className="birds__filter-bar | flex w-full flex-wrap gap-4">
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
      <div className="birds__filter-bar-item | flex-1">
        <ToggleButton color="lightblue" className="w-full">
          All
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
          <FilterBar />
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { birds, pagination } = await getPaginatedBirds({
    queryIncludes: 'archive',
  });
  return {
    props: {
      birds,
      pagination: {
        ...pagination,
        basePath: '/birds',
      },
    },
  };
}
