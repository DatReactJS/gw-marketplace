import React, { useState } from 'react';
import Button from '../Button';
import Logo from '../Logo';
import './index.less';
import { links } from '@/utils/constants/links';
import NavBarLink from './NavBarLink';

const Navbar: React.FC = () => {
  const [isShowNav, setIsShowNav] = useState<boolean>(false);

  const allNavLinks: string[] = Object.keys(links);

  return (
    <>
      <header className="header-navbar">
        <div className="header-flex">
          <img alt="" src="/assets/images/marketplace/logo.png" />
          <div>
            {allNavLinks.map((link: string) => (
              <NavBarLink
                // @ts-ignore
                link={links[link]}
                title={link}
                key={link}
              />
            ))}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
