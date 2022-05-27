import Link from 'next/link';
import useSite from 'hooks/use-site';
import { findMenuByLocation, MENU_LOCATION_NAVIGATION_DEFAULT } from 'lib/menus';
import Section from 'components/Section';
import styles from './Nav.module.scss';
import NavListItem from 'components/NavListItem';
import Search from 'components/Search';

const Nav = () => {
  const { metadata = {}, menus } = useSite();
  const { title } = metadata;

  const navigation = findMenuByLocation(menus, [
    process.env.WORDPRESS_MENU_LOCATION_NAVIGATION,
    MENU_LOCATION_NAVIGATION_DEFAULT,
  ]);

  return (
    <nav className={styles.nav}>
      <Section className={styles.navSection}>
        <p className={styles.navName}>
          <Link href="/">
            <a>{title}</a>
          </Link>
        </p>
        <ul className={styles.navMenu}>
          {navigation?.map((listItem) => {
            return <NavListItem key={listItem.id} className={styles.navSubMenu} item={listItem} />;
          })}
        </ul>
        <Search />
      </Section>
    </nav>
  );
};

export default Nav;
