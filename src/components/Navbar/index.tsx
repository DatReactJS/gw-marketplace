import React, { useState } from 'react';
import './index.less';
import Icon from '../Icon';
import { links } from '@/utils/constants/links';
import styles from './index.less';
import NavBarLink from './NavBarLink';
import { useIntl } from 'umi';

const Navbar: React.FC = () => {
  const intl = useIntl();

  const [isShowNav, setIsShowNav] = useState<boolean>(false);

  const allNavLinks: string[] = Object.keys(links);

  const isConneted = true;

  return (
    <>
      <header className={styles.header_navbar}>
        <div className={styles.container}>
          <div className={styles.logoPart}>
            <a href="/">
              <img
                className={styles.logo}
                alt=""
                src="/assets/images/marketplace/logo.png"
              />
            </a>
            <div className={styles.title}>
              <h1>galactic war</h1>
            </div>
            <button
              className={styles.toggleMenu}
              onClick={() => setIsShowNav((prev) => !prev)}
            >
              {!isShowNav && (
                <Icon icon="dashicons_menu-alt" size={21} color="white"></Icon>
              )}
              {isShowNav && (
                <Icon icon="ci_close-big" size={21} color="white"></Icon>
              )}
            </button>
          </div>

          <main className={isShowNav ? styles.isShowNav : ''}>
            <aside className={styles.social}>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <Icon icon="Facebook-Icon" size={24} color="#1AD7FD"></Icon>
              </a>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <Icon icon="YouTube-Icon" size={24} color="#1AD7FD"></Icon>
              </a>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <Icon icon="bxl_telegram" size={24} color="#1AD7FD"></Icon>
              </a>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <Icon icon="Twitter-Logo" size={24} color="#1AD7FD"></Icon>
              </a>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <Icon icon="Discord-Icon" size={24} color="#1AD7FD"></Icon>
              </a>
            </aside>

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
              {!isConneted && (
                <button className={styles.connect}>
                  <div className={styles.content}>
                    <span>{intl.formatMessage({ id: 'navbar.wallet' })}</span>
                    <Icon icon="bxs_lock-open-alt" size={24} />
                  </div>
                </button>
              )}
              {isConneted && (
                <div className={styles.conected}>
                  <div className={styles.balance}>
                    <img
                      className={styles.coin}
                      src={'/assets/images/navbar/Icon_ExampleCoin0 1.png'}
                      alt=""
                    />
                    <div className={styles.container}>
                      <span>123</span>
                      <img
                        className={styles.plus}
                        src={'/assets/images/navbar/Btn_BuyCoins_p 1.png'}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.address}>
                    <div className={styles.headIcon}>
                      <img
                        src={'/assets/images/navbar/profile-circle.png'}
                        alt=""
                        className={styles.centerIcon}
                      />
                      <img
                        src={'/assets/images/navbar/ItemButton04Blue_p 2.png'}
                        alt=""
                      />
                    </div>
                    <div className={styles.container}>
                      <span>0xb7e79...</span>
                    </div>
                  </div>
                </div>
              )}
            </aside>
          </main>
        </div>
      </header>
    </>
  );
};

export default Navbar;
