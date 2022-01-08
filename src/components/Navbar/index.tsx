import React from 'react';
import Button from '../Button';
import Text from '../Text';
import Logo from '../Logo';
import './index.less';
import Icon from '../Icon';
import { links } from '@/utils/constants/links';
import NavBarLink from './NavBarLink';
import { WALLET_TYPE } from '@/utils/constants/wallet';
import {
  useIsConnected,
  useWallet,
  useWalletInfo,
  useWalletState,
} from '@/utils/hooks/connect/wallet';
import ConnectWallet from '../ConnectWallet';
import { walletAddressLink } from '@/utils/normalizers';
import { history, useIntl } from 'umi';
import { toast } from 'react-toastify';
import Info from './Info';

const Navbar: React.FC = () => {
  const intl = useIntl();
  const {
    disconnectWallet,
    walletState,
    getWalletBalanceRequest,
  } = useWallet();

  const walletInfo = useWalletInfo();
  const isConnected = useIsConnected();
  const [wallet] = useWalletState();

  React.useEffect(() => {
    if (walletState?.walletInfo?.address) {
      getWalletBalanceRequest.run(walletState.walletInfo.address);
    }
  }, [walletState?.walletInfo?.address]);

  const walletIcon = () => {
    if (wallet?.walletType) {
      switch (wallet.walletType) {
        case WALLET_TYPE.META_MASK:
          return '/assets/images/logo-metamask.png';
        case WALLET_TYPE.COIN_98:
          return '/assets/images/logo-coin98.png';
        case WALLET_TYPE.WALLET_CONNECT:
          return '/assets/images/logo-wallet-connect.png';
        default:
          return;
      }
    }
  };

  const walletName = () => {
    if (wallet.walletType) {
      switch (wallet.walletType) {
        case WALLET_TYPE.META_MASK:
          return intl.formatMessage({ id: 'navbar.wallet.name.metamask' });
        case WALLET_TYPE.COIN_98:
          return intl.formatMessage({ id: 'navbar.wallet.name.coin98' });
        case WALLET_TYPE.WALLET_CONNECT:
          return intl.formatMessage({
            id: 'navbar.wallet.name.wallet.connect',
          });
        default:
          return;
      }
    }
  };

  const onDisconnectWallet = () => {
    return disconnectWallet();
  };

  const navigateLogin = (event: React.MouseEvent) => {
    event.preventDefault();

    history.push('/login');
  };

  const allNavLinks: string[] = Object.keys(links);

  return (
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

        {/* {isConnected && (
          <>
            <address className="account-info">
              <div className="total bg-dark-2">
                <Text
                  type="body-14-semi-bold"
                  color="accent-500"
                  className="d-flex align-center"
                >
                  {walletInfo?.balance}
                </Text>
                <Icon icon="BNB" color="#F3BA2F" />
              </div>
              <div className="address">
                <Text type="body-14-semi-bold">
                  {walletInfo?.formattedAddress}
                </Text>
                <Icon
                  icon="copy"
                  className="white cursor-pointer"
                  onClick={() => {
                    const address = walletInfo?.address;
                    if (address) {
                      navigator.clipboard?.writeText?.(address);
                      toast.success(
                        intl.formatMessage({ id: 'common.copied' }),
                      );
                    }
                  }}
                />
                <Icon
                  icon="external_link"
                  className="white cursor-pointer"
                  onClick={() => {
                    const address = walletInfo?.address;
                    walletAddressLink(address);
                  }}
                />
              </div>

              <div className="wallet-box">
                <div className="d-flex justify-between">
                  <aside>
                    <span className="lighter p-14">
                      {intl.formatMessage({ id: 'navbar.wallet' })}
                    </span>
                  </aside>

                  <aside className="wallet-type">
                    <span className="white p-14">
                      <img src={walletIcon()} alt="" />
                    </span>
                    <Text type="body-14-semi-bold">{walletName()}</Text>
                  </aside>
                </div>

                <div className="d-flex justify-between">
                  <aside>
                    <span className="lighter p-14">
                      {intl.formatMessage({
                        id: 'navbar.connected.network',
                      })}
                    </span>
                  </aside>

                  <aside>
                    <span className="green-dot" />
                    <span className="white p-14">BSC</span>
                  </aside>
                </div>
                <div className="hr" />
                <Button
                  onClick={onDisconnectWallet}
                  type="outline"
                  danger
                  className="p-18-semi-bold"
                >
                  <Icon icon="unlink" size={18} className="mr-2" />
                  {intl.formatMessage({ id: 'navbar.disconnect.wallet' })}
                </Button>
              </div>
            </address>
          </>
        )} */}
      </aside>
    </header>
  );
};

export default Navbar;
