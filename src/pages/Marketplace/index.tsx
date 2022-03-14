import Loading from '@/components/Loading';
import Paginator from '@/components/Paginator';
import RCSelect from '@/components/Select';
import Text from '@/components/Text';
import Tabs, { TabsEnum } from '@/components/Tabs';
import { useDebounceFn, useMount, useRequest } from '@umijs/hooks';
import React, { useState } from 'react';
import { history, useLocation } from 'umi';
import Filter from './Filter';
import styles from './index.less';
import { useIntl } from 'umi';
import Character from '@/components/Icon/Character';
import Ship from '@/components/Icon/Ship';
import Accessory from '@/components/Icon/Accesory';
import Spacecraft from './Spacecraft';
import Characters from './Characters';
import Planets from './Planets';

interface Props {
  location?: any;
}
interface TabItem {
  icon: React.ReactNode;
  label: string;
  value: TabsEnum;
  isComming?: boolean;
}

const Marketplace: React.FC<Props> = (props: Props) => {
  const intl = useIntl();
  const location: any = useLocation();
  const filterRef: any = React.useRef();
  const [isShowFilter, setIsShowFilter] = useState<boolean>(false);
  const currentPage: number = +location.query?.page || 1;

  const getInitialTab = (val: string) => {
    if (val) {
      return val;
    }
    return TabsEnum.CHARACTER;
  };
  const [tab, setTab]: any = useState(
    getInitialTab(props?.location?.query?.tab),
  );

  const optionsSelect: TabItem[] = [
    {
      icon: <Character />,
      label: intl.formatMessage({ id: 'common.character' }),
      value: TabsEnum.CHARACTER,
      isComming: false,
    },
    {
      icon: <Ship />,
      label: intl.formatMessage({ id: 'common.ship' }),
      value: TabsEnum.PLANETS,
      isComming: true,
    },
    {
      icon: <Accessory />,
      label: intl.formatMessage({ id: 'common.accesory' }),
      value: TabsEnum.WEAPONS,
      isComming: true,
    },
  ];

  useMount(() => history.push({ query: { ...location.query, tab } }));

  const { loading, data, run } = useRequest(
    () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 500);
      });
    },
    {
      debounceInterval: 250,
      refreshDeps: [tab],
    },
  );

  const onFiltersChangeDebounce = useDebounceFn(
    (values: Record<string, any>) => {
      history.push({ query: { ...values, tab: tab.toString() } });

      run();
    },
    300,
  );

  const onFilterChange = (values: Record<string, any>) => {
    onFiltersChangeDebounce.run(values);
  };

  const onChangeTab = (newTab: TabsEnum) => {
    history.push({ query: { tab: newTab.toString() } });
    filterRef.current?.onResetFilter?.(newTab);
    setTab(newTab);
  };

  const renderContent = () => {
    switch (tab) {
      case TabsEnum.CHARACTER:
        return <Characters />;
      case TabsEnum.SPACECRAFT:
        return <Spacecraft />;
      case TabsEnum.PLANETS:
        return <Planets />;
      case TabsEnum.WEAPONS:
        return '';
      default:
        return null;
    }
  };

  const handleFilterMobile = () => {
    setIsShowFilter(!isShowFilter);
  };

  const handleChangeTab = (value: any) => {
    history.push({ query: { tab: value.toString() } });
    filterRef.current?.onResetFilter?.(value);
  };
  console.log('tab', tab);

  return (
    <div className={styles.marketplace}>
      <div className={styles.marketplaceContainer}>
        <div className={styles.navMobile}>
          <div className={styles.selectTab}>
            <RCSelect
              className={styles.selectTab}
              options={optionsSelect}
              onChange={handleChangeTab}
              defaultValue={tab}
            />
          </div>
          <div className={styles.filter} onClick={handleFilterMobile}>
            {intl.formatMessage({ id: 'filter.filter' })}
          </div>
        </div>
        <div className={styles.tabs}>
          <Tabs
            onChange={onChangeTab}
            defaultTab={location.query?.tab}
            currentTab={tab}
          />
          <div className={styles.btnBuyNewBox}>
            <div className={styles.btnRing}>
              <img alt="" src="/assets/images/marketplace/ic-Laptop.png" />
            </div>
            <div className={styles.btn}>
              <Text type="body-16-bold" color="neutral-0" font="font-Michroma">
                buy new box
              </Text>
            </div>
          </div>
        </div>
        <Filter
          onChange={onFilterChange}
          tab={tab}
          ref={filterRef}
          showFilter={isShowFilter}
        >
          {renderContent()}
        </Filter>
      </div>
    </div>
  );
};

export default Marketplace;
