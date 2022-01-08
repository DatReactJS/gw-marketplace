import React from 'react';
import styles from './index.less';

interface Props {}

const ItemListed: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.itemListed}>
      <div className={styles.infoCharacter}>
        <div className={styles.characterCode}>
          <div className={styles.avatar}>
            <img src="/assets/images/char/char1_small.png" alt="" />
          </div>
          <div className={styles.code}>#62354876</div>
        </div>
        <div className={styles.characterPower}>
          <div className={styles.detailPower}>
            <div className={styles.icon}>
              <img src="/assets/images/ObjectProps/str.svg" alt="" />
            </div>
            <div className={styles.detail}>100</div>
          </div>
          <div className={styles.detailPower}>
            <div className={styles.icon}>
              <img src="/assets/images/ObjectProps/agi.svg" alt="" />
            </div>
            <div className={styles.detail}>100</div>
          </div>
          <div className={styles.detailPower}>
            <div className={styles.icon}>
              <img src="/assets/images/ObjectProps/int.svg" alt="" />
            </div>
            <div className={styles.detail}>100</div>
          </div>
          <div className={styles.detailPower}>
            <div className={styles.icon}>
              <img src="/assets/images/ObjectProps/spd.svg" alt="" />
            </div>
            <div className={styles.detail}>100</div>
          </div>
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

export default ItemListed;
