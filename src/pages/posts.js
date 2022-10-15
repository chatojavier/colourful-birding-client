/* eslint-disable react-hooks/exhaustive-deps */
import { usePageHelmetSetting } from 'hooks/use-page-metadata';
import { getAllPosts, getPagesCount, getPaginatedPosts } from 'lib/posts';
import { getPageCustomDataByUri } from 'lib/pages';
import { Helmet } from 'react-helmet';
import { WebpageJsonLd } from 'lib/json-ld';
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
import { getAllCategories } from 'lib/categories';

export default function Posts({ posts, pagination, pageInfo, allPosts, categories }) {
  const [currentPosts, setCurrentPosts] = useState(posts);
  const [allFilteredPosts, setAllFilteredPosts] = useState(allPosts);
  const [pagesCount, setPagesCount] = useState(pagination.pagesCount);
  const [currentPage, setCurrentPage] = useState(pagination.currentPage);
  const postsPerPage = pageInfo?.postsPerPage ?? 4;
  const [categoriesItems, setCategoriesItems] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({ label: 'Most Recent' });

  const { title = 'Blog', seo } = pageInfo;
  const slug = 'posts';
  const {
    headerImage,
    headerText: {
      title: headerTitle = 'Find your Journey',
      subtitle: headerSubtitle = 'We take care to make it perfect',
    },
  } = pageInfo.jumboimage;

  const { metadata: siteMetadata = {} } = useSite();
  const { metaTitle, metaDescription, helmetSettings } = usePageHelmetSetting(title, seo);

  const handleMorePosts = () => {
    const newPage = currentPage + 1;
    const newCountStart = currentPosts.length;
    const postsUpdated = [...currentPosts, ...allFilteredPosts.slice(newCountStart, newCountStart + postsPerPage)];
    setCurrentPage(newPage);
    setCurrentPosts(postsUpdated);
  };

  const orderPosts = (sortCallback) => {
    allFilteredPosts.sort(sortCallback);
    const postsUpdated = allFilteredPosts.slice(0, postsPerPage);
    setCurrentPage(1);
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
    if (selectedCategories.length === 0) {
      setFilterPosts(allPosts);
      return;
    }
    const filteredPosts = allPosts.filter((post) => {
      const postCategories = post.categories;
      const selectedCategoriesUpdated =
        selectedCategories.length === 0 ? generateCategoriesItems() : selectedCategories;
      const selectedCategoriesIds = selectedCategoriesUpdated.map((category) => category.id);
      const isPostInCategories = postCategories.some((category) => selectedCategoriesIds.includes(category.id));
      return isPostInCategories;
    });
    setFilterPosts(filteredPosts);
  };

  const orderByItems = [
    {
      label: 'A-Z',
      onClick: () => orderPosts((a, b) => (a.title > b.title ? 1 : -1)),
    },
    {
      label: 'Most Recent',
      onClick: () => orderPosts((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1)),
    },
    {
      label: 'Least Recent',
      onClick: () => orderPosts((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1)),
    },
  ];

  const generateCategoriesItems = useCallback(() => {
    const items = categories.map((category) => {
      return {
        id: category.id,
        label: category.name,
      };
    });
    return items;
  }, [categories]);

  useEffect(() => {
    setCategoriesItems(generateCategoriesItems());
  }, [categories]);

  useEffect(() => {
    filterAllPostsBySelectedItems();
  }, [selectedCategories]);

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <WebpageJsonLd title={metaTitle} description={metaDescription} siteTitle={siteMetadata.title} slug={slug} />

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
              name="Categories"
              items={categoriesItems}
              selected={selectedCategories}
              setSelected={setSelectedCategories}
            />
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
  const pageInfo = await getPageCustomDataByUri(`/blog/`);
  const { posts, pagination } = await getPaginatedPosts({
    queryIncludes: 'archive',
    postsPerPage: pageInfo?.postsPerPage ?? 4,
  });
  const { posts: allPosts } = await getAllPosts({
    queryIncludes: 'archive',
  });
  const { categories } = await getAllCategories();
  return {
    props: {
      posts,
      pagination: {
        ...pagination,
        basePath: '/posts',
      },
      pageInfo,
      allPosts,
      categories,
    },
  };
}
