import Link from 'next/link';
import useSite from 'hooks/use-site';
import { findMenuByLocation, MENU_LOCATION_NAVIGATION_DEFAULT } from 'lib/menus';
import NavListItem from 'components/NavListItem';
import Image from 'next/image';
import SocialMediaIcons from 'components/SocialMediaIcons/SocialMediaIcons';
import Divider from 'components/Divider';

const Nav = () => {
  const { metadata = {}, menus } = useSite();
  const { title } = metadata;

  const navigation = findMenuByLocation(menus, [
    // process.env.WORDPRESS_MENU_LOCATION_NAVIGATION,
    MENU_LOCATION_NAVIGATION_DEFAULT,
  ]);

  return (
    <nav>
      <div className="navbar | container mx-auto flex items-center justify-between p-2">
        <div className="nav-left | flex items-center space-x-16">
          <Link href="/">
            <a>
              <Image src="/images/colourful-nav-logo.png" alt={title} width={167} height={50} />
            </a>
          </Link>
          <ul className="nav__menu | flex space-x-4 text-xs uppercase text-blue">
            {navigation?.map((listItem) => {
              return <NavListItem key={listItem.id} className="" item={listItem} />;
            })}
          </ul>
        </div>
        <div className="nav-right | text-blue">
          <SocialMediaIcons iconSize={14} />
        </div>
      </div>
      <Divider />
    </nav>
  );
};

export default Nav;
