const withPlugins = require('next-compose-plugins');

const indexSearch = require('./plugins/search-index');
const feed = require('./plugins/feed');
const sitemap = require('./plugins/sitemap');
const socialImages = require('./plugins/socialImages');

module.exports = withPlugins([[indexSearch], [feed], [sitemap], [socialImages]], {
  // By default, Next.js removes the trailing slash. One reason this would be good
  // to include is by default, the `path` property of the router for the homepage
  // is `/` and by using that, would instantly create a redirect

  // trailingSlash: true,
  staticPageGenerationTimeout: 120,

  // By enabling verbose logging, it will provide additional output details for
  // diagnostic purposes. By default is set to false.
  // verbose: true,

  env: {
    APP_ENV: process.env.APP_ENV || 'development',
    WORDPRESS_GRAPHQL_ENDPOINT: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
    WORDPRESS_MENU_LOCATION_NAVIGATION: process.env.WORDPRESS_MENU_LOCATION_NAVIGATION || 'PRIMARY',
    WORDPRESS_MENU_ALTERNATIVE_NAVIGATION: process.env.WORDPRESS_MENU_ALTERNATIVE_NAVIGATION || 'SECONDARY',
    WORDPRESS_PLUGIN_SEO: parseEnvValue(process.env.WORDPRESS_PLUGIN_SEO, false),
    BIRDS_PER_PAGE: process.env.BIRDS_PER_PAGE,
    GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,

    // The image directory for open graph images will be saved at the location above
    // with `public` prepended. By default, images will be saved at /public/images/og
    // and available at /images/og. If changing, make sure to update the .gitignore

    OG_IMAGE_DIRECTORY: '/images/og',
  },
});

/**
 * parseEnv
 * @description Helper function to check if a variable is defined and parse booelans
 */

function parseEnvValue(value, defaultValue) {
  if (typeof value === 'undefined') return defaultValue;
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return value;
}
