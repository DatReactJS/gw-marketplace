import Button from '@/components/Button';
import Paginator from '@/components/Paginator';
import Tabs, { TabsEnum } from '@/components/Tabs';
import Text from '@/components/Text';
import React, { useState } from 'react';
import styles from './index.less';
import { useIntl } from 'umi';

interface Props {}

const Total: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  const [active, setActive] = useState(1);
  // const setDateActive = (id: Number):void =>{
  //   setActive(id);
  // }

  return (
    <div className={styles.total}>
      <div className={styles.optionsDate}>
        <Button className={styles.button}>
          {' '}
          {intl.formatMessage({ id: 'metrics.last24h' })}
        </Button>
        <Button className={styles.button} type="ghost">
          {intl.formatMessage({ id: 'metrics.days7' })}
        </Button>
        <Button className={styles.button} type="ghost">
          {intl.formatMessage({ id: 'metrics.days30' })}
        </Button>
      </div>

      <div className={styles.totalWrapper}>
        <div className={styles.totalSale}>
          <div className={styles.icon}>
            <img src="/assets/images/token_big.svg" alt="" />
          </div>
          <div className={styles.title}>
            {intl.formatMessage({ id: 'metrics.totalSale' })}{' '}
          </div>
          <div className={styles.content}>50.000</div>
        </div>
        <div className={styles.totalVolume}>
          <div className={styles.icon}>
            <img src="/assets/images/token_big.svg" alt="" />
          </div>
          <div className={styles.title}>
            {intl.formatMessage({ id: 'metrics.totalVolume' })}{' '}
          </div>
          <div className={styles.content}>
            <div className={styles.totalNumber}>5000</div>
            <div className={styles.iconPrice}>
              <img src="/assets/images/bnb.svg" alt="" />
            </div>
            <div className={styles.priceNumber}>$100.000</div>
          </div>
        </div>
        <div className={styles.totalSold}>
          <div className={styles.icon}>
            <img src="/assets/images/token_big.svg" alt="" />
          </div>
          <div className={styles.title}>
            {intl.formatMessage({ id: 'metrics.totalSold' })}{' '}
          </div>
          <div className={styles.content}>50.000</div>
        </div>
      </div>
    </div>
  );
};

export default Total;
