import Text from '@/components/Text';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {}

const Stats: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  return (
    <div className={styles.stats}>
      <Text type="headline-20-extra-bold">
        {intl.formatMessage({ id: 'marketplace.detail.stats' })}
      </Text>

      <div className={styles.box}>
        <div className={styles.block}>
          <Text type="caption-12-semi-bold" color="primary-100">
            VIT
          </Text>

          <div className={styles.property}>
            <img alt="" src="/assets/images/ObjectProps/sta.svg" />
            <Text type="body-16-bold" className={styles.txt}>
              1000
            </Text>
          </div>
        </div>
        <div className={styles.block}>
          <Text type="caption-12-semi-bold" color="primary-100">
            STR
          </Text>

          <div className={styles.property}>
            <img alt="" src="/assets/images/ObjectProps/str.svg" />
            <Text type="body-16-bold" className={styles.txt}>
              1000
            </Text>
          </div>
        </div>
        <div className={styles.block}>
          <Text type="caption-12-semi-bold" color="primary-100">
            AGI
          </Text>

          <div className={styles.property}>
            <img alt="" src="/assets/images/ObjectProps/agi.svg" />
            <Text type="body-16-bold" className={styles.txt}>
              1000
            </Text>
          </div>
        </div>
        <div className={styles.block}>
          <Text type="caption-12-semi-bold" color="primary-100">
            INT
          </Text>

          <div className={styles.property}>
            <img alt="" src="/assets/images/ObjectProps/int.svg" />
            <Text type="body-16-bold" className={styles.txt}>
              1000
            </Text>
          </div>
        </div>
        <div className={styles.block}>
          <Text type="caption-12-semi-bold" color="primary-100">
            SPD
          </Text>

          <div className={styles.property}>
            <img alt="" src="/assets/images/ObjectProps/spd.svg" />
            <Text type="body-16-bold" className={styles.txt}>
              1000
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
