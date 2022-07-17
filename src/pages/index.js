import useSite from 'hooks/use-site';
import { getAllBirds } from 'lib/birds';
import { WebsiteJsonLd } from 'lib/json-ld';
import { getHomePage } from 'lib/pages';
import { getAllJourneys } from 'lib/journeys';
import { getRecentPosts } from 'lib/posts';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Widescreen from 'components/Widescreen';
import Section from 'components/Section';
import Container from 'components/Container';
import JumboGallery from 'components/JumboGallery';
import DateFromTo from 'components/DateFromTo';
import AboutUs from 'components/AboutUs';
import RelatedCarousel from 'components/RelatedCarousel';
import CollectionPostCard from 'components/CollectionPostCard';
import TailorMadeBlock from 'components/TailorMadeBlock';
import Testimonials from 'components/Testimonials';
export default function Home({
  jumboGallery,
  aboutUsBlock,
  featuredBirds,
  featuredJourneys,
  tailorMadeBlock,
  testimonialsBlock,
  articles,
}) {
  const { metadata = {} } = useSite();
  const { title } = metadata;

  const galleryInfo = jumboGallery.info.map((item) => ({
    title: item.title,
    subtitle: <DateFromTo from={item.programedDates.from} to={item.programedDates.to} />,
    button: {
      path: `/journeys/${item.slug}`,
      text: 'Discover',
      color: 'green',
    },
  }));

  const { fbTitle, fbSubtitle, fbButton, fbGallery } = featuredBirds;
  const { fjTitle, fjSubtitle, fjButton, fjGallery } = featuredJourneys;
  const { tmImage, tmContent } = tailorMadeBlock;
  const { testTitle, testSubtitle, testimonials } = testimonialsBlock;

  return (
    <Layout>
      <WebsiteJsonLd siteTitle={title} />
      <Header className="hidden">
        <h1>Colourful Birding</h1>
      </Header>

      <Widescreen>
        <JumboGallery galleryImages={jumboGallery.gallery} info={galleryInfo} square />
      </Widescreen>

      <Section>
        <AboutUs images={aboutUsBlock.auImages} content={aboutUsBlock.auContent} />
      </Section>

      <Section>
        <RelatedCarousel title={fbTitle} subtitle={fbSubtitle} posts={fbGallery} button={fbButton} slug="/birds" />
      </Section>

      <Section>
        <CollectionPostCard
          title={fjTitle}
          subtitle={fjSubtitle}
          posts={fjGallery}
          button={fjButton}
          slug="/journeys"
        />
      </Section>

      <Section>
        <TailorMadeBlock image={tmImage} content={tmContent} />
      </Section>

      <Section>
        <Container>
          <Testimonials title={testTitle} subtitle={testSubtitle} testimonials={testimonials} />
        </Container>
      </Section>

      <Section>
        <RelatedCarousel
          title="our stories"
          subtitle="and experiences"
          slug="/posts"
          posts={articles}
          color="blue"
          button="See all our Stories"
          reverse
        />
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const homedata = await getHomePage();
  const {
    aboutUsBlock,
    featuredBirdsBlock,
    findYourJourney,
    jumbotron: { journeysToShow },
    tailorMadeBlock,
    testimonialsBlock,
  } = homedata;

  let jumboGallery = {};
  let featuredBirds = {
    fbTitle: featuredBirdsBlock.fbTitle,
    fbSubtitle: featuredBirdsBlock.fbSubtitle,
    fbButton: featuredBirdsBlock.fbButton,
  };
  let featuredJourneys = {
    fjTitle: findYourJourney.fjTitle,
    fjSubtitle: findYourJourney.fjSubtitle,
    fjButton: findYourJourney.button,
  };

  const { posts: articles } = await getRecentPosts({ count: 5, queryIncludes: 'archive' });

  const { journeys } = await getAllJourneys({
    queryIncludes: 'archive',
  });

  if (journeysToShow) {
    jumboGallery.gallery = journeysToShow.map((journey) => {
      const journeyData = journeys.find((j) => j.id === journey.id);
      return journeyData.featuredImage;
    });
    jumboGallery.info = journeysToShow.map((journey) => {
      const journeyData = journeys.find((j) => j.id === journey.id);
      const { title, programedDates, slug } = journeyData;
      return { title, programedDates, slug };
    });
  }

  if (featuredBirdsBlock.featuredBirds) {
    const { birds } = await getAllBirds({
      queryIncludes: 'archive',
    });
    featuredBirds.fbGallery = featuredBirdsBlock.featuredBirds.map((bird) => {
      const birdData = birds.find((b) => b.id === bird.id);
      return birdData;
    });
  }

  if (findYourJourney.featuredJourneys) {
    featuredJourneys.fjGallery = findYourJourney.featuredJourneys.map((journey) => {
      const journeyData = journeys.find((j) => j.id === journey.id);
      return journeyData;
    });
  }

  return {
    props: {
      jumboGallery,
      aboutUsBlock,
      featuredBirds,
      featuredJourneys,
      tailorMadeBlock,
      testimonialsBlock,
      articles,
    },
  };
}
