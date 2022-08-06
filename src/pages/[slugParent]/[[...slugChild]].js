/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import { Helmet } from 'react-helmet';

import { getPageByUri, getAllPages } from 'lib/pages';
import { WebpageJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Content from 'components/Content';
import Section from 'components/Section';
import Container from 'components/Container';
import JumboImage from 'components/JumboImage';

import styles from 'styles/pages/Page.module.scss';
import Loader from 'components/Loader';

export default function Page({ page }) {
  if (!page) {
    return (
      <Layout>
        <Section className="flex h-96 items-center justify-center">
          <Loader />
        </Section>
      </Layout>
    );
  }
  const { title, metaTitle, description, slug, content, jumboimage, children } = page;
  const {
    headerImage,
    headerText: {
      title: headerTitle = 'Find your Journey',
      subtitle: headerSubtitle = 'We take care to make it perfect',
    },
  } = jumboimage;

  const { metadata: siteMetadata = {} } = useSite();

  const { metadata } = usePageMetadata({
    metadata: {
      ...page,
      title: metaTitle,
      description: description || page.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const hasChildren = Array.isArray(children) && children.length > 0;

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <WebpageJsonLd
        title={metadata.title}
        description={metadata.description}
        siteTitle={siteMetadata.title}
        slug={slug}
      />

      <Header>
        <JumboImage
          imageDesktop={headerImage.desktop}
          imageMobile={headerImage?.mobile}
          title={headerTitle}
          subtitle={headerSubtitle}
        />
      </Header>

      <Content>
        <Section>
          <Container>
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </Container>
        </Section>

        {hasChildren && (
          <Section className={styles.sectionChildren}>
            <Container>
              <aside>
                <p className={styles.childrenHeader}>
                  <strong>{title}</strong>
                </p>
                <ul>
                  {children.map((child) => {
                    return (
                      <li key={child.id}>
                        <Link href={child.uri}>
                          <a>{child.title}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </aside>
            </Container>
          </Section>
        )}
      </Content>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { slugParent, slugChild } = params;

  // We can use the URI to look up our page and subsequently its ID, so
  // we can first contruct our URI from the page params

  let pageUri = `/${slugParent}/`;

  // We only want to apply deeper paths to the URI if we actually have
  // existing children

  if (Array.isArray(slugChild) && slugChild.length > 0) {
    pageUri = `${pageUri}${slugChild.join('/')}/`;
  }

  const { page } = await getPageByUri(pageUri);

  if (!page) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      page,
    },
  };
}

export async function getStaticPaths() {
  const { pages } = await getAllPages({
    queryIncludes: 'index',
  });

  // Take all the pages and create path params. The slugParent will always be
  // the top level parent page, where the slugChild will be an array of the
  // remaining segments to make up the path or URI

  const urisToExclude = ['/', '/blog/', '/pagebirds/', '/pagejourneys/', '/contactpage/'];

  const paths = pages
    .filter(({ uri }) => typeof uri === 'string' && !urisToExclude.includes(uri))
    .map(({ uri }) => {
      const segments = uri.split('/').filter((seg) => seg !== '');
      return {
        params: {
          slugParent: segments.shift(),
          slugChild: segments,
        },
      };
    });

  return {
    paths,
    fallback: true,
  };
}
