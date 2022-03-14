import Loading from '@/components/Loading';
import Paginator from '@/components/Paginator';
import RCSelect from '@/components/Select';
import Tabs, { TabsEnum } from '@/components/Tabs';
import { useDebounceFn, useMount, useRequest } from '@umijs/hooks';
import React, { useState } from 'react';
import { history, useLocation } from 'umi';
import Filter from './Filter';
import HeroCard from './HeroCard';
import styles from './index.less';
import NoData from './NoData';
import { useIntl } from 'umi';
import Character from '@/components/Icon/Character';
import Ship from '@/components/Icon/Ship';
import Accessory from '@/components/Icon/Accesory';

interface Props {}

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
  const tab: TabsEnum = TabsEnum.CHARACTER;

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
      value: TabsEnum.SHIP,
      isComming: true,
    },
    {
      icon: <Accessory />,
      label: intl.formatMessage({ id: 'common.accesory' }),
      value: TabsEnum.ACCESORY,
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

  const onPageChange = (page: number) => {
    const newQuery: Record<string, any> = { ...location.query, page };

    if (newQuery.page === 1) {
      delete newQuery.page;
    }

    history.push({ query: newQuery });

    run();
  };

  const onChangeTab = (newTab: TabsEnum) => {
    history.push({ query: { tab: newTab.toString() } });
    filterRef.current?.onResetFilter?.(newTab);
  };

  const renderContent = () => {
    return (
      <>
        <div className={styles.heroContainer}>
          <div className={styles.heroContainerFlex}>
            {new Array(24).fill(undefined).map((_, index: number) => {
              return (
                <div className={styles.heroCard} key={`hero-card-${index}`}>
                  <HeroCard />
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.paginatorContainer}>
          <Paginator
            totalPages={100}
            currentPage={currentPage}
            onPage={onPageChange}
          />
        </div>
      </>
    );
  };

  const handleFilterMobile = () => {
    setIsShowFilter(!isShowFilter);
  };

  const handleChangeTab = (value: any) => {
    history.push({ query: { tab: value.toString() } });
    filterRef.current?.onResetFilter?.(value);
  };

  return (
    <div className={styles.marketplace}>
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
        <Tabs onChange={onChangeTab} defaultTab={location.query?.tab} />
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
  );
};

export default Marketplace;
