import Text from '@/components/Text';
import React from 'react';
import { history } from 'umi';
import styles from './index.less';

interface Props {}

const ItemSold: React.FC<Props> = (props: Props) => {
  const handleViewDetailItem = (): void => {
    history.push('character/123');
  };

  return (
    <div className={styles.itemSold} onClick={handleViewDetailItem}>
      <div className={styles.infoCharacter}>
        <div className={styles.characterCode}>
          <div className={styles.avatar}>
            <img src="/assets/images/char/char1_small.png" alt="" />
          </div>
          <div className={styles.code}>
            <Text type="caption-12-semi-bold"> #62354876</Text>
          </div>
        </div>
        <div className={styles.buyer}>
          <div className={styles.title}>
            <Text type="caption-12-regular" color="primary-100">
              BUYER
            </Text>
          </div>
          <div className={styles.name}>
            <Text type="body-14-semi-bold">NamNQLC</Text>
          </div>
          <div className={styles.code}>
            <Text type="caption-12-regular" color="primary-100">
              (0xx6...78hvfg)
            </Text>
          </div>
        </div>
        <div className={styles.seller}>
          <div className={styles.title}>
            <Text type="caption-12-regular" color="primary-100">
              SELLER
            </Text>
          </div>
          <div className={styles.name}>
            <Text type="body-14-semi-bold">ChiNTNQ</Text>
          </div>
          <div className={styles.code}>
            <Text type="caption-12-regular" color="primary-100">
              (0xx6...78hvfg)
            </Text>
          </div>
        </div>
      </div>
      <div className={styles.infoPriceCharacter}>
        <div className={styles.detail}>
          <div className={styles.number}>
            <Text type="headline-20-semi-bold" color="accent-500">
              100
            </Text>
          </div>
          <div className={styles.icon}>
            <img src="/assets/images/bnb.svg" alt="" />
          </div>
          <div className={styles.price}>
            <Text type="caption-12-regular">$1,200</Text>
          </div>
        </div>
        <div className={styles.time}>
          <Text type="caption-12-light" color="primary-100">
            a few seconds ago
          </Text>
        </div>
      </div>
    </div>
  );
};

export default ItemSold;
