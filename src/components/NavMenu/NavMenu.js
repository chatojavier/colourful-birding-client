import PropTypes from 'prop-types';
import SocialMediaIcons from 'components/SocialMediaIcons';
import MenuListItem from 'components/MenuListItem';
import { findMenuByLocation, MENU_LOCATION_NAVIGATION_DEFAULT } from 'lib/menus';
import useSite from 'hooks/use-site';

const NavMenu = ({ isOpen }) => {
  const { menus } = useSite();

  const navigation = findMenuByLocation(menus, [
    process.env.WORDPRESS_MENU_LOCATION_NAVIGATION || 'MAIN_MENU',
    MENU_LOCATION_NAVIGATION_DEFAULT,
  ]);

  return (
    <div
      className={`nav-right | ${
        !isOpen ? 'left-full' : 'left-0'
      } | fixed top-[70px] z-30 flex h-[calc(100vh-70px)] w-full flex-col items-center justify-center space-y-24 bg-white text-primary transition-all duration-300 md:static md:h-auto md:flex-row md:justify-between md:space-y-0 md:space-x-4 md:transition-none`}
    >
      <ul className="nav__menu | space-y-8 font-bebas text-2xl uppercase text-primary md:flex md:items-center md:space-y-0 md:space-x-4 md:font-raleway md:text-xs">
        {navigation?.map((listItem) => {
          return <MenuListItem key={listItem.id} item={listItem} className="" />;
        })}
      </ul>
      <SocialMediaIcons iconSize={14} />
    </div>
  );
};

export default NavMenu;

NavMenu.propTypes = {
  isOpen: PropTypes.bool,
};
