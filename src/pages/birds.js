import Layout from 'components/Layout';
import { usePageHelmetSetting } from 'hooks/use-page-metadata';

import { getPagesCount, getPaginatedPosts, getRecentPosts } from 'lib/posts';
import { getPageCustomDataByUri } from 'lib/pages';
import { getAllBirds } from 'lib/birds';
import { getAllRegions } from 'lib/regions';
import { WebpageJsonLd } from 'lib/json-ld';
import Helmet from 'react-helmet';

import useSite from 'hooks/use-site';
import ToggleButton from 'components/ToggleButton';
import Section from 'components/Section';
import Container from 'components/Container';
import CollectionThumbCard from 'components/CollectionThumbCard';
import Header from 'components/Header';
import JumboImage from 'components/JumboImage';
import { useState, useRef, useEffect } from 'react';
import Button from 'components/Button';
import RelatedCarousel from 'components/RelatedCarousel';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function Birds({ pageInfo, posts, pagination, allPosts, regions, articles }) {
  const [currentPosts, setCurrentPosts] = useState(posts);
  const [pagesCount, setPagesCount] = useState(pagination.pagesCount);
  const [currentPage, setCurrentPage] = useState(pagination.currentPage);
  const postsPerPage = 12;
  const [selectedRegions, setSelectedRegions] = useState([]);
  const router = useRouter();
  const regionsItems = useRef(
    regions.map((region) => ({
      id: region.id,
      label: region.name,
    }))
  );

  const { title = 'Journeys', seo } = pageInfo;
  const slug = 'journeys';
  const {
    headerImage,
    headerText: { title: headerTitle = 'Get Inspired', subtitle: headerSubtitle = 'AND FLY AWAY' },
  } = pageInfo.jumboimage;

  const { metadata: siteMetadata = {} } = useSite();
  const { metaTitle, metaDescription, helmetSettings } = usePageHelmetSetting(title, seo);

  const setRouterQuery = (selectedRegions, currentPage) => {
    router.push(
      {
        query: {
          region: selectedRegions.map((region) => region.label),
          page: currentPage,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleMorePosts = () => {
    const newPage = currentPage + 1;
    setRouterQuery(selectedRegions, newPage);
  };

  const handleSelect = (item) => {
    let selectedUpdated;
    if (!isSelected(item, selectedRegions)) {
      selectedUpdated = [...selectedRegions, regionsItems.current.find((el) => el.label === item.label)];
    } else {
      selectedUpdated = selectedRegions.filter((el) => el.label !== item.label);
    }
    setRouterQuery(selectedUpdated, 1);
  };

  function isSelected(item, arr) {
    const arrUpdated = Array.isArray(arr) ? arr : [arr];
    return arrUpdated.find((el) => el.label === item.label) ? true : false;
  }

  const setFilterPosts = (filteredPosts) => {
    const currentPostsUpdated = filteredPosts.slice(0, postsPerPage);
    setCurrentPage(1);
    setCurrentPosts(currentPostsUpdated);
    const newCount = getPagesCount(filteredPosts, postsPerPage);
    setPagesCount(newCount);
  };

  const filterAllPostsBySelectedItems = useCallback(
    (selectedRegions) => {
      if (!allPosts || allPosts.length === 0) {
        return [];
      }
      if (selectedRegions.length === 0) {
        return allPosts;
      }
      const filteredPosts = allPosts.filter((post) => {
        const postRegions = post.regions;
        const selectedRegionsUpdated = selectedRegions.length === 0 ? regionsItems.current : selectedRegions;
        const selectedRegionsIds = selectedRegionsUpdated.map((region) => region.label);
        const isPostInRegions = postRegions.some((region) => selectedRegionsIds.includes(region.name));
        return isPostInRegions;
      });
      return filteredPosts;
    },
    [allPosts]
  );

  useEffect(() => {
    const routerRegions = router?.query?.region
      ? Array.isArray(router.query.region)
        ? router.query.region
        : [router.query.region]
      : [];
    const selectedRegions = routerRegions ? routerRegions.map((region) => ({ label: region })) : [];
    setSelectedRegions(selectedRegions);
    const filteredPosts = filterAllPostsBySelectedItems(selectedRegions);
    setFilterPosts(filteredPosts);

    const routerPage = router?.query?.page ? parseInt(router.query.page) : 1;
    const postsUpdated = [...filteredPosts.slice(0, postsPerPage * routerPage)];
    setCurrentPosts(postsUpdated);
    setCurrentPage(routerPage);
  }, [filterAllPostsBySelectedItems, router.query]);

  const FilterBar = ({ className }) => (
    <div className={`birds__filter-bar | flex w-full flex-wrap gap-4 ${className}`}>
      {regionsItems.current.map((item) => (
        <div className="birds__filter-bar-item | flex-1" key={item.label}>
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

      <WebpageJsonLd title={metaTitle} description={metaDescription} sitetitle={siteMetadata.title} slug={slug} />

      <Header>
        <JumboImage
          imageDesktop={headerImage.desktop}
          imageMobile={headerImage?.mobile}
          title={headerTitle}
          subtitle={headerSubtitle}
        />
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
  const pageInfo = await getPageCustomDataByUri(`/pagebirds/`);
  const { posts, pagination } = await getPaginatedPosts({
    postType: 'birds',
    postsPerPage: 12,
    queryIncludes: 'archive',
  });
  const { birds } = await getAllBirds({ queryIncludes: 'archive' });
  const { regions } = await getAllRegions();
  const { posts: articles } = await getRecentPosts({ count: 5, queryIncludes: 'archive' });
  const allPosts = birds;

  regions.forEach((region) => region.name && region.name.toLowerCase());

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
      articles,
    },
  };
}
