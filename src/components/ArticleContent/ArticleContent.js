import DateFormated from 'components/DateFormated';
import { DividerH } from 'components/Divider';

const { default: FormatedContent } = require('components/FormatedContent');

const ArticleContent = ({ children, author, date }) => {
  const ArticleHeader = ({ className }) => (
    <div className={`article-header |  flex items-end justify-between ${className}`}>
      <div className="article-author | flex items-end space-x-2">
        <div className="article-author__image | h-12 w-12 border p-1">
          <img
            src={author.avatar.url}
            alt={author.name}
            width={author.avatar.width}
            height={author.avatar.height}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="article-author__info | text-xs md:text-sm">
          <div className="">Author</div>
          <div className="uppercase">{author.name}</div>
        </div>
      </div>
      <div className="article-date">
        <DateFormated date={date} />
      </div>
    </div>
  );
  return (
    <div className="article-content | text-xs md:text-sm">
      <ArticleHeader className="mb-12 md:mb-20" />
      <FormatedContent content={children} className="mb-8 md:mb-12" />
      <DividerH />
    </div>
  );
};

export default ArticleContent;
