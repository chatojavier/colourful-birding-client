import { Helmet } from 'react-helmet';

import { getPageByUri } from 'lib/pages';
import { WebpageJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import JumboImage from 'components/JumboImage';
import ContactForm from 'components/ContactForm';
import Container from 'components/Container';
import SocialMediaIcons from 'components/SocialMediaIcons';

export default function Page({ page }) {
  const { title, metaTitle, description, slug, jumboimage, contactInfo } = page;
  const {
    headerImage,
    headerText: {
      title: headerTitle = 'Contact Us',
      subtitle: headerSubtitle = (
        <>
          <div>And make together</div>
          <div>a wonderful experience.</div>
        </>
      ),
    },
  } = jumboimage;
  const { email = '', phone = [] } = contactInfo;

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

      <Section>
        <Container className="flex flex-col-reverse md:flex-row md:items-center">
          <div className="contact-info | w-full space-y-6 p-4">
            <div className="phone">
              <div className="label | font-bebas text-2xl text-green md:text-3xl">Phone</div>
              <div className="info | ml-8">
                {phone.map((item) => (
                  <p key={item.phoneNumber}>
                    <span>{`${item.country}: `}</span>
                    <a href={`tel:+${Number(item.phoneNumber.replace(/\D/g, ''))}`}>{`+${item.phoneNumber}`}</a>
                  </p>
                ))}
                {/* <p>Peru: +51 958347179</p> <p>UK: +44 7483 894732</p> <p>España: +34 618 84 44 70</p> */}
              </div>
            </div>
            <div className="email">
              <div className="label | font-bebas text-2xl text-green md:text-3xl">email</div>
              <div className="info | ml-8">
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </div>
            <div className="social-media">
              <div className="label | mb-2 font-bebas text-2xl text-green md:text-3xl">Follow Us</div>
              <div className="info | ml-8">
                <SocialMediaIcons iconSize={20} />
              </div>
            </div>
          </div>
          <ContactForm className="w-full" />
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const pageUri = '/contactpage/';
  const { page } = await getPageByUri(pageUri);

  return {
    props: {
      page,
    },
  };
}
