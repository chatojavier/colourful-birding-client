/* eslint-disable react-hooks/rules-of-hooks */
import { Helmet } from 'react-helmet';

import { getBirdBySlug, getAllBirds } from 'lib/birds';
import { regionPathBySlug } from 'lib/regions';
import { ArticleJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Container from 'components/Container';
import BirdInfo from 'components/BirdInfo';
import JumboGallery from 'components/JumboGallery';
import Widescreen from 'components/Widescreen';
import CollectionPostCard from 'components/CollectionPostCard';
import { getRelatedJourneys } from 'lib/journeys';
import Section from 'components/Section';
import { getMediaQueries } from 'lib/responsive';
import useWindowSize from 'hooks/use-window-resize';
import Loader from 'components/Loader';
import { useMemo } from 'react';

export default function Bird({ bird, socialImage, related }) {
  if (!bird) {
    return (
      <Layout>
        <Section className="flex h-96 items-center justify-center">
          <Loader />
        </Section>
      </Layout>
    );
  }

  const { title, metaTitle, description, content, regions, featuredImage, familyName, gallery } = bird;
  const { metadata: siteMetadata = {}, homepage } = useSite();
  const { md } = getMediaQueries();
  const mdQuery = md.replace(/[^0-9]/g, '');
  const [windowWidth] = useWindowSize();

  if (!bird.og) {
    bird.og = {};
  }

  bird.og.imageUrl = bird.og.image?.sourceUrl || `${homepage}${socialImage}`;
  bird.og.imageSecureUrl = `${homepage}${socialImage}`;
  bird.og.imageWidth = bird.og.image?.mediaDetails?.width || 2000;
  bird.og.imageHeight = bird.og.image?.mediaDetails?.height || 1000;

  const { metadata } = usePageMetadata({
    metadata: {
      ...bird,
      title: metaTitle || title,
      description: description || bird.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const helmetOptions = {
    meta: [{ name: 'robots', content: 'all' }],
  };

  const helmetSettings = helmetSettingsFromMetadata(metadata, helmetOptions);
  const { journeys: relatedJourneysList } = related || {};

  const galleryImages = useMemo(() => {
    if (gallery.galleryMobile && gallery.galleryMobile.length > 0 && windowWidth < mdQuery) {
      return gallery.galleryMobile;
    } else {
      return gallery.galleryDesktop;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <ArticleJsonLd post={bird} siteTitle={siteMetadata.title} hasAuthor={!!bird.author} postType="bird" />

      <Widescreen className="mb-6 md:mb-20">
        <JumboGallery galleryImages={galleryImages} featuredImage={featuredImage} />
      </Widescreen>

      <Container className="mb-6 md:mb-20">
        <BirdInfo title={title} regions={regions} content={content} familyName={familyName} />
      </Container>

      <Widescreen>
        <CollectionPostCard
          title={`${title}'s Journeys`}
          subtitle="We Take Care of Make It Perfect"
          posts={relatedJourneysList}
          slug="/journeys"
        />
      </Widescreen>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { bird } = await getBirdBySlug(params?.slug);

  if (!bird) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  const { regions, databaseId: birdId } = bird;

  const props = {
    bird,
    socialImage: `${process.env.OG_IMAGE_DIRECTORY}/${params?.slug}.png`,
  };

  const { region: relatedRegion, journeys: relatedJourneys } = (await getRelatedJourneys(regions, birdId, 2)) || {};
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
    fallback: true,
  };
}
