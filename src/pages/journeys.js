/* eslint-disable react-hooks/exhaustive-deps */
import usePageMetadata from 'hooks/use-page-metadata';
import { getPagesCount, getPaginatedPosts } from 'lib/posts';
import { getPageCustomDataByUri } from 'lib/pages';
import { Helmet } from 'react-helmet';
import { WebpageJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import JumboImage from 'components/JumboImage';
import CollectionPostCard from 'components/CollectionPostCard';
import Dropdown from 'components/Dropdown';
import Container from 'components/Container';
import { useEffect, useState } from 'react';
import Button from 'components/Button';
import useAllJourneys from 'hooks/useAllJourneys';
import useAllRegions from 'hooks/useAllRegions';
import useAllBirds from 'hooks/useAllBirds';

export default function Journeys({ pageInfo, posts, pagination }) {
  const title = 'All Our Journeys';
  const slug = 'journeys';
  const [currentPosts, setCurrentPosts] = useState(posts);
  const [allPostsUpdated, setAllPostsUpdated] = useState(posts);
  const [pagesCount, setPagesCount] = useState(pagination.pagesCount);
  const [currentPage, setCurrentPage] = useState(pagination.currentPage);
  const postsPerPage = pageInfo?.postsPerPage ?? 4;
  const { data: allPosts } = useAllJourneys({ queryIncludes: 'archive' });
  const { data: regions, loading: regionsLoading } = useAllRegions();
  const { data: birds, loading: birdsLoading } = useAllBirds();
  const [regionsItems, setRegionsItems] = useState([]);
  const [birdsItems, setBirdsItems] = useState([]);

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

  const orderPostsBy = (sortCallback) => {
    allPostsUpdated.sort(sortCallback);
    const postsUpdated = allPostsUpdated.slice(0, postsPerPage);
    setCurrentPage(1);
    setCurrentPosts(postsUpdated);
  };

  const filterPostsBy = (filterCallback) => {
    const filteredPosts = allPosts.filter(filterCallback);
    const postsUpdated = filteredPosts.slice(0, postsPerPage);
    setCurrentPage(1);
    setAllPostsUpdated(filteredPosts);
    setCurrentPosts(postsUpdated);
    const newCount = getPagesCount(postsUpdated, postsPerPage);
    setPagesCount(newCount);
  };

  const getAllPosts = () => {
    setCurrentPage(1);
    setAllPostsUpdated(allPosts);
    setCurrentPosts(allPosts.slice(0, postsPerPage));
    const newCount = getPagesCount(allPosts, postsPerPage);
    console.log(newCount);
    setPagesCount(newCount);
  };

  const handleMorePosts = () => {
    const newPage = currentPage + 1;
    const newCountStart = currentPosts.length;
    const postsUpdated = [...currentPosts, ...allPostsUpdated.slice(newCountStart, newCountStart + postsPerPage)];
    setCurrentPage(newPage);
    setCurrentPosts(postsUpdated);
  };

  const orderByItems = [
    {
      label: 'A-Z',
      onClick: () => orderPostsBy((a, b) => (a.title > b.title ? 1 : -1)),
    },
    {
      label: 'Price',
      onClick: () => orderPostsBy((a, b) => (a.price > b.price ? 1 : -1)),
    },
    {
      label: 'Programed Dates',
      onClick: () =>
        orderPostsBy((a, b) => (new Date(a.programedDates.from) > new Date(b.programedDates.from) ? 1 : -1)),
    },
  ];

  const generateRegionsItems = () => {
    const items = regions
      .map((region) => {
        return {
          label: region.name,
          onClick: () => filterPostsBy((a) => a.regions.some((r) => r.slug === region.slug)),
        };
      })
      .concat([
        {
          label: 'All',
          onClick: () => getAllPosts(),
        },
      ]);
    return items;
  };

  const generateBirdsItems = () => {
    const items = birds
      .map((bird) => {
        return {
          label: bird.title,
          onClick: () => filterPostsBy((a) => a.birdsToWatch.some((b) => b.slug === bird.slug)),
        };
      })
      .concat([
        {
          label: 'All',
          onClick: () => getAllPosts(),
        },
      ]);
    return items;
  };

  useEffect(() => {
    setAllPostsUpdated(allPosts);
    setRegionsItems(generateRegionsItems());
    setBirdsItems(generateBirdsItems());
  }, [allPosts, regions, birds]);

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

      <Section className="Journeys-filters">
        <Container className="mb-8 flex justify-between">
          <div className="filterButtons | space-x-4">
            <Dropdown name="Region" className="filterButtons__dropdown" items={regionsItems} loading={regionsLoading} />
            <Dropdown name="Birds" className="filterButtons__dropdown" items={birdsItems} loading={birdsLoading} />
          </div>
          <div className="sortButtons">
            <Dropdown name="Order by" className="filterButtons__dropdown" items={orderByItems} orientation="right" />
          </div>
        </Container>
        <CollectionPostCard posts={currentPosts} title={false} button={false} color="blue" /* loading={loading} */ />
        {currentPage < pagesCount && currentPosts.length > 0 && (
          <Button className="mx-auto block" color="blue" onClick={handleMorePosts}>
            Load more Journeys
          </Button>
        )}
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const pageInfo = await getPageCustomDataByUri(`/pagejourneys/`);
  const { posts, pagination } = await getPaginatedPosts({
    postType: 'journeys',
    postsPerPage: pageInfo?.postsPerPage ?? 4,
    queryIncludes: 'archive',
  });

  return {
    props: {
      posts,
      pagination: {
        ...pagination,
        basePath: '/journeys',
      },
      pageInfo,
    },
  };
}
