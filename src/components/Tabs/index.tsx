import { useHover } from '@umijs/hooks';
import classNames from 'classnames';
import React from 'react';
import { useIntl } from 'umi';
import Accessory from '../Icon/Accesory';
import Character from '../Icon/Character';
import Ship from '../Icon/Ship';
import Text from '../Text';
import styles from './index.less';

interface TabsProps {
  onChange: (tabs: TabsEnum) => void;
  defaultTab?: TabsEnum;
}

interface TabItemProps {
  value: string;
  label: string;
  isActive: boolean;
  icon: React.ReactNode;
  onChangeTab: (value: TabsEnum) => void;
}

interface Ref {
  ref?: React.Ref<any>;
}

export enum TabsEnum {
  CHARACTER = 'character',
  SHIP = 'ship',
  ACCESORY = 'accesory',
}

const TabItem: React.FC<TabItemProps> = ({
  icon,
  isActive,
  label,
  onChangeTab,
  value,
}) => {
  const [isHovering, hoverRef] = useHover<HTMLDivElement>();

  return (
    <div
      className={classNames(styles.tab, {
        [styles.tabHover]: isHovering && !isActive,
      })}
      onClick={() => onChangeTab(value as TabsEnum)}
      ref={hoverRef}
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
};

const Tabs: React.FC<TabsProps & Ref> = React.forwardRef(
  (props: TabsProps, ref: Ref['ref']) => {
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
        {tabs.map((tab, index: number) => {
          const isActive: boolean = activeTab === tab.value;

          return (
            <TabItem
              {...tab}
              key={`tab-${index}`}
              onChangeTab={onChangeTab}
              isActive={isActive}
            />
          );
        })}
      </div>
    );
  },
);

export default Tabs;
