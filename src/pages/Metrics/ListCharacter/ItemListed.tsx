import Text from '@/components/Text';
import React from 'react';
import { TabsEnum } from '@/components/Tabs';
import styles from './index.less';
import { history } from 'umi';

interface Props {
  currentTab: TabsEnum;
}

const ItemListed: React.FC<Props> = (props: Props) => {
  const { currentTab } = props;

  const handleViewDetailItem = (): void => {
    history.push('character/123');
  };

  return (
    <div className={styles.itemListed} onClick={handleViewDetailItem}>
      <div className={styles.infoCharacter}>
        <div className={styles.characterCode}>
          <div className={styles.avatar}>
            <img src="/assets/images/char/char1_small.png" alt="" />
          </div>
          <div className={styles.code}>
            <Text type="caption-12-semi-bold">#62354876</Text>
          </div>
        </div>
        <div className={styles.characterPower}>
          {currentTab !== TabsEnum.SHIP && (
            <>
              <div className={styles.detailPower}>
                <div className={styles.icon}>
                  <img src="/assets/images/ObjectProps/sta.svg" alt="" />
                </div>
                <div className={styles.detail}>
                  <Text type="caption-12-semi-bold">100</Text>
                </div>
              </div>
              <div className={styles.detailPower}>
                <div className={styles.icon}>
                  <img src="/assets/images/ObjectProps/str.svg" alt="" />
                </div>
                <div className={styles.detail}>
                  <Text type="caption-12-semi-bold">100</Text>
                </div>
              </div>
              <div className={styles.detailPower}>
                <div className={styles.icon}>
                  <img src="/assets/images/ObjectProps/agi.svg" alt="" />
                </div>
                <div className={styles.detail}>
                  <Text type="caption-12-semi-bold">100</Text>
                </div>
              </div>
              <div className={styles.detailPower}>
                <div className={styles.icon}>
                  <img src="/assets/images/ObjectProps/int.svg" alt="" />
                </div>
                <div className={styles.detail}>
                  <Text type="caption-12-semi-bold">100</Text>
                </div>
              </div>
            </>
          )}
          {currentTab === TabsEnum.CHARACTER && (
            <div className={styles.detailPower}>
              <div className={styles.icon}>
                <img src="/assets/images/ObjectProps/spd.svg" alt="" />
              </div>
              <div className={styles.detail}>
                <Text type="caption-12-semi-bold">100</Text>
              </div>
            </div>
          )}
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
            <Text type="caption-12-regular"> $1,200</Text>
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

export default ItemListed;
