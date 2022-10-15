import { useContext } from 'react';
import { useRouter } from 'next/router';

import useSite, { SiteContext } from 'hooks/use-site';

import { constructPageMetadata } from 'lib/site';
import { helmetSettingsFromMetadata } from 'lib/site';

export default function usePageMetadata({ metadata: pageMetadata }) {
  const { homepage, metadata: defaultMetadata } = useContext(SiteContext);

  const router = useRouter();

  const metadata = constructPageMetadata(defaultMetadata, pageMetadata, {
    homepage,
    router,
  });

  return {
    metadata,
  };
}

export const usePageHelmetSetting = (title, seo) => {
  const { metaTitle = '', description = false, image = {} } = seo;
  const { metadata: siteMetadata = {}, homepage } = useSite();

  if (!seo.og) {
    seo.og = {};
  }

  seo.og.imageUrl = image.sourceUrl || `${homepage}/images/og/homepage.png`;
  seo.og.imageSecureUrl = `${homepage}/images/og/homepage.png`;
  seo.og.imageWidth = image.mediaDetails?.width || 2000;
  seo.og.imageHeight = image.mediaDetails?.height || 1000;
  seo.og.type = 'website';

  const { metadata } = usePageMetadata({
    metadata: {
      ...seo,
      title: metaTitle || title,
      description: description || seo.og?.description || `Read more about ${title || siteMetadata.title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = title ? `${title} - ${siteMetadata.title}` : siteMetadata.title;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  return {
    metaTitle: metadata.title,
    metaDescription: metadata.description,
    helmetSettings: helmetSettingsFromMetadata(metadata),
  };
};
