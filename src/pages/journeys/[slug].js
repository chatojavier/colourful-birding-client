import Link from 'next/link';
import { Helmet } from 'react-helmet';

import { getJourneyBySlug, getAllJourneys, getRelatedJourneys, journeyPathBySlug } from 'lib/journeys';
import { regionPathBySlug } from 'lib/regions';
import { formatDate } from 'lib/datetime';
import { ArticleJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import Metadata from 'components/Metadata';
import FeaturedImage from 'components/FeaturedImage';

import styles from 'styles/pages/Post.module.scss';

export default function Journey({ journey, socialImage, related }) {
  const { title, metaTitle, description, content, date, regions, modified, featuredImage } = journey;

  const { metadata: siteMetadata = {}, homepage } = useSite();

  if (!journey.og) {
    journey.og = {};
  }

  journey.og.imageUrl = `${homepage}${socialImage}`;
  journey.og.imageSecureUrl = journey.og.imageUrl;
  journey.og.imageWidth = 2000;
  journey.og.imageHeight = 1000;

  const { metadata } = usePageMetadata({
    metadata: {
      ...journey,
      title: metaTitle,
      description: description || journey.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const metadataOptions = {
    compactRegions: false,
  };

  const { journeys: relatedJourneysList, title: relatedJourneysTitle } = related || {};

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <ArticleJsonLd post={journey} siteTitle={siteMetadata.title} />

      <Header>
        {featuredImage && (
          <FeaturedImage
            {...featuredImage}
            src={featuredImage.sourceUrl}
            dangerouslySetInnerHTML={featuredImage.caption}
          />
        )}
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
        <Metadata className={styles.postMetadata} date={date} categories={regions} options={metadataOptions} />
      </Header>

      <Content>
        <Section>
          <Container>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </Container>
        </Section>
      </Content>

      <Section className={styles.postFooter}>
        <Container>
          <p className={styles.postModified}>Last updated on {formatDate(modified)}.</p>
          {Array.isArray(relatedJourneysList) && relatedJourneysList.length > 0 && (
            <div className={styles.relatedPosts}>
              {relatedJourneysTitle.name ? (
                <span>
                  More from{' '}
                  <Link href={relatedJourneysTitle.link}>
                    <a>{relatedJourneysTitle.name}</a>
                  </Link>
                </span>
              ) : (
                <span>More Journeys</span>
              )}
              <ul>
                {relatedJourneysList.map((journey) => (
                  <li key={journey.title}>
                    <Link href={journeyPathBySlug(journey.slug)}>
                      <a>{journey.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { journey } = await getJourneyBySlug(params?.slug);
  const { regions, databaseId: journeyId } = journey;

  const props = {
    journey,
    socialImage: `${process.env.OG_IMAGE_DIRECTORY}/${params?.slug}.png`,
  };

  const { region: relatedRegion, journeys: relatedJourneys } = (await getRelatedJourneys(regions, journeyId)) || {};
  const hasRelated = relatedRegion && Array.isArray(relatedJourneys) && relatedJourneys.length;

  if (hasRelated) {
    props.related = {
      journeys: relatedJourneys,
      title: {
        name: relatedRegion.name || null,
        link: regionPathBySlug(relatedRegion.slug),
      },
    };
  }

  return {
    props,
  };
}

export async function getStaticPaths() {
  const { journeys } = await getAllJourneys({
    queryIncludes: 'index',
  });

  const paths = journeys
    .filter(({ slug }) => typeof slug === 'string')
    .map(({ slug }) => ({
      params: {
        slug,
      },
    }));

  return {
    paths,
    fallback: false,
  };
}
