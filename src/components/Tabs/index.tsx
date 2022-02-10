import React from 'react';
import { useIntl } from 'umi';
import Accessory from '../Icon/Accesory';
import Character from '../Icon/Character';
import Ship from '../Icon/Ship';
import styles from './index.less';
import TabItem from './TabItem';
import RCSelect from '@/components/Select';

export enum TabsEnum {
  CHARACTER = 'character',
  SHIP = 'ship',
  ACCESORY = 'accesory',
}

interface Props {
  onChange: (tabs: TabsEnum) => void;
  defaultTab?: TabsEnum;
}
interface TabItem {
  icon: React.ReactNode;
  label: string;
  value: TabsEnum;
}

interface Ref {
  ref?: React.Ref<any>;
}

const Tabs: React.FC<Props & Ref> = React.forwardRef(
  (props: Props, ref: Ref['ref']) => {
    const { onChange, defaultTab = TabsEnum.CHARACTER } = props;
    const intl = useIntl();
    const tabs: TabItem[] = [
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

    const [activeTab, setActiveTab] = React.useState<TabsEnum>(
      TabsEnum.CHARACTER,
    );

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
        {tabs.map((tab: TabItem, index: number) => {
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
