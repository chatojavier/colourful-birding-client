import NextApp from 'next/app';

import { SiteContext, useSiteContext } from 'hooks/use-site';
import { SearchProvider } from 'hooks/use-search';

import { getSiteMetadata } from 'lib/site';
import { getRecentPosts } from 'lib/posts';
import { getTopLevelPages } from 'lib/pages';
import { getCategories } from 'lib/categories';
import NextNProgress from 'nextjs-progressbar';
import { getAllMenus, createMenuFromPages, MENU_LOCATION_NAVIGATION_DEFAULT } from 'lib/menus';

import 'styles/globals.scss';
import variables from 'styles/_variables.module.scss';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

function App({ Component, pageProps = {}, metadata, recentPosts, categories, menus }) {
  const site = useSiteContext({
    metadata,
    recentPosts,
    categories,
    menus,
  });

  // Add Google Tag Manager
  useEffect(() => {
    console.log('GOOGLE_TAG_MANAGER_ID', process.env.GOOGLE_TAG_MANAGER_ID);
    console.log('process.env', process.env);
    if (process.env.APP_ENV === 'production' && process.env.GOOGLE_TAG_MANAGER_ID)
      TagManager.initialize({
        gtmId: process.env.GOOGLE_TAG_MANAGER_ID,
      });
  }, []);

  return (
    <SiteContext.Provider value={site}>
      <SearchProvider>
        <NextNProgress height={4} color={variables.progressbarColor} />
        <Component {...pageProps} />
      </SearchProvider>
    </SiteContext.Provider>
  );
}

App.getInitialProps = async function (appContext) {
  const appProps = await NextApp.getInitialProps(appContext);

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
    ...appProps,
    metadata: await getSiteMetadata(),
    recentPosts,
    categories,
    menus,
  };
};

export default App;
