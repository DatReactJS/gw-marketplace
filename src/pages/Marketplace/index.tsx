import Tabs, { TabsEnum } from '@/components/Tabs';
import { useDebounceFn, useRequest } from '@umijs/hooks';
import React from 'react';
import { history, useLocation } from 'umi';
import Filter from './Filter';
import styles from './index.less';

interface Props {}

const Marketplace: React.FC<Props> = (props: Props) => {
  const location: any = useLocation();

  const currentPage: number = +location.query?.page || 1;

  const { loading, data, run } = useRequest(
    () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(() => console.log('🚀 ~ Loading Character...'));
        }, 500);
      });
    },
    {
      debounceInterval: 250,
      refreshDeps: [],
    },
  );

  const onFiltersChangeDebounce = useDebounceFn(
    (values: Record<string, any>) => {
      history.push({ query: values });
      run();
    },
    300,
  );

  const onFilterChange = (values: Record<string, any>) => {
    onFiltersChangeDebounce.run(values);
  };

  const onChangeTab = (tab: TabsEnum) => {
    console.log('🚀 ~ tab', tab);

    history.push({ query: { tab: tab.toString() } });
  };

  return (
    <div className={styles.marketplace}>
      <div className={styles.tabs}>
        <Tabs onChange={onChangeTab} defaultTab={location.query?.tab} />
      </div>

      <Filter onChange={onFilterChange}>
        <div>Content</div>
      </Filter>
    </div>
  );
};

export default Marketplace;
