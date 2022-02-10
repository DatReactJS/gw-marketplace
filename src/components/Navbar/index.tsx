import React, { useState } from 'react';
import Button from '../Button';
import Logo from '../Logo';
import './index.less';
import { links } from '@/utils/constants/links';
import NavBarLink from './NavBarLink';
import { useIsConnected, useWallet } from '@/utils/hooks/connect/wallet';
import { history, useIntl } from 'umi';
import Info from './Info';

const Navbar: React.FC = () => {
  const intl = useIntl();
  const { walletState, getWalletBalanceRequest } = useWallet();
  const [isShowNav, setIsShowNav] = useState(false);
  const isConnected = useIsConnected();

  React.useEffect(() => {
    if (walletState?.walletInfo?.address) {
      getWalletBalanceRequest.run(walletState.walletInfo.address);
    }
  }, [walletState?.walletInfo?.address]);

  const navigateLogin = (event: React.MouseEvent) => {
    event.preventDefault();

    history.push('/login');
    setIsShowNav(false);
  };
  const handleMenu = () => {
    setIsShowNav(!isShowNav);
  };
  const allNavLinks: string[] = Object.keys(links);
  const handleClickMenu = (value: boolean) => {
    setIsShowNav(value);
  };
  return (
    <>
      <header className="header-navbar">
        <div className="left-side">
          <Logo type="1" />

          <div className="container-header">
            <aside className="links-login">
              <Button className="open-bar">
                <i className="icon-hamburger"></i>
              </Button>
              <div className="container-links-login">
                <aside className="links">
                  {allNavLinks.map((link: string) => (
                    <NavBarLink
                      // @ts-ignore
                      link={links[link]}
                      title={intl.formatMessage({ id: `navbar.${link}` })}
                      key={link}
                    />
                  ))}
                </aside>
              </div>
            </aside>
          </div>
        </div>

        <aside className="login">
          {!isConnected && (
            <Button onClick={navigateLogin} className="btn-login">
              {intl.formatMessage({ id: 'navbar.login' })}
            </Button>
          )}

          {isConnected && <Info />}
        </aside>
        <div
          className={`breadCrumb ${isShowNav ? 'active' : ''}`}
          onClick={handleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`menuMobile ${isShowNav ? 'active' : ''}`}>
          <aside className="links">
            {allNavLinks.map((link: string) => (
              <NavBarLink
                // @ts-ignore
                link={links[link]}
                title={intl.formatMessage({ id: `navbar.${link}` })}
                key={link}
                onClick={handleClickMenu}
              />
            ))}
          </aside>
          <aside className="login loginMobile">
            {!isConnected && (
              <Button onClick={navigateLogin} className="btn-login">
                {intl.formatMessage({ id: 'navbar.login' })}
              </Button>
            )}

            {/* {isConnected && <Info />} */}
          </aside>
        </div>
      </header>
    </>
  );
};

export default Navbar;
