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
import { ListboxMultiple, ListboxSingle } from 'components/Listbox';
import Container from 'components/Container';
import { useEffect, useState } from 'react';
import Button from 'components/Button';
import { useCallback } from 'react';
import { getAllJourneys } from 'lib/journeys';
import { getAllRegions } from 'lib/regions';
import { getAllBirds } from 'lib/birds';

export default function Journeys({ pageInfo, posts, pagination, allPosts, regions, birds }) {
  const [currentPosts, setCurrentPosts] = useState(posts);
  const [allFilteredPosts, setAllFilteredPosts] = useState(allPosts);
  const [pagesCount, setPagesCount] = useState(pagination.pagesCount);
  const [currentPage, setCurrentPage] = useState(pagination.currentPage);
  const postsPerPage = pageInfo?.postsPerPage ?? 4;
  const [regionsItems, setRegionsItems] = useState([]);
  const [birdsItems, setBirdsItems] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedBirds, setSelectedBirds] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({ label: 'A-Z' });

  const { title = 'Journeys' } = pageInfo;
  const slug = 'journeys';
  const {
    headerImage,
    headerText: {
      title: headerTitle = 'Find your Journey',
      subtitle: headerSubtitle = 'We take care to make it perfect',
    },
  } = pageInfo.jumboimage;

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

  const orderPosts = (sortCallback) => {
    allFilteredPosts.sort(sortCallback);
    const postsUpdated = allFilteredPosts.slice(0, postsPerPage);
    setCurrentPage(1);
    setCurrentPosts(postsUpdated);
  };

  const handleMorePosts = () => {
    const newPage = currentPage + 1;
    const newCountStart = currentPosts.length;
    const postsUpdated = [...currentPosts, ...allFilteredPosts.slice(newCountStart, newCountStart + postsPerPage)];
    setCurrentPage(newPage);
    setCurrentPosts(postsUpdated);
  };

  const setFilterPosts = (filteredPosts) => {
    const currentPostsUpdated = filteredPosts.slice(0, postsPerPage);
    setCurrentPage(1);
    setAllFilteredPosts(filteredPosts);
    setCurrentPosts(currentPostsUpdated);
    const newCount = getPagesCount(filteredPosts, postsPerPage);
    setPagesCount(newCount);
  };

  const filterAllPostsBySelectedItems = () => {
    if (!allPosts || allPosts.length === 0) {
      return [];
    }
    if (selectedRegions.length === 0 && selectedBirds.length === 0) {
      setFilterPosts(allPosts);
      return;
    }
    const filteredPosts = allPosts.filter((post) => {
      const postRegions = post.regions;
      const postBirds = post.birdsToWatch;
      const selectedRegionsUpdated = selectedRegions.length === 0 ? generateRegionsItems() : selectedRegions;
      const selectedRegionsIds = selectedRegionsUpdated.map((region) => region.id);
      const selectedBirdsUpdated = selectedBirds.length === 0 ? generateBirdsItems() : selectedBirds;
      const selectedBirdsIds = selectedBirdsUpdated.map((bird) => bird.id);
      const isPostInRegions = postRegions.some((region) => selectedRegionsIds.includes(region.id));
      const isPostInBirds = postBirds.some((bird) => selectedBirdsIds.includes(bird.id));
      return isPostInRegions && isPostInBirds;
    });
    setFilterPosts(filteredPosts);
  };

  const orderByItems = [
    {
      label: 'A-Z',
      onClick: () => orderPosts((a, b) => (a.title > b.title ? 1 : -1)),
    },
    {
      label: 'Price',
      onClick: () => orderPosts((a, b) => (a.price > b.price ? 1 : -1)),
    },
    {
      label: 'Programed Dates',
      onClick: () => orderPosts((a, b) => (new Date(a.programedDates.from) > new Date(b.programedDates.from) ? 1 : -1)),
    },
  ];

  const generateRegionsItems = useCallback(() => {
    const items = regions.map((region) => {
      return {
        id: region.id,
        label: region.name,
      };
    });
    return items;
  }, [regions]);

  const generateBirdsItems = useCallback(() => {
    const items = birds.map((bird) => {
      return {
        id: bird.id,
        label: bird.title,
      };
    });
    return items;
  }, [birds]);

  useEffect(() => {
    setRegionsItems(generateRegionsItems());
    setBirdsItems(generateBirdsItems());
  }, [regions, birds]);

  useEffect(() => {
    filterAllPostsBySelectedItems();
  }, [selectedRegions, selectedBirds]);
  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <WebpageJsonLd title={title} description={metadata.description} siteTitle={siteMetadata.title} slug={slug} />

      <Header>
        <JumboImage
          imageDesktop={headerImage.desktop}
          imageMobile={headerImage?.mobile}
          title={headerTitle}
          subtitle={headerSubtitle}
        />
      </Header>

      <Section className="Journeys-filters">
        <Container className="mb-8 space-y-2 md:flex md:justify-between md:space-y-0">
          <div className="filterButtons | space-y-2 md:space-x-4 md:space-y-0">
            <ListboxMultiple
              name="Regions"
              items={regionsItems}
              selected={selectedRegions}
              setSelected={setSelectedRegions}
            />
            <ListboxMultiple name="Birds" items={birdsItems} selected={selectedBirds} setSelected={setSelectedBirds} />
          </div>
          <div className="sortButtons">
            <ListboxSingle
              name="Order by"
              items={orderByItems}
              selected={selectedOrder}
              setSelected={setSelectedOrder}
            />
          </div>
        </Container>
        <CollectionPostCard posts={currentPosts} title={false} button={false} color="blue" />
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
  const { journeys } = await getAllJourneys({ queryIncludes: 'archive' });
  const { regions } = await getAllRegions();
  const { birds } = await getAllBirds();
  const allPosts = journeys;

  return {
    props: {
      posts,
      pagination: {
        ...pagination,
        basePath: '/journeys',
      },
      pageInfo,
      allPosts,
      regions,
      birds,
    },
  };
}
