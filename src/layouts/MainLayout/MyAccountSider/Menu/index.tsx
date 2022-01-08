import Button from '@/components/Button';
import { useWallet } from '@/utils/hooks/connect/wallet';
import classNames from 'classnames';
import React from 'react';
import { history, useIntl } from 'umi';
import styles from './index.less';
import InfoQR from './InfoQR';

interface Props {}

enum MenuEnum {
  ACCOUNT = '',
  INVENTORY = '/inventory',
  ACTIVITY = '/activity',
  CLAIM_TOKENS = '/claim-tokens',
  SETTINGS = '/settings',
}

const Menu: React.FC<Props> = (props: Props) => {
  const intl = useIntl();
  const { disconnectWallet } = useWallet();

  const [activeMenu, setActiveMenu] = React.useState<MenuEnum>(
    MenuEnum.ACCOUNT,
  );

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
    history.push(`/account${menu}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        <InfoQR />

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
              icon={<img alt="" src="/assets/images/account.svg" />}
            >
              {label}
            </Button>
          );
        })}

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
