import { TabsEnum } from '@/components/Tabs';
import Text from '@/components/Text';
import classNames from 'classnames';
import React from 'react';
import { history, useIntl, useLocation } from 'umi';
import styles from './index.less';

interface Props {}

const HeroCard: React.FC<Props> = (props: Props) => {
  const location: any = useLocation();
  const intl = useIntl();

  const heroType: string = location.query?.tab || TabsEnum.CHARACTER;

  const navigateDetail = () => {
    history.push(`/${heroType}/1`);
  };

  return (
    <div
      className={classNames(styles.heroCard, {
        [styles.common]: false,
        [styles.rare]: false,
        [styles.epic]: false,
        [styles.legendary]: true,
      })}
      onClick={navigateDetail}
    >
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

      {/* <Text type="body-14-semi-bold" color="warning" className={styles.expired}>
        {intl.formatMessage({ id: 'common.expired' })}
      </Text> */}
    </div>
  );
};

export default HeroCard;
