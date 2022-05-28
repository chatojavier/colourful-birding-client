import Link from 'next/link';
import { Helmet } from 'react-helmet';

import useSite from 'hooks/use-site';
import { getAllRegions, regionPathBySlug } from 'lib/regions';
import { WebpageJsonLd } from 'lib/json-ld';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';

import styles from 'styles/pages/Categories.module.scss';

export default function Regions({ regions }) {
  const { metadata = {} } = useSite();
  const { title: siteTitle } = metadata;
  const title = 'Regions';
  const slug = 'regions';
  let metaDescription = `Read ${regions.length} regions at ${siteTitle}.`;

  return (
    <Layout>
      <Helmet>
        <title>Regions</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
      </Helmet>

      <WebpageJsonLd title={title} description={metaDescription} siteTitle={siteTitle} slug={slug} />

      <Header>
        <Container>
          <h1>Regions</h1>
        </Container>
      </Header>

      <Section>
        <Container>
          <SectionTitle>All Regions</SectionTitle>
          <ul className={styles.categories}>
            {regions.map((region) => {
              return (
                <li key={region.slug}>
                  <Link href={`/birds${regionPathBySlug(region.slug)}`}>
                    <a>{region.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { regions } = await getAllRegions();

  return {
    props: {
      regions,
    },
  };
}
