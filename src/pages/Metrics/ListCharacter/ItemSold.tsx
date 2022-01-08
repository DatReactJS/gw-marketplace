import React from 'react';
import styles from './index.less';

interface Props {}

const ItemSold: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.itemSold}>
      <div className={styles.infoCharacter}>
        <div className={styles.characterCode}>
          <div className={styles.avatar}>
            <img src="/assets/images/char/char1_small.png" alt="" />
          </div>
          <div className={styles.code}>#62354876</div>
        </div>
        <div className={styles.buyer}>
          <div className={styles.title}>BUYER</div>
          <div className={styles.name}>NamNQLC</div>
          <div className={styles.code}>(0xx6...78hvfg)</div>
        </div>
        <div className={styles.seller}>
          <div className={styles.title}>SELLER</div>
          <div className={styles.name}>ChiNTNQ</div>
          <div className={styles.code}>(0xx6...78hvfg)</div>
        </div>
      </div>
      <div className={styles.infoPriceCharacter}>
        <div className={styles.detail}>
          <div className={styles.number}>100</div>
          <div className={styles.icon}>
            <img src="/assets/images/bnb.svg" alt="" />
          </div>
          <div className={styles.price}>$1,200</div>
        </div>
        <div className={styles.time}>a few seconds ago</div>
      </div>
    </div>
  );
};

export default ItemSold;
