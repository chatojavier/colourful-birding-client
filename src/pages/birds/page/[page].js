import { getAllBirds, getPagesCount, getPaginatedBirds } from 'lib/birds';
import usePageMetadata from 'hooks/use-page-metadata';

import TemplateArchive from 'templates/archive';

export default function Birds({ birds, pagination }) {
  const title = `All Birds`;
  const slug = 'birds';

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      description: `Page ${pagination.currentPage}`,
    },
  });

  return <TemplateArchive title={title} posts={birds} slug={slug} pagination={pagination} metadata={metadata} />;
}

export async function getStaticProps({ params = {} } = {}) {
  const { birds, pagination } = await getPaginatedBirds({
    currentPage: params?.page,
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

export async function getStaticPaths() {
  const { birds } = await getAllBirds({
    queryIncludes: 'index',
  });
  const pagesCount = await getPagesCount(birds);
  const paths = [...new Array(pagesCount)].map((_, i) => {
    return { params: { page: String(i + 1) } };
  });
  return {
    paths,
    fallback: false,
  };
}
