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
import SectionRelatedPostCard from 'components/SectionRelatedPostCard';
import { getRelatedJourneys } from 'lib/journeys';

export default function Bird({ bird, socialImage, related }) {
  const { title, metaTitle, description, content, regions, featuredImage, familyName, gallery } = bird;
  const { metadata: siteMetadata = {}, homepage } = useSite();

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

  const { journeys: relatedJourneysList } = related || {};

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <ArticleJsonLd post={bird} siteTitle={siteMetadata.title} hasAuthor={!!bird.author} postType="bird" />

      <Widescreen className="mb-6 md:mb-20">
        <JumboGallery
          galleryDesktop={gallery.galleryDesktop}
          galleryMobile={gallery.galleryMobile}
          featuredImage={featuredImage}
        />
      </Widescreen>

      <Container className="mb-6 md:mb-20">
        <BirdInfo title={title} regions={regions} content={content} familyName={familyName} />
      </Container>

      <Widescreen>
        <SectionRelatedPostCard
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
    fallback: false,
  };
}
