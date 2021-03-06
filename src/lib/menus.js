import { getApolloClient } from 'lib/apollo-client';

import { QUERY_ALL_MENUS } from 'data/menus';

export const MENU_LOCATION_NAVIGATION_DEFAULT = 'DEFAULT_NAVIGATION';

/**
 * getAllMenus
 */

export async function getAllMenus() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_MENUS,
  });

  const menus = data?.data.menus.edges.map(mapMenuData);

  return {
    menus,
  };
}

/**
 * mapMenuData
 */

export function mapMenuData(menu = {}) {
  const { node } = menu;
  const data = { ...node };

  data.menuItems = data.menuItems.edges.map(({ node }) => {
    return { ...node };
  });

  return data;
}

/**
 * mapPagesToMenuItems
 */

export function mapPagesToMenuItems(pages) {
  return pages.map(({ id, uri, title }) => {
    return {
      label: title,
      path: uri,
      id,
    };
  });
}

/**
 * createMenuFromPages
 */

export function createMenuFromPages({ locations, pages }) {
  return {
    menuItems: mapPagesToMenuItems(pages),
    locations,
  };
}

/**
 * parseHierarchicalMenu
 */
export const parseHierarchicalMenu = (
  data = [],
  { idKey = 'id', parentKey = 'parentId', childrenKey = 'children' } = {}
) => {
  const tree = [];
  const childrenOf = {};

  data.forEach((item) => {
    const newItem = { ...item };
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];
    parentId ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem) : tree.push(newItem);
  });
  return tree;
};

/**
 * findMenuByLocation
 */

export function findMenuByLocation(menus, location) {
  let menu;

  if (!location) {
    location = [];
  }

  if (!Array.isArray(location)) {
    location = [location];
  }
  const menuLocations = location.map((loc) => loc.toUpperCase());

  do {
    menu = menus.find(({ locations }) =>
      locations.map((loc) => loc.toUpperCase()).some((loc) => menuLocations.includes(loc))
    );
  } while (!menu && menuLocations.length > 0);

  if (!menu) {
    return null;
  }

  return parseHierarchicalMenu(menu.menuItems);
}
