import React from 'react';
import styles from './index.less';

interface Props {}

const ActivityItem: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.containerActivity}>
      <div className={styles.date}>Dec 13, 2021</div>
      <div className={styles.detail}>
        <div className={styles.dateActivity}>09:30</div>
        <div className={styles.image}>
          <img src="/assets/images/img_arow.png" alt="" />
        </div>
        <div className={styles.detailActivity}>
          <div className={styles.info}>
            You attempted to start an auction on
            <span>Name</span>
            starting from 0.2 BNB to 0.19 BNB in 1 days.
          </div>
          <div className={styles.link}>
            <div className={styles.linkLeft}>View transaction status here</div>
            <div className={styles.linkRight}>View transaction status here</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
