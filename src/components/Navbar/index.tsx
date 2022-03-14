import React, { useState } from 'react';
import './index.less';
import { links } from '@/utils/constants/links';
import styles from './index.less';
import NavBarLink from './NavBarLink';
import { useIntl } from 'umi';

const Navbar: React.FC = () => {
  const intl = useIntl();

  const [isShowNav, setIsShowNav] = useState<boolean>(false);

  const allNavLinks: string[] = Object.keys(links);

  return (
    <>
      <header className={styles.header_navbar}>
        <div className={styles.container}>
          <img
            className={styles.logo}
            alt=""
            src="/assets/images/marketplace/logo.png"
          />

          <main>
            <aside className={styles.links}>
              {allNavLinks.map((link: string) => (
                <NavBarLink
                  // @ts-ignore
                  link={links[link]}
                  title={link}
                  key={link}
                />
              ))}
            </aside>

            <aside className={styles.wallet}>
              <button className={styles.connected}>
                <div className={styles.content}>
                  {intl.formatMessage({ id: 'navbar.wallet' })}
                  <img
                    src="/assets/images/marketplace/menu-keyOpen.svg"
                    alt=""
                  />
                </div>
              </button>
            </aside>
          </main>
        </div>
      </header>
    </>
  );
};

export default Navbar;
