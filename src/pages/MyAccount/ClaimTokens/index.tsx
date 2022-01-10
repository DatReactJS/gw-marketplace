import Button from '@/components/Button';
import React from 'react';
import { useIntl } from 'umi';
import Text from '../../../components/Text';
import styles from './index.less';

interface Props {}

const ClaimTokens: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  return (
    <div className={styles.containerClaimTokens}>
      <div className={styles.divLeft}>
        <div className={styles.icon}>
          <img src="/assets/images/bnb.svg" alt="" />
        </div>
        <div className={styles.name}>
          <Text type="caption-12-semi-bold">Lorem ipsum</Text>
        </div>
        <div className={styles.qty}>
          <Text type="body-16-semi-bold">x0</Text>
        </div>
        <div className={styles.btn}>
          <Button className={styles.button} type="outline">
            Claim BNB
          </Button>
        </div>
      </div>
      <div className={styles.divBetween}>
        <div className={styles.divConvert}>
          <div className={styles.convertFrom}>
            <div className={styles.icon}>
              <img src="/assets/images/bnb.svg" alt="" />
            </div>
            <div className={styles.name}>
              <Text type="caption-12-semi-bold">xxx</Text>
            </div>
            <div className={styles.qty}>
              <Text type="body-16-semi-bold">x0</Text>
            </div>
          </div>
          <div className={styles.iconCovert}>
            <img src="/assets/images/arrow_right_white.svg" alt="" />
          </div>
          <div className={styles.convertTo}>
            <div className={styles.icon}>
              <img src="/assets/images/bnb.svg" alt="" />
            </div>
            <div className={styles.name}>
              <Text type="caption-12-semi-bold">xxx</Text>
            </div>
            <div className={styles.qty}>
              <Text type="body-16-semi-bold">x0</Text>
            </div>
          </div>
        </div>
        <div className={styles.btn}>
          <Button className={styles.button} type="outline">
            Claim ...
          </Button>
        </div>
      </div>
      <div className={styles.divRight}>
        <div className={styles.icon}>
          <img src="/assets/images/bnb.svg" alt="" />
        </div>
        <div className={styles.name}>
          <Text type="caption-12-semi-bold">Lorem ipsum</Text>
        </div>
        <div className={styles.qty}>
          <Text type="body-16-semi-bold">x0</Text>
        </div>
        <div className={styles.btn}>
          <Button className={styles.button} type="outline">
            Claim KGC
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClaimTokens;
