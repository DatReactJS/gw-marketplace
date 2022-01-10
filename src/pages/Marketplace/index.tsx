import Loading from '@/components/Loading';
import Paginator from '@/components/Paginator';
import Tabs, { TabsEnum } from '@/components/Tabs';
import { useDebounceFn, useMount, useRequest } from '@umijs/hooks';
import React from 'react';
import { history, useLocation } from 'umi';
import Filter from './Filter';
import HeroCard from './HeroCard';
import styles from './index.less';
import NoData from './NoData';

interface Props {}

const Marketplace: React.FC<Props> = (props: Props) => {
  const location: any = useLocation();
  const filterRef: any = React.useRef();

  const currentPage: number = +location.query?.page - 1 || 0;
  const tab: TabsEnum = location.query?.tab || TabsEnum.CHARACTER;

  useMount(() => history.push({ query: { tab } }));

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
    const realPage: number = page + 1;

    const newQuery: Record<string, any> = { ...location.query, page: realPage };
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
    if (loading) {
      return (
        <div className={styles.loading}>
          <Loading />
        </div>
      );
    }

    if (data && !loading) {
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
    }

    if ((data as any)?.heroes?.length === 0 && !loading) {
      return <NoData />;
    }

    /**
     * TODO: Return error page or null
     */

    return null;
  };

  return (
    <div className={styles.marketplace}>
      <div className={styles.tabs}>
        <Tabs onChange={onChangeTab} defaultTab={location.query?.tab} />
      </div>

      <Filter onChange={onFilterChange} tab={tab} ref={filterRef}>
        {renderContent()}
      </Filter>
    </div>
  );
};

export default Marketplace;
