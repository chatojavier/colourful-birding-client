import Layout from 'components/Layout';
import usePageMetadata from 'hooks/use-page-metadata';

import { getPagesCount, getPaginatedPosts } from 'lib/posts';
import { getPageCustomDataByUri } from 'lib/pages';
import { getAllBirds } from 'lib/birds';
import { getAllRegions } from 'lib/regions';
import { WebpageJsonLd } from 'lib/json-ld';
import Helmet from 'react-helmet';

import useSite from 'hooks/use-site';
import { helmetSettingsFromMetadata } from 'lib/site';
import ToggleButton from 'components/ToggleButton';
import Section from 'components/Section';
import Container from 'components/Container';
import CollectionThumbCard from 'components/CollectionThumbCard';
import Header from 'components/Header';
import JumboImage from 'components/JumboImage';
import { useState, useCallback, useEffect } from 'react';
import Button from 'components/Button';

export default function Birds({ pageInfo, posts, pagination, allPosts, regions }) {
  const [currentPosts, setCurrentPosts] = useState(posts);
  const [allFilteredPosts, setAllFilteredPosts] = useState(allPosts);
  const [pagesCount, setPagesCount] = useState(pagination.pagesCount);
  const [currentPage, setCurrentPage] = useState(pagination.currentPage);
  const postsPerPage = 12;
  const [regionsItems, setRegionsItems] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);

  const { title = 'Journeys' } = pageInfo;
  const slug = 'journeys';
  const {
    headerImage,
    headerText: { title: headerTitle = 'Get Inspired', subtitle: headerSubtitle = 'AND FLY AWAY' },
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

  const handleMorePosts = () => {
    const newPage = currentPage + 1;
    const newCountStart = currentPosts.length;
    const postsUpdated = [...currentPosts, ...allFilteredPosts.slice(newCountStart, newCountStart + postsPerPage)];
    setCurrentPage(newPage);
    setCurrentPosts(postsUpdated);
    console.log(postsUpdated);
    console.log('AllPosts', allFilteredPosts);
  };

  const handleSelect = (value) => {
    if (!isSelected(value, selectedRegions)) {
      const selectedUpdated = [...selectedRegions, regionsItems.find((el) => el === value)];
      setSelectedRegions(selectedUpdated);
      console.log(selectedUpdated);
    } else {
      handleDeselect(value);
    }
  };

  function handleDeselect(value) {
    const selectedUpdated = selectedRegions.filter((el) => el !== value);
    setSelectedRegions(selectedUpdated);
    console.log(selectedUpdated);
  }

  function isSelected(value, arr) {
    const arrUpdated = Array.isArray(arr) ? arr : [arr];
    return arrUpdated.find((el) => el === value) ? true : false;
  }

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
    if (selectedRegions.length === 0) {
      setFilterPosts(allPosts);
      return;
    }
    const filteredPosts = allPosts.filter((post) => {
      const postRegions = post.regions;
      const selectedRegionsUpdated = selectedRegions.length === 0 ? generateRegionsItems() : selectedRegions;
      const selectedRegionsIds = selectedRegionsUpdated.map((region) => region.id);
      const isPostInRegions = postRegions.some((region) => selectedRegionsIds.includes(region.id));
      return isPostInRegions;
    });
    setFilterPosts(filteredPosts);
  };

  const generateRegionsItems = useCallback(() => {
    const items = regions.map((region) => {
      return {
        id: region.id,
        label: region.name,
      };
    });
    return items;
  }, [regions]);

  useEffect(() => {
    setRegionsItems(generateRegionsItems());
  }, [regions]);

  useEffect(() => {
    filterAllPostsBySelectedItems();
  }, [selectedRegions]);

  const FilterBar = ({ className }) => (
    <div className={`birds__filter-bar | flex w-full flex-wrap gap-4 ${className}`}>
      {regionsItems.map((item) => (
        <div className="birds__filter-bar-item | flex-1" key={item.id}>
          <ToggleButton
            color="lightblue"
            className="w-full"
            onClick={() => handleSelect(item)}
            isActive={isSelected(item, selectedRegions)}
          >
            {item.label}
          </ToggleButton>
        </div>
      ))}
    </div>
  );

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <WebpageJsonLd title={title} description={metadata.description} sitetitle={siteMetadata.title} slug={slug} />

      <Header>
        <JumboImage featuredImage={headerImage} title={headerTitle} subtitle={headerSubtitle} />
      </Header>

      <Section className="birds-collection">
        <Container>
          <FilterBar className="mb-12" />
          <CollectionThumbCard posts={currentPosts} className="mb-12" />
          {currentPage < pagesCount && currentPosts.length > 0 && (
            <Button className="mx-auto block" color="lightblue" onClick={handleMorePosts}>
              Load more Birds
            </Button>
          )}
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const pageInfo = await getPageCustomDataByUri(`/pagebirds/`);
  const { posts, pagination } = await getPaginatedPosts({
    postType: 'birds',
    postsPerPage: 12,
    queryIncludes: 'archive',
  });
  const { birds } = await getAllBirds({ queryIncludes: 'archive' });
  const { regions } = await getAllRegions();
  const allPosts = birds;

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
    },
  };
}
