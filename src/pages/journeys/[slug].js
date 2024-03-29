/* eslint-disable react-hooks/rules-of-hooks */
import { Helmet } from 'react-helmet';

import { getJourneyBySlug, getAllJourneys, getRelatedJourneys } from 'lib/journeys';
import { regionPathBySlug } from 'lib/regions';
import { getAllBirds } from 'lib/birds';
import { ArticleJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import { useState, useMemo } from 'react';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import Widescreen from 'components/Widescreen';
import RelatedCarousel from 'components/RelatedCarousel';
import JumboGallery from 'components/JumboGallery';
import DateFromTo from 'components/DateFromTo';
import JourneyInfo from 'components/JourneyInfo';
import Button from 'components/Button';
import CollectionPostCard from 'components/CollectionPostCard';
import JourneyTabs from 'components/JourneyTabs';
import Modal from 'components/Modal';
import BookNow from 'components/BookNow';
import { getMediaQueries } from 'lib/responsive';
import useWindowSize from 'hooks/use-window-resize';
import Loader from 'components/Loader';

const InfoTabs = {
  ITINERARY: 0,
  ACCOMMODATION: 1,
  INCLUSIONS: 2,
};

export default function Journey({ journey, socialImage, related }) {
  if (!journey) {
    return (
      <Layout>
        <Section className="flex h-96 items-center justify-center">
          <Loader />
        </Section>
      </Layout>
    );
  }

  const {
    title,
    metaTitle,
    description,
    content,
    featuredImage,
    destinations,
    mapEmbed,
    programedDates,
    price,
    birdsToWatch,
    gallery,
    accomodation,
    itinerary,
    toursInclusions,
  } = journey;
  const { md } = getMediaQueries();
  const mdQuery = md.replace(/[^0-9]/g, '');
  const [windowWidth] = useWindowSize();
  const galleryImages = useMemo(() => {
    if (gallery.galleryMobile && gallery.galleryMobile.length > 0 && windowWidth < mdQuery) {
      return gallery.galleryMobile;
    } else {
      return gallery.galleryDesktop;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);
  const { metadata: siteMetadata = {}, homepage } = useSite();
  const [openTabs, setOpenTabs] = useState(false);
  const [openBookNow, setOpenBookNow] = useState(false);
  const [indexTab, setIndexTab] = useState(0);

  if (!journey.og) {
    journey.og = {};
  }

  journey.og.imageUrl = journey.og.image?.sourceUrl || `${homepage}${socialImage}`;
  journey.og.imageSecureUrl = `${homepage}${socialImage}`;
  journey.og.imageWidth = journey.og.image?.mediaDetails?.width || 2000;
  journey.og.imageHeight = journey.og.image?.mediaDetails?.height || 1000;

  const { metadata } = usePageMetadata({
    metadata: {
      ...journey,
      title: metaTitle || title,
      description: description || journey.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const { journeys: relatedJourneysList } = related || {};

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  const ctaLabel = 'Book Now';

  const galleryInfo = {
    title: title,
    subtitle: <DateFromTo from={programedDates.from} to={programedDates.to} onlyDuration />,
    button: {
      onClick: () => setOpenBookNow(true),
      text: ctaLabel,
      color: 'lightblue',
    },
  };

  const journeyInfoProps = {
    cta: { label: ctaLabel, onClick: () => setOpenBookNow(true) },
    content,
    destinations,
    mapEmbed,
    programedDates,
    price,
  };
  const journeyTabsProps = { journeyInfo: { accomodation, itinerary, toursInclusions }, activeTab: indexTab };

  const handleOpenTabs = (index) => {
    setIndexTab(index);
    setOpenTabs(true);
  };

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <ArticleJsonLd post={journey} siteTitle={siteMetadata.title} />

      <Widescreen>
        <JumboGallery galleryImages={galleryImages} featuredImage={featuredImage} square info={galleryInfo} />
      </Widescreen>

      <Section>
        <Container>
          <JourneyInfo {...journeyInfoProps} className="mb-12" />

          <div className="journey-extended-info">
            <div className="journey-extended-info__buttons | space-y-2 md:flex md:justify-center md:space-y-0">
              <Button
                color="lightblue"
                className="mx-auto block w-60 border md:mx-4"
                onClick={() => handleOpenTabs(InfoTabs.ITINERARY)}
              >
                Itinerary
              </Button>
              <Button
                color="lightblue"
                className="mx-auto block w-60 border md:mx-4"
                onClick={() => handleOpenTabs(InfoTabs.ACCOMMODATION)}
              >
                Accommodation
              </Button>
              <Button
                color="lightblue"
                className="mx-auto block w-60 border md:mx-4"
                onClick={() => handleOpenTabs(InfoTabs.INCLUSIONS)}
              >
                Tours Inclution
              </Button>
            </div>
            <Button
              color="lightblue"
              filled
              className="mx-auto !mt-8 block w-60 py-3 text-base"
              onClick={() => setOpenBookNow(true)}
            >
              {ctaLabel}
            </Button>
          </div>
        </Container>
      </Section>

      <Section>
        <RelatedCarousel title="Birds to watch" subtitle="In this Journey" posts={birdsToWatch} color="lightblue" />
      </Section>

      <Widescreen>
        <CollectionPostCard
          title={`Similar Journeys`}
          subtitle="We Take Care of Make It Perfect"
          posts={relatedJourneysList}
          slug="/journeys"
        />
      </Widescreen>

      <Modal isOpen={openTabs} setIsOpen={setOpenTabs} color="lightblue">
        <JourneyTabs {...journeyTabsProps} />
      </Modal>

      <Modal isOpen={openBookNow} setIsOpen={setOpenBookNow} color="lightblue">
        <BookNow price={price} programedDates={programedDates} color="lightblue" />
      </Modal>

      <div
        style={{
          position: 'absolute',
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          height: '1px',
          width: '1px',
          margin: '-1px',
          padding: '0',
          border: '0',
        }}
      >
        <BookNow price={price} programedDates={programedDates} color="lightblue" />
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { journey } = await getJourneyBySlug(params?.slug);

  if (!journey) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  const { regions, databaseId: journeyId } = journey;

  if (journey?.birdsToWatch) {
    const { birds } = await getAllBirds({
      queryIncludes: 'archive',
    });
    journey.birdsToWatch = journey.birdsToWatch
      .map((bird) => birds.find((b) => b.id === bird?.id))
      .filter((bird) => bird !== undefined);
  }

  const props = {
    journey,
    socialImage: `${process.env.OG_IMAGE_DIRECTORY}/${params?.slug}.png`,
  };

  const { region: relatedRegion, journeys: relatedJourneys } = (await getRelatedJourneys(regions, journeyId, 2)) || {};
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
