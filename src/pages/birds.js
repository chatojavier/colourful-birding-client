import usePageMetadata from 'hooks/use-page-metadata';

import { getPaginatedBirds } from 'lib/birds';

import TemplateArchive from 'templates/archive';

export default function Birds({ birds, pagination }) {
  const title = 'All Birds';
  const slug = 'birds';

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      description: false,
    },
  });

  return <TemplateArchive title={title} posts={birds} slug={slug} pagination={pagination} metadata={metadata} />;
}

export async function getStaticProps() {
  const { birds, pagination } = await getPaginatedBirds({
    queryIncludes: 'archive',
  });
  return {
    props: {
      birds,
      pagination: {
        ...pagination,
        basePath: '/birds',
      },
    },
  };
}
