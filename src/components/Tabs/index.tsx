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
  SPACECRAFT = 'spacecraft',
  PLANETS = 'planets',
  WEAPONS = 'weapons',
}

interface Props {
  onChange: (tabs: TabsEnum) => void;
  defaultTab?: TabsEnum;
  currentTab: TabsEnum;
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
    const { onChange, defaultTab = TabsEnum.CHARACTER, currentTab } = props;
    const intl = useIntl();
    const tabs: TabItem[] = [
      {
        icon: <Character />,
        label: 'character',
        value: TabsEnum.CHARACTER,
      },
      {
        icon: <Ship />,
        label: 'spacecraft',
        value: TabsEnum.SPACECRAFT,
      },
      {
        icon: <Accessory />,
        label: 'planets',
        value: TabsEnum.PLANETS,
      },
      {
        icon: <Accessory />,
        label: 'weapons',
        value: TabsEnum.WEAPONS,
      },
    ];

    const [activeTab, setActiveTab] = React.useState<TabsEnum>(
      props.currentTab || TabsEnum.CHARACTER,
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
        <div className={styles.SelectReponsive}>
          <RCSelect
            options={tabs}
            className={styles.select}
            defaultValue={TabsEnum.CHARACTER}
            classNameDropdown={styles.selectDropdown}
          />
        </div>
        <div className={styles.TabsReponsive}>
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
      </div>
    );
  },
);

export default Tabs;
