import Link from 'next/link';
import { Helmet } from 'react-helmet';

import { getBirdBySlug, getAllBirds, getRelatedBirds, birdPathBySlug } from 'lib/birds';
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

export default function Bird({ bird, socialImage, related }) {
  const { title, metaTitle, description, content, date, regions, modified, featuredImage } = bird;

  const { metadata: siteMetadata = {}, homepage } = useSite();

  console.log(bird);
  if (!bird.og) {
    bird.og = {};
  }

  bird.og.imageUrl = `${homepage}${socialImage}`;
  bird.og.imageSecureUrl = bird.og.imageUrl;
  bird.og.imageWidth = 2000;
  bird.og.imageHeight = 1000;

  const { metadata } = usePageMetadata({
    metadata: {
      ...bird,
      title: metaTitle,
      description: description || bird.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const metadataOptions = {
    compactCategories: false,
  };

  const { birds: relatedBirdsList, title: relatedBirdsTitle } = related || {};

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <ArticleJsonLd post={bird} siteTitle={siteMetadata.title} hasAuthor={!!bird.author} postType="bird" />

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
          {Array.isArray(relatedBirdsList) && relatedBirdsList.length > 0 && (
            <div className={styles.relatedPosts}>
              {relatedBirdsTitle.name ? (
                <span>
                  More from{' '}
                  <Link href={relatedBirdsTitle.link}>
                    <a>{relatedBirdsTitle.name}</a>
                  </Link>
                </span>
              ) : (
                <span>More Birds</span>
              )}
              <ul>
                {relatedBirdsList.map((bird) => (
                  <li key={bird.title}>
                    <Link href={birdPathBySlug(bird.slug)}>
                      <a>{bird.title}</a>
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
  const { bird } = await getBirdBySlug(params?.slug);
  const { regions, databaseId: birdId } = bird;

  const props = {
    bird,
    socialImage: `${process.env.OG_IMAGE_DIRECTORY}/${params?.slug}.png`,
  };

  const { region: relatedRegion, birds: relatedBirds } = (await getRelatedBirds(regions, birdId)) || {};
  const hasRelated = relatedRegion && Array.isArray(relatedBirds) && relatedBirds.length;

  if (hasRelated) {
    props.related = {
      birds: relatedBirds,
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
  const { birds } = await getAllBirds({
    queryIncludes: 'index',
  });

  const paths = birds
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
