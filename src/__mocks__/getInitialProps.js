import { getRecentPosts } from 'lib/posts';
import { getSiteMetadata } from 'lib/site';
import { getCategories } from 'lib/categories';
import { getTopLevelPages } from 'lib/pages';
import { getAllMenus, createMenuFromPages, MENU_LOCATION_NAVIGATION_DEFAULT } from 'lib/menus';

export const getInitialProps = async function () {
  const { posts: recentPosts } = await getRecentPosts({
    count: 5,
    queryIncludes: 'index',
  });

  const { categories } = await getCategories({
    count: 5,
  });

  const { menus } = await getAllMenus();

  const defaultNavigation = createMenuFromPages({
    locations: [MENU_LOCATION_NAVIGATION_DEFAULT],
    pages: await getTopLevelPages({
      queryIncludes: 'index',
    }),
  });

  menus.push(defaultNavigation);

  return {
    metadata: await getSiteMetadata(),
    recentPosts,
    categories,
    menus,
  };
};
