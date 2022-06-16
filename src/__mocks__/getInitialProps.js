import { getRecentPosts } from 'lib/posts';
import { getBirdBySlug, getRelatedBirds } from 'lib/birds';
import { getSiteMetadata } from 'lib/site';
import { getCategories } from 'lib/categories';
import { regionPathBySlug } from 'lib/regions';
import { getTopLevelPages } from 'lib/pages';
import { getAllMenus, createMenuFromPages, MENU_LOCATION_NAVIGATION_DEFAULT } from 'lib/menus';

export const getInitialGlobalProps = async function () {
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

export async function getStaticBirdProps(slug = {}) {
  const { bird } = await getBirdBySlug(slug);
  const { regions, databaseId: birdId } = bird;

  const props = {
    bird,
    socialImage: `${process.env.OG_IMAGE_DIRECTORY}/${slug}.png`,
  };

  const { region: relatedRegion, birds: relatedBirds } = (await getRelatedBirds(regions, birdId)) || {};
  const hasRelated = relatedRegion && Array.isArray(relatedBirds) && relatedBirds.length;

  if (hasRelated) {
    props.related = {
      birds: relatedBirds,
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
