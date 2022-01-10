import Paginator from '@/components/Paginator';
import Tabs, { TabsEnum } from '@/components/Tabs';
import React from 'react';
import styles from './index.less';
import ItemListed from './ItemListed';
import ItemSold from './ItemSold';
import { useIntl } from 'umi';
import Text from '@/components/Text';

interface Props {}

const ListCharacter: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  const handleChangeTab = (tab: TabsEnum) => {
    console.log('🚀 ~ tab', tab);
  };

  const onPage = (pape: number) => {
    console.log('🚀 ~ pape', pape);
  };

  return (
    <>
      <div className={styles.listCharacter}>
        <div className={styles.recentlyListed}>
          <div className={styles.titleRecentlyListed}>
            <Text type="headline-20-semi-bold">
              {intl.formatMessage({ id: 'metrics.recentlyListed' })}
            </Text>
          </div>
          <div className={styles.headerSelectOption}>
            <Tabs onChange={handleChangeTab} />
          </div>
          <ItemListed />
          <div className={styles.linkToMarketplace}>
            <Text type="body-14-semi-bold">
              {intl.formatMessage({ id: 'metrics.viewMarketPlace' })}
            </Text>

            <img src="/assets/images/arrow_right.svg" alt="" />
          </div>
        </div>
        <div className={styles.recentlySold}>
          <div className={styles.titleRecentlySold}>
            <Text type="headline-20-semi-bold">
              {intl.formatMessage({ id: 'metrics.recentlySold' })}
            </Text>
          </div>
          <div className={styles.headerSelectOption}>
            <Tabs onChange={handleChangeTab} />
          </div>
          <ItemSold />
        </div>
      </div>
      <div className={styles.pagination}>
        <Paginator currentPage={1} totalPages={100} onPage={onPage} />
      </div>
    </>
  );
};

export default ListCharacter;
