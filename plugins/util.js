const fs = require('fs');
const he = require('he');
const { gql, ApolloClient, InMemoryCache } = require('@apollo/client');
const RSS = require('rss');
const prettier = require('prettier');

const config = require('../package.json');

/**
 * createFile
 */

async function createFile(file, process, directory, location, verbose = false) {
  try {
    mkdirp(directory);
    verbose && console.log(`[${process}] Created directory ${directory}`);
    await promiseToWriteFile(location, file);
    verbose && console.log(`[${process}] Successfully wrote file to ${location}`);
  } catch (e) {
    throw new Error(`[${process}] Failed to create file: ${e.message}`);
  }
}

/**
 * promiseToWriteFile
 */

function promiseToWriteFile(location, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(location, content, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

/**
 * mkdirp
 */

function mkdirp(directory) {
  const split = directory.split('/');
  let temp = '.';

  split.forEach((dir) => {
    temp = `${temp}/${dir}`;

    if (!fs.existsSync(temp)) {
      fs.mkdirSync(temp);
    }
  });
}

/**
 * createApolloClient
 */

function createApolloClient(url) {
  return new ApolloClient({
    uri: url,
    cache: new InMemoryCache(),
  });
}

/**
 * getAllPosts
 */

async function getAllPosts(apolloClient, process, verbose = false) {
  const query = gql`
    {
      posts(first: 10000) {
        edges {
          node {
            title
            excerpt
            databaseId
            slug
            date
            modified
            author {
              node {
                name
              }
            }
            categories {
              edges {
                node {
                  name
                }
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      birds(first: 10000) {
        edges {
          node {
            title
            excerpt
            databaseId
            slug
            date
            modified
            regions {
              edges {
                node {
                  name
                }
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      journeys(first: 10000) {
        edges {
          node {
            title
            excerpt
            databaseId
            slug
            date
            modified
            regions {
              edges {
                node {
                  name
                }
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;

  let posts = [];
  let birds = [];
  let journeys = [];

  try {
    const data = await apolloClient.query({ query });

    const postsNodes = [...data.data.posts.edges.map(({ node = {} }) => node)];
    posts = postsNodes.map((post) => {
      const data = { ...post };

      if (data.author) {
        data.author = data.author.node.name;
      }

      if (data.categories) {
        data.categories = data.categories.edges.map(({ node }) => node.name);
      }

      if (data.excerpt) {
        //Sanitize the excerpt by removing all HTML tags
        const regExHtmlTags = /(<([^>]+)>)/g;
        data.excerpt = data.excerpt.replace(regExHtmlTags, '');
      }

      if (data.featuredImage) {
        data.featuredImage = data.featuredImage.node.sourceUrl;
      }

      return data;
    });

    const birdsNodes = [...data.data.birds.edges.map(({ node = {} }) => node)];
    birds = birdsNodes.map((bird) => {
      const data = { ...bird };

      if (data.regions) {
        data.regions = data.regions.edges.map(({ node }) => node.name);
      }

      if (data.excerpt) {
        //Sanitize the excerpt by removing all HTML tags
        const regExHtmlTags = /(<([^>]+)>)/g;
        data.excerpt = data.excerpt.replace(regExHtmlTags, '');
      }

      if (data.featuredImage) {
        data.featuredImage = data.featuredImage.node.sourceUrl;
      }

      return data;
    });

    const journeysNodes = [...data.data.journeys.edges.map(({ node = {} }) => node)];
    journeys = journeysNodes.map((journey) => {
      const data = { ...journey };

      if (data.regions) {
        data.regions = data.regions.edges.map(({ node }) => node.name);
      }

      if (data.excerpt) {
        //Sanitize the excerpt by removing all HTML tags
        const regExHtmlTags = /(<([^>]+)>)/g;
        data.excerpt = data.excerpt.replace(regExHtmlTags, '');
      }

      if (data.featuredImage) {
        data.featuredImage = data.featuredImage.node.sourceUrl;
      }

      return data;
    });

    verbose && console.log(`[${process}] Successfully fetched posts from ${apolloClient.link.options.uri}`);
    return {
      posts,
      birds,
      journeys,
    };
  } catch (e) {
    throw new Error(`[${process}] Failed to fetch posts from ${apolloClient.link.options.uri}: ${e.message}`);
  }
}

/**
 * getSiteMetadata
 */

async function getSiteMetadata(apolloClient, process, verbose = false) {
  const query = gql`
    {
      generalSettings {
        description
        language
        title
      }
    }
  `;

  let metadata = {};

  try {
    const data = await apolloClient.query({ query });
    metadata = { ...data.data.generalSettings };

    if (!metadata.language || metadata.language === '') {
      metadata.language = 'en';
    } else {
      metadata.language = metadata.language.split('_')[0];
    }

    verbose && console.log(`[${process}] Successfully fetched metadata from ${apolloClient.link.options.uri}`);
    return {
      metadata,
    };
  } catch (e) {
    throw new Error(`[${process}] Failed to fetch metadata from ${apolloClient.link.options.uri}: ${e.message}`);
  }
}

/**
 * getSitePages
 */

async function getPages(apolloClient, process, verbose = false) {
  const query = gql`
    {
      pages(first: 10000) {
        edges {
          node {
            slug
            modified
          }
        }
      }
    }
  `;

  let pages = [];

  try {
    const data = await apolloClient.query({ query });
    pages = [
      ...data.data.pages.edges.map(({ node = {} }) => {
        return {
          slug: node.slug,
          modified: node.modified,
        };
      }),
    ];

    verbose && console.log(`[${process}] Successfully fetched page slugs from ${apolloClient.link.options.uri}`);
    return {
      pages,
    };
  } catch (e) {
    throw new Error(`[${process}] Failed to fetch page slugs from ${apolloClient.link.options.uri}: ${e.message}`);
  }
}

/**
 * getNextPages
 */
async function getNextPages() {
  const listFileNames = getListFiles('./src/pages').map((file) => file.split('.')[0]);

  const fileNamesToExclude = ['404', '_app', '_document', 'index'];
  const nextPages = {
    pages: listFileNames
      .filter((fileName) => typeof fileName === 'string' && !fileNamesToExclude.includes(fileName))
      .map((fileName) => {
        const modifiedTime = fs.statSync(`./src/pages/${fileName}.js`).mtime.toISOString();
        return { slug: fileName, modified: modifiedTime };
      }),
  };
  return nextPages;
}

/**
 * getFeedData
 */

async function getFeedData(apolloClient, process, verbose = false) {
  const metadata = await getSiteMetadata(apolloClient, process, verbose);
  const posts = await getAllPosts(apolloClient, process, verbose);

  return {
    ...metadata,
    ...posts,
  };
}

/**
 * getSitemapData
 */

async function getSitemapData(apolloClient, process, verbose = false) {
  const posts = await getAllPosts(apolloClient, process, verbose);
  // const pages = await getPages(apolloClient, process, verbose);
  const pages = await getNextPages();

  return {
    ...posts,
    ...pages,
  };
}

/**
 * generateFeed
 */

function generateFeed({ posts = [], birds = [], journeys = [], metadata = {} }) {
  const { homepage = '' } = config;

  const feed = new RSS({
    title: metadata.title || '',
    description: metadata.description,
    site_url: homepage,
    feed_url: `${homepage}/feed.xml`,
    copyright: `${new Date().getFullYear()} ${metadata.title}`,
    language: metadata.language,
    pubDate: new Date(),
  });

  posts.map((post) => {
    feed.item({
      title: post.title,
      guid: `${homepage}/posts/${post.slug}`,
      url: `${homepage}/posts/${post.slug}`,
      date: post.date,
      description: post.excerpt,
      author: post.author,
      categories: post.categories || [],
    });
  });

  birds.map((bird) => {
    feed.item({
      title: bird.title,
      guid: `${homepage}/birds/${bird.slug}`,
      url: `${homepage}/birds/${bird.slug}`,
      date: bird.date,
      description: bird.excerpt,
      author: metadata.title,
      categories: bird.regions || [],
    });
  });

  journeys.map((journey) => {
    feed.item({
      title: journey.title,
      guid: `${homepage}/journeys/${journey.slug}`,
      url: `${homepage}/journeys/${journey.slug}`,
      date: journey.date,
      description: journey.excerpt,
      author: metadata.title,
      categories: journey.regions || [],
    });
  });

  return feed.xml({ indent: true });
}

/**
 * generateIndexSearch
 */

function generateIndexSearch({ posts, birds, journeys }) {
  const allPostTypes = [...posts, ...birds, ...journeys];
  const index = allPostTypes.map((post = {}) => {
    // We need to decode the title because we're using the
    // rendered version which assumes this value will be used
    // within the DOM

    const title = he.decode(post.title);

    return {
      title,
      slug: post.slug,
      date: post.date,
    };
  });

  const indexJson = JSON.stringify({
    generated: Date.now(),
    posts: index,
  });

  return indexJson;
}

/**
 * getSitemapData
 */

function generateSitemap({ posts = [], birds = [], journeys = [], pages = [] }, nextConfig = {}) {
  const { homepage = '' } = config;
  const { trailingSlash } = nextConfig;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${homepage}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
        ${pages
          .map((page) => {
            return `<url>
                      <loc>${homepage}/${page.slug}${trailingSlash ? '/' : ''}</loc>
                      <priority>0.3</priority>
                      <lastmod>${new Date(page.modified).toISOString()}</lastmod>
                    </url>
                `;
          })
          .join('')}
        ${posts
          .map((post) => {
            return `<url>
                      <loc>${homepage}/posts/${post.slug}${trailingSlash ? '/' : ''}</loc>
                      <lastmod>${new Date(post.modified).toISOString()}</lastmod>
                    </url>
                `;
          })
          .join('')}
        ${birds
          .map((bird) => {
            return `<url>
                      <loc>${homepage}/birds/${bird.slug}${trailingSlash ? '/' : ''}</loc>
                      <lastmod>${new Date(bird.modified).toISOString()}</lastmod>
                    </url>
                `;
          })
          .join('')}
        ${journeys
          .map((journey) => {
            return `<url>
                      <loc>${homepage}/journeys/${journey.slug}${trailingSlash ? '/' : ''}</loc>
                      <lastmod>${new Date(journey.modified).toISOString()}</lastmod>
                    </url>
                `;
          })
          .join('')}
    </urlset>
    `;

  const sitemapFormatted = prettier.format(sitemap, {
    printWidth: 120,
    parser: 'html',
  });

  return sitemapFormatted;
}

/**
 * generateRobotsTxt
 */

async function generateRobotsTxt({ outputDirectory, outputName }) {
  const { homepage = '' } = config;

  try {
    // Build sitemap URL at root directory
    let sitemapUrl = new URL(outputName, homepage);

    // Check if output directory is not root directory
    if (outputDirectory !== './public') {
      // Check if output directory is within './public' folder
      if (outputDirectory.startsWith('./public')) {
        // Update sitemap URL with new directory
        sitemapUrl.pathname = resolvePublicPathname(outputDirectory, outputName);
      } else {
        throw new Error('Sitemap should be within ./public folder.');
      }
    }

    // Robots content using sitemap final URL
    const robots = `User-agent: *\nSitemap: ${sitemapUrl}`;

    // Create robots.txt always at root directory
    await createFile(robots, 'Robots.txt', './public', './public/robots.txt');
  } catch (e) {
    throw new Error(`[Robots.txt] Failed to create robots.txt: ${e.message}`);
  }
}

/**
 * resolvePathname
 */

function resolvePublicPathname(outputDirectory, outputName) {
  const directory = outputDirectory.split('/');
  const index = directory.indexOf('public');
  const path = directory
    .map((path, i) => {
      // If actual folder is a 'public' direct subfolder and is not empty, add to pathname
      if (i > index && path) {
        return `/${path}`;
      }
    })
    .join('');

  return `${path}/${outputName}`;
}

/**
 * removeLastTrailingSlash
 */

function removeLastTrailingSlash(url) {
  if (typeof url !== 'string') return url;
  return url.replace(/\/$/, '');
}

/**
 * terminalColor
 */

function terminalColor(text, level) {
  switch (level) {
    /** green */
    case 'info':
    default:
      return `\x1b[32m${text}\x1b[0m`;
    /** yellow */
    case 'warn':
      return `\x1b[33m${text}\x1b[0m`;
    /** red */
    case 'error':
      return `\x1b[31m${text}\x1b[0m`;
  }
}

/**
 * List of files
 */
function getListFiles(directory) {
  const dirents = fs.readdirSync(directory, { withFileTypes: true });
  return dirents.filter((dirent) => dirent.isFile()).map((dirent) => dirent.name);
}

module.exports = {
  createFile,
  promiseToWriteFile,
  mkdirp,
  createApolloClient,
  getAllPosts,
  getSiteMetadata,
  getFeedData,
  generateFeed,
  generateIndexSearch,
  getPages,
  getSitemapData,
  generateSitemap,
  generateRobotsTxt,
  removeLastTrailingSlash,
  resolvePublicPathname,
  terminalColor,
};
