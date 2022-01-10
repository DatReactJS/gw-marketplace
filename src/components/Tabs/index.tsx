import classNames from 'classnames';
import React from 'react';
import { useIntl } from 'umi';
import Accessory from '../Icon/Accesory';
import Character from '../Icon/Character';
import Ship from '../Icon/Ship';
import Text from '../Text';
import styles from './index.less';

interface Props {
  onChange: (tabs: TabsEnum) => void;
  defaultTab?: TabsEnum;
}

interface Ref {
  ref?: React.Ref<any>;
}

export enum TabsEnum {
  CHARACTER = 'character',
  SHIP = 'ship',
  ACCESORY = 'accesory',
}

const Tabs: React.FC<Props & Ref> = React.forwardRef(
  (props: Props, ref: Ref['ref']) => {
    const { onChange, defaultTab = TabsEnum.CHARACTER } = props;
    const intl = useIntl();

    const tabs = [
      {
        icon: <Character />,
        label: intl.formatMessage({ id: 'common.character' }),
        value: TabsEnum.CHARACTER,
      },
      {
        icon: <Ship />,
        label: intl.formatMessage({ id: 'common.ship' }),
        value: TabsEnum.SHIP,
      },
      {
        icon: <Accessory />,
        label: intl.formatMessage({ id: 'common.accesory' }),
        value: TabsEnum.ACCESORY,
      },
    ];

    const [activeTab, setActiveTab] = React.useState<TabsEnum>(defaultTab);

    const onChangeTab = (newTab: TabsEnum) => {
      setActiveTab(newTab);

      onChange(newTab);
    };

    React.useImperativeHandle(
      ref,
      () => ({
        activeTab,
        setActiveTab,
      }),
      [],
    );

    return (
      <div className={styles.tabs}>
        {tabs.map(({ icon, label, value }, index: number) => {
          const isActive: boolean = activeTab === value;

          return (
            <div
              className={styles.tab}
              onClick={() => onChangeTab(value)}
              key={`tab-${index}`}
            >
              <div className={styles.info}>
                <div
                  className={classNames(styles.icon, {
                    [styles.iconActive]: isActive,
                  })}
                >
                  {icon}
                </div>
                <Text
                  type="body-16-bold"
                  color={isActive ? 'accent-500' : 'primary-100'}
                  className={styles.label}
                >
                  {label}
                </Text>
              </div>

              <div
                className={classNames(styles.bar, {
                  [styles.barActive]: isActive,
                })}
              />
            </div>
          );
        })}
      </div>
    );
  },
);

export default Tabs;
