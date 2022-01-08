import Paginator from '@/components/Paginator';
import Text from '@/components/Text';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {}

const SaleHistory: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  const [page, setPage] = React.useState<number>(1);

  const onPageChange = (newPage: number) => {
    console.log('🚀 ~ newPage', newPage);
    setPage(newPage + 1);
  };

  return (
    <div className={styles.saleHistory}>
      <Text type="headline-20-extra-bold">
        {intl.formatMessage({ id: 'marketplace.detail.saleHistory' })}
      </Text>

      <div className={styles.table}>
        {new Array(10).fill(undefined).map((_, index: number) => (
          <div className={styles.row} key={`sale-${index}`}>
            <div className={styles.info}>
              <div className={styles.buyer}>
                <Text type="caption-12-regular" color="primary-100">
                  {intl.formatMessage({ id: 'marketplace.detail.buyer' })}
                </Text>
                <Text type="body-14-semi-bold">NamNQLC</Text>
                <Text type="caption-12-regular" color="primary-100">
                  (0xx6...78hvfg)
                </Text>
              </div>
              <div className={styles.seller}>
                <Text type="caption-12-regular" color="primary-100">
                  {intl.formatMessage({ id: 'marketplace.detail.buyer' })}
                </Text>
                <Text type="body-14-semi-bold">ChiNQLC</Text>
                <Text type="caption-12-regular" color="primary-100">
                  (0xx6...78hvfg)
                </Text>
              </div>
            </div>
            <div className={styles.other}>
              <div className={styles.prices}>
                <div className={styles.bnb}>
                  <Text
                    type="title-24-bold"
                    color="accent-500"
                    className={styles.balance}
                  >
                    0.5
                  </Text>
                  <img alt="" src="/assets/images/bnb.svg" />
                </div>

                <Text type="body-14-regular">$1,200</Text>
              </div>
              <Text type="caption-12-light" color="primary-100">
                a few seconds ago
              </Text>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <Paginator
          totalPages={100}
          currentPage={page - 1}
          onPage={onPageChange}
        />
      </div>
    </div>
  );
};

export default SaleHistory;
