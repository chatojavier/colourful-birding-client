import { getAllJourneys, getPagesCount, getPaginatedJourneys } from 'lib/journeys';
import usePageMetadata from 'hooks/use-page-metadata';

import TemplateArchive from 'templates/archive';

export default function Journeys({ journeys, pagination }) {
  const title = `All Journeys`;
  const slug = 'journeys';

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      description: `Page ${pagination.currentPage}`,
    },
  });

  return <TemplateArchive title={title} posts={journeys} slug={slug} pagination={pagination} metadata={metadata} />;
}

export async function getStaticProps({ params = {} } = {}) {
  const { journeys, pagination } = await getPaginatedJourneys({
    currentPage: params?.page,
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

export async function getStaticPaths() {
  const { journeys } = await getAllJourneys({
    queryIncludes: 'index',
  });
  const pagesCount = await getPagesCount(journeys);
  const paths = [...new Array(pagesCount)].map((_, i) => {
    return { params: { page: String(i + 1) } };
  });
  return {
    paths,
    fallback: false,
  };
}
