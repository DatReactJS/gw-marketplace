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
        <Button className={styles.buttonActive}>
          <Text type="body-14-semi-bold">
            {intl.formatMessage({ id: 'metrics.last24h' })}
          </Text>
        </Button>
        <Button className={styles.button} type="ghost">
          <Text type="body-14-semi-bold">
            {intl.formatMessage({ id: 'metrics.days7' })}
          </Text>
        </Button>
        <Button className={styles.button} type="ghost">
          <Text type="body-14-semi-bold">
            {intl.formatMessage({ id: 'metrics.days30' })}
          </Text>
        </Button>
      </div>

      <div className={styles.totalWrapper}>
        <div className={styles.totalSale}>
          <div className={styles.icon}>
            <img src="/assets/images/token_big.svg" alt="" />
          </div>
          <div className={styles.title}>
            <Text type="body-14-semi-bold">
              {intl.formatMessage({ id: 'metrics.totalSale' })}
            </Text>
          </div>
          <div className={styles.content}>
            <Text type="title-24-extra-bold">50.000</Text>
          </div>
        </div>
        <div className={styles.totalVolume}>
          <div className={styles.icon}>
            <img src="/assets/images/token_big.svg" alt="" />
          </div>
          <div className={styles.title}>
            <Text type="body-14-semi-bold">
              {intl.formatMessage({ id: 'metrics.totalVolume' })}
            </Text>
          </div>
          <div className={styles.content}>
            <div className={styles.totalNumber}>
              <Text type="title-24-extra-bold">5000</Text>
            </div>
            <div className={styles.iconPrice}>
              <img src="/assets/images/bnb.svg" alt="" />
            </div>
            <div className={styles.priceNumber}>
              <Text type="body-14-regular">$100.000</Text>
            </div>
          </div>
        </div>
        <div className={styles.totalSold}>
          <div className={styles.icon}>
            <img src="/assets/images/token_big.svg" alt="" />
          </div>
          <div className={styles.title}>
            <Text type="body-14-semi-bold">
              {intl.formatMessage({ id: 'metrics.totalSold' })}
            </Text>
          </div>
          <div className={styles.content}>
            <Text type="title-24-extra-bold">50.000</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Total;
