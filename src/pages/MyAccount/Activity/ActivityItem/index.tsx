import Text from '@/components/Text';
import React from 'react';
import styles from './index.less';

interface Props {}

const ActivityItem: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.containerActivity}>
      <div className={styles.date}>
        <Text type="body-16-semi-bold">Dec 13, 2021</Text>
      </div>
      <div className={styles.detail}>
        <div className={styles.dateActivity}>
          <Text type="body-14-semi-bold" color="primary-100">
            09:30
          </Text>
        </div>
        <div className={styles.image}>
          <img src="/assets/images/img_arow.png" alt="" />
        </div>
        <div className={styles.detailActivity}>
          <div className={styles.info}>
            <Text type="body-14-semi-bold">
              You attempted to start an auction on
              <strong>Name</strong>
              starting from 0.2 BNB to 0.19 BNB in 1 days.
            </Text>
          </div>
          <div className={styles.link}>
            <div className={styles.linkLeft}>
              <Text type="caption-12-regular" color="primary-100">
                View transaction status here
              </Text>
            </div>
            <div className={styles.linkRight}>
              <Text type="caption-12-regular" color="primary-100">
                View transaction status here
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
