import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import Text from '../../../components/Text';
import styles from './index.less';

interface Props {}

const ClaimTokens: React.FC<Props> = (props: Props) => {
  const intl = useIntl();
  const [visible, setVisible] = useState(false);

  const onToggle = (): void => {
    setVisible(!visible);
  };

  const contentModal = () => {
    return (
      <div className={styles.containerModal}>
        <div className={styles.img}>
          <img src="/assets/images/bnb.svg" alt="" />
        </div>
        <div className={styles.title}>
          <Text type="title-24-semi-bold">
            {intl.formatMessage({ id: 'claim.claimable' })}
          </Text>
        </div>
        <div className={styles.des}>
          <Text type="body-14-regular" color="primary-100">
            {intl.formatMessage({ id: 'claim.textModal' })}
          </Text>
        </div>
        <div className={styles.btn}>
          <Button
            className={styles.buttonClaim}
            type="ghost"
            onClick={onToggle}
          >
            <Text type="body-16-bold" color="primary-200">
              {intl.formatMessage({ id: 'claim.claimNow' })}
            </Text>
          </Button>
          <Button
            className={styles.buttonClose}
            type="ghost"
            onClick={onToggle}
          >
            <Text type="body-16-bold" color="neutral-0">
              {intl.formatMessage({ id: 'common.close' })}
            </Text>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={styles.containerClaimTokens}>
        <div className={styles.divLeft}>
          <div className={styles.icon}>
            <img src="/assets/images/bnb.svg" alt="" />
          </div>
          <div className={styles.name}>
            <Text type="caption-12-semi-bold" color="primary-100">
              Lorem ipsum
            </Text>
          </div>
          <div className={styles.qty}>
            <Text type="body-16-semi-bold">x0</Text>
          </div>
          <div className={styles.btn}>
            <Button className={styles.button} type="outline" onClick={onToggle}>
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
                <Text type="caption-12-semi-bold" color="primary-100">
                  xxx
                </Text>
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
                <Text type="caption-12-semi-bold" color="primary-100">
                  xxx
                </Text>
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
            <Text type="caption-12-semi-bold" color="primary-100">
              Lorem ipsum
            </Text>
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
      <Modal
        visible={visible}
        onClose={onToggle}
        // closable={onToggle}
        content={contentModal()}
      />
    </>
  );
};

export default ClaimTokens;
