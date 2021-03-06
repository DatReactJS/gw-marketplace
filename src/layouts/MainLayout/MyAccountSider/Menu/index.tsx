import Button from '@/components/Button';
import { useWallet } from '@/utils/hooks/connect/wallet';
import classNames from 'classnames';
import React from 'react';
import { history, useIntl, useLocation } from 'umi';
import styles from './index.less';
import Info from './Info';

interface Props {
  onClick?: any;
}

enum MenuEnum {
  ACCOUNT = '',
  INVENTORY = 'inventory',
  ACTIVITY = 'activity',
  CLAIM_TOKENS = 'claim-tokens',
  SETTINGS = 'settings',
}

const Menu: React.FC<Props> = (props: Props) => {
  const { onClick } = props;
  const intl = useIntl();
  const location: any = useLocation();
  const { disconnectWallet } = useWallet();

  const [activeMenu, setActiveMenu] = React.useState<MenuEnum>(
    MenuEnum.ACCOUNT,
  );

  React.useEffect(() => {
    let [, prevPath, path = MenuEnum.ACCOUNT] = location.pathname.split('/');
    if (prevPath === 'email') {
      path = MenuEnum.SETTINGS;
    }

    setActiveMenu(path as MenuEnum);
  }, [location.pathname]);

  const handleLogout = (event: React.MouseEvent) => {
    event.preventDefault();

    disconnectWallet();
  };

  const allMenus = [
    {
      label: intl.formatMessage({ id: 'menu.account' }),
      value: MenuEnum.ACCOUNT,
    },
    {
      label: intl.formatMessage({ id: 'menu.inventory' }),
      value: MenuEnum.INVENTORY,
    },
    {
      label: intl.formatMessage({ id: 'menu.activity' }),
      value: MenuEnum.ACTIVITY,
    },
    {
      label: intl.formatMessage({ id: 'menu.claimTokens' }),
      value: MenuEnum.CLAIM_TOKENS,
    },
    {
      label: intl.formatMessage({ id: 'menu.accountSettings' }),
      value: MenuEnum.SETTINGS,
    },
  ];

  const handleSelectMenu = (event: React.MouseEvent, menu: MenuEnum) => {
    event.preventDefault();
    setActiveMenu(menu);
    history.push(`/account/${menu}`);
    onClick && onClick(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        <Info />
        <div className={styles.listBtn}>
          {allMenus.map(({ label, value }, index: number) => {
            const isActive: boolean = activeMenu === value;
            return (
              <Button
                key={`menu-${label}-${index}`}
                className={classNames(styles.btn, {
                  [styles.btnActive]: isActive,
                })}
                onClick={(event: React.MouseEvent) =>
                  handleSelectMenu(event, value)
                }
                type={isActive ? 'primary' : 'ghost'}
                icon={
                  <img
                    alt=""
                    src={`/assets/images/ic-${value || 'account'}.svg`}
                    className={classNames({ [styles.iconActive]: isActive })}
                  />
                }
              >
                {label}
              </Button>
            );
          })}
        </div>
        <Button
          icon={<img alt="" src="/assets/images/logout.svg" />}
          type="ghost"
          className={styles.btnLogout}
          onClick={handleLogout}
        >
          {intl.formatMessage({ id: 'menu.logout' })}
        </Button>
      </div>
    </div>
  );
};

export default Menu;
