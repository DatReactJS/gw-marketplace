import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import Text from '../../../components/Text';
import ClaimHistory from './ClaimHistory';
import styles from './index.less';

interface Props {}

const ClaimTokens: React.FC<Props> = (props: Props) => {
  const intl = useIntl();
  const [visible, setVisible] = useState<boolean>(false);
  const [tokenActive, setTokenActive] = useState<any>({});

  const onToggle = (): void => {
    setVisible(!visible);
  };

  const dataFake = [
    {
      id: '61dfabb36a368b56552f3662',
      symbol: 'AVAX',
      name: 'Avalanche',
      address: 'FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z',
      iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
    },
    {
      id: '61dfabb36a368b56552f3663',
      symbol: 'USDT',
      name: 'Tether',
      address: '0xc7198437980c041c805a1edcba50c1ce5db95118',
      iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    },
    {
      id: '61dfabb36a368b56552f3664',
      symbol: 'KGC',
      name: 'Kingdom Gold Coin',
      address: '',
      iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/16997.png',
    },
  ];

  const handleClaimToken = (item: object) => {
    setTokenActive(item);
    onToggle();
  };

  const contentModal = () => {
    return (
      <div className={styles.containerModal}>
        <div className={styles.img}>
          <img src={tokenActive?.iconUrl} alt="" />
        </div>
        <div className={styles.title}>
          <Text type="title-24-semi-bold">{tokenActive?.name}</Text>
        </div>
        <div className={styles.wrapInput}>
          <Input className={styles.input} placeholder="Amount" />
          <Text className={styles.suffix} type="body-14-semi-bold">
            Max
          </Text>
        </div>
        <div className={styles.err}>
          {/* <Text type="body-14-semi-bold" color="warning">Amount must be greater than 0 </Text> */}
        </div>
        <div className={styles.total}>
          <Text type="body-14-semi-bold">Total: 500</Text>
        </div>
        <div className={styles.btn}>
          <Button className={styles.buttonConfirm}>
            <Text type="body-16-bold">
              {intl.formatMessage({ id: 'claim.claimConfirm' })}
            </Text>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={styles.containerClaimTokens}>
        {dataFake &&
          dataFake.map((item, idx) => {
            return (
              <div className={styles.divClaim} key={idx}>
                <div className={styles.icon}>
                  <img src={item.iconUrl} alt="" />
                </div>
                <div className={styles.name}>
                  <Text type="caption-12-semi-bold" color="primary-100">
                    {item.name}
                  </Text>
                </div>
                <div className={styles.qty}>
                  <Text type="body-16-semi-bold">x0</Text>
                </div>
                <div className={styles.btn}>
                  <Button
                    className={styles.button}
                    type="outline"
                    onClick={() => {
                      handleClaimToken(item);
                    }}
                  >
                    {intl.formatMessage({ id: 'claim.claim' })} {item.symbol}
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
      <div className={styles.claimHistory}>
        <ClaimHistory />
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
