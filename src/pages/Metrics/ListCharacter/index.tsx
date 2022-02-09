import Paginator from '@/components/Paginator';
import Tabs, { TabsEnum } from '@/components/Tabs';
import React from 'react';
import styles from './index.less';
import ItemListed from './ItemListed';
import ItemSold from './ItemSold';
import { history, useIntl } from 'umi';
import Text from '@/components/Text';

interface Props {}

const ListCharacter: React.FC<Props> = (props: Props) => {
  const intl = useIntl();
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [currentTab, setCurrentTab] = React.useState<TabsEnum>(
    TabsEnum.CHARACTER,
  );

  const handleChangeTabRecentlyListed = (tab: TabsEnum) => {
    console.log('🚀 ~ tab', tab);
    setCurrentTab(tab);
  };

  const handleChangeTabRecentlySold = (): void => {};

  const onPage = (pape: number) => {
    setCurrentPage(pape);
    console.log('🚀 ~ pape', pape);
  };

  const redirectToMarket = (): void => {
    history.push('/');
  };

  return (
    <>
      <div className={styles.listCharacter}>
        <div className={styles.recentlyListed}>
          <div className={styles.flex}>
            <div className={styles.titleRecentlyListed}>
              <Text type="headline-20-semi-bold">
                {intl.formatMessage({ id: 'metrics.recentlyListed' })}
              </Text>
            </div>
            <div className={styles.headerSelectOption}>
              <Tabs onChange={handleChangeTabRecentlyListed} />
            </div>
          </div>
          <ItemListed currentTab={currentTab} />
          <div className={styles.linkToMarketplace}>
            <Text
              type="body-14-semi-bold"
              color="accent-500"
              onClick={redirectToMarket}
            >
              {intl.formatMessage({ id: 'metrics.viewMarketPlace' })}
            </Text>

            <img src="/assets/images/arrow_right.svg" alt="" />
          </div>
        </div>
        <div className={styles.recentlySold}>
          <div className={styles.flex}>
            <div className={styles.titleRecentlySold}>
              <Text type="headline-20-semi-bold">
                {intl.formatMessage({ id: 'metrics.recentlySold' })}
              </Text>
            </div>
            <div className={styles.headerSelectOption}>
              <Tabs onChange={handleChangeTabRecentlySold} />
            </div>
          </div>
          <ItemSold />
        </div>
      </div>

      <div className={styles.pagination}>
        <Paginator currentPage={currentPage} totalPages={10} onPage={onPage} />
      </div>
    </>
  );
};

export default ListCharacter;
