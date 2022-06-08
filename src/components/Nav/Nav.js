import { useState } from 'react';
import Link from 'next/link';
import useSite from 'hooks/use-site';
import Divider from 'components/Divider';
import BurgerButton from 'components/BurgerButton';
import NavMenu from 'components/NavMenu';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { metadata = {} } = useSite();
  const { title } = metadata;

  return (
    <nav>
      <div className="navbar | container mx-auto flex items-center justify-between p-2 md:space-x-8">
        <div className="nav-left | shrink-0">
          <Link href="/">
            <a>
              <img
                src="https://admin.colourfulbirding.com/wp-content/uploads/images/colourful-nav-logo.png"
                alt={title}
                width={167}
                height={50}
                loading="lazy"
              />
            </a>
          </Link>
        </div>
        <NavMenu isOpen={isOpen} />
        <BurgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} className="mobileMenuBtn | md:hidden" />
      </div>
      <Divider />
    </nav>
  );
};

export default Nav;
