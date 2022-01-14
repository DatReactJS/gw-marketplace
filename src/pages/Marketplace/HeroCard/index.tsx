import Text from '@/components/Text';
import React from 'react';
import { history, useLocation } from 'umi';
import styles from './index.less';

interface Props {}

const HeroCard: React.FC<Props> = (props: Props) => {
  const location: any = useLocation();

  const heroType: string = location.query?.tab;

  const navigateDetail = () => {
    if (heroType) {
      history.push(`/${heroType}/1`);
    }
  };

  return (
    <div className={styles.heroCard} onClick={navigateDetail}>
      <img alt="" src="/assets/images/char/char1.png" className={styles.img} />

      <div className={styles.info}>
        <img alt="" src="/assets/images/Warrior.png" />
        <Text type="caption-12-semi-bold" className={styles.id}>
          #62354876
        </Text>
      </div>

      <div className={styles.prices}>
        <div className={styles.bnb}>
          <Text
            type="title-24-bold"
            color="accent-500"
            className={styles.balance}
          >
            0.5
          </Text>
          <img alt="" src="/assets/images/ic-kingdom-coin.png" />
        </div>

        <Text type="body-14-regular">$1,200</Text>
      </div>
    </div>
  );
};

export default HeroCard;
