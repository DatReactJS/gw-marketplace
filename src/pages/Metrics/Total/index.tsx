import Button from '@/components/Button';
import Paginator from '@/components/Paginator';
import Tabs, { TabsEnum } from '@/components/Tabs';
import Text from '@/components/Text';
import React, { useState } from 'react';
import styles from './index.less';

interface Props {}

const Total: React.FC<Props> = (props: Props) => {
  const [active, setActive] = useState(1);
  // const setDateActive = (id: Number):void =>{
  //   setActive(id);
  // }

  return (
    <div className={styles.total}>
      <div className={styles.optionsDate}>
        <Button className={styles.button}>Last 24h</Button>
        <Button className={styles.button} type="ghost">
          7 days
        </Button>
        <Button className={styles.button} type="ghost">
          30 days
        </Button>
      </div>

      <div className={styles.totalWrapper}>
        <div className={styles.totalSale}>
          <div className={styles.icon}>
            <img src="/assets/images/token_big.svg" alt="" />
          </div>
          <div className={styles.title}>TOTAL SALE</div>
          <div className={styles.content}>50.000</div>
        </div>
        <div className={styles.totalVolume}>
          <div className={styles.icon}>
            <img src="/assets/images/token_big.svg" alt="" />
          </div>
          <div className={styles.title}>TOTAL VOLUME</div>
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
          <div className={styles.title}>TOTAL SOLD</div>
          <div className={styles.content}>50.000</div>
        </div>
      </div>
    </div>
  );
};

export default Total;
