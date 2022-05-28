import { getAllRegions, getRegionBySlug } from 'lib/regions';
import { getBirdsByRegionId } from 'lib/birds';
import usePageMetadata from 'hooks/use-page-metadata';

import TemplateArchive from 'templates/archive';
import Title from 'components/Title';

export default function Region({ region, birds }) {
  const { name, description, slug } = region;

  const { metadata } = usePageMetadata({
    metadata: {
      ...region,
      description: description || region.og?.description || `Read ${birds.length} birds from ${name}`,
    },
  });

  return <TemplateArchive title={name} Title={<Title title={name} />} posts={birds} slug={slug} metadata={metadata} />;
}

export async function getStaticProps({ params = {} } = {}) {
  const { region } = await getRegionBySlug(params?.slug);

  const { birds } = await getBirdsByRegionId({
    regionId: region.databaseId,
    queryIncludes: 'archive',
  });

  return {
    props: {
      region,
      birds,
    },
  };
}

export async function getStaticPaths() {
  const { regions } = await getAllRegions();

  const paths = regions.map((region) => {
    const { slug } = region;
    return {
      params: {
        slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
