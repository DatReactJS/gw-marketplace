import Text from '@/components/Text';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {}

const About: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  return (
    <div className={styles.about}>
      <Text type="headline-20-extra-bold">
        {intl.formatMessage({ id: 'marketplace.detail.about' })}
      </Text>

      <div className={styles.box}>
        <div className={styles.top}>
          <div className={styles.block}>
            <Text type="caption-12-semi-bold" color="primary-100">
              {intl.formatMessage({ id: 'marketplace.detail.class' })}
            </Text>

            <div className={styles.property}>
              <img alt="" src="/assets/images/Warrior.png" />
              <Text type="body-16-bold" className={styles.txt}>
                Warrior
              </Text>
            </div>
          </div>

          <div className={styles.block}>
            <Text type="caption-12-semi-bold" color="primary-100">
              {intl.formatMessage({ id: 'marketplace.detail.rarity' })}
            </Text>

            <div className={styles.property}>
              <img alt="" src="/assets/images/Legend.png" />
              <Text type="body-16-bold" className={styles.txt}>
                Legendary
              </Text>
            </div>
          </div>

          <div className={styles.block}>
            <Text type="caption-12-semi-bold" color="primary-100">
              {intl.formatMessage({ id: 'marketplace.detail.trainingCount' })}
            </Text>

            <div className={styles.property}>
              <Text type="body-16-bold" className={styles.txt}>
                3/7
              </Text>
            </div>
          </div>
        </div>

        <div className={styles.block}>
          <Text type="caption-12-semi-bold" color="primary-100">
            {intl.formatMessage({ id: 'marketplace.detail.owner' })}
          </Text>

          <div className={styles.property}>
            <Text type="body-16-bold">NamNQLC</Text>
            <Text
              type="body-14-regular"
              className={styles.txt}
              color="primary-100"
            >
              (0xx6...78hvfg597a62fd50a5bd766e7d85fe09638bd)
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
