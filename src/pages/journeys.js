import usePageMetadata from 'hooks/use-page-metadata';

import { getPaginatedJourneys } from 'lib/journeys';

import TemplateArchive from 'templates/archive';

export default function Journeys({ journeys, pagination }) {
  const title = 'All Journeys';
  const slug = 'journeys';

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      description: false,
    },
  });

  return <TemplateArchive title={title} posts={journeys} slug={slug} pagination={pagination} metadata={metadata} />;
}

export async function getStaticProps() {
  const { journeys, pagination } = await getPaginatedJourneys({
    queryIncludes: 'archive',
  });
  return {
    props: {
      journeys,
      pagination: {
        ...pagination,
        basePath: '/journeys',
      },
    },
  };
}
