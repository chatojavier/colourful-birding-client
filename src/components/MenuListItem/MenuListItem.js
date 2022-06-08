import Link from 'next/link';
import { useRouter } from 'next/router';
import { getFirstPathname } from 'lib/util';

const MenuListItem = ({ className, subMenuClassName, item }) => {
  const { asPath } = useRouter();

  const nestedItems = (item.children || []).map((item) => {
    return <MenuListItem key={item.id} item={item} />;
  });

  return (
    <li key={item.id}>
      {!item.path.includes('http') && !item.target && (
        <Link href={item.path}>
          <a
            title={item.title}
            className={`${className} ${
              getFirstPathname(item.path) === getFirstPathname(asPath) && 'cursor-default text-secondary'
            } hover:text-secondary`}
          >
            {item.label}
          </a>
        </Link>
      )}
      {item.path.includes('http') && (
        <a href={item.path} title={item.title} target={item.target} className={`${className} hover:text-secondary`}>
          {item.label}
        </a>
      )}

      {nestedItems.length > 0 && <ul className={subMenuClassName}>{nestedItems}</ul>}
    </li>
  );
};

export default MenuListItem;
