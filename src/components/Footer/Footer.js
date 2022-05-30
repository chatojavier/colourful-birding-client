import useSite from 'hooks/use-site';
import Container from 'components/Container';
import Image from 'next/image';
import Divider from 'components/Divider';
import styles from './Footer.module.scss';
import { findMenuByLocation } from 'lib/menus';
import Link from 'next/link';

const Footer = () => {
  const { menus } = useSite();

  const navigation = findMenuByLocation(menus, [process.env.WORDPRESS_MENU_ALTERNATIVE_NAVIGATION]);

  return (
    <footer>
      <section>
        <Container></Container>
      </section>
      <Divider />
      <section className="footer | container relative mx-auto p-4">
        {navigation && (
          <ul
            className={`footer__menu | mt-2 mb-8 flex w-full flex-col items-center space-y-4 text-xxs uppercase text-blue md:flex-row md:justify-center md:space-y-0 md:space-x-4 md:text-xs lg:absolute ${styles.menu}`}
          >
            {navigation?.map((menuItem) => (
              <li key={menuItem.label} className="footer__menu-item | flex items-center">
                <Link href={menuItem.path}>
                  <a>{menuItem.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-col items-center md:flex-row md:items-end md:justify-between md:space-x-8">
          <div className="brandby-wrapper mb-8 md:mb-0 md:shrink-0">
            <p className="text-sm">A brand of:</p>
            <a
              href="https://colourfulperu.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-[120px] md:w-[150px]"
            >
              <Image src="/images/colourful-footer-logo.png" alt="Colourful Peru" width={150} height={55} />
            </a>
          </div>
          <p className="text-justify text-xxs md:text-xs">
            &copy; {new Date().getFullYear()} Colourful Peru Travel Agency. All rights reserved. No part of this site
            may be reproduced without our written permission.
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
