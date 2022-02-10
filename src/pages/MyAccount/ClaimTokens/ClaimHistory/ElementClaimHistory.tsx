import Text from '@/components/Text';
import React from 'react';
import { history, useIntl } from 'umi';
import styles from './index.less';

interface Props {}

const ElementClaimHistory: React.FC<Props> = (props: Props) => {
  const intl = useIntl();

  const token = {
    id: '61dfabb36a368b56552f3662',
    symbol: 'AVAX',
    name: 'Avalanche',
    address: 'FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z',
    iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
  };

  return (
    <div className={styles.containerElement}>
      <div className={styles.status}>
        <div className={styles.flex}>
          <div className={styles.logoToken}>
            <img src={token?.iconUrl} alt="" />
          </div>
          <div className={styles.infoToken}>
            <Text type="body-18-bold" color="accent-500">
              10 {token.name}
            </Text>
          </div>
        </div>

        <div className={styles.statusClaim}>
          <Text type="caption-12-semi-bold">Successful</Text>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.date}>
          <Text type="caption-12-regular" color="primary-100">
            yyyy-MM-dd HH.MM
          </Text>
        </div>
        <div className={styles.flex}>
          <div className={styles.address}>
            <div className={styles.title}>
              <Text type="caption-12-regular" color="primary-100">
                Address:
              </Text>
            </div>
            <div className={styles.content}>
              <Text type="caption-12-regular">
                12567928284379834754857758678576857bcd
              </Text>
            </div>
          </div>
          <div className={styles.iconGroupAddress}>
            <div className={styles.iconRedirect}>
              <img src="/assets/images/Group.png" alt="" />
            </div>
            <div className={styles.iconCopy}>
              <img src="/assets/images/Group-copy.png" alt="" />
            </div>
          </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.txId}>
            <div className={styles.title}>
              <Text type="caption-12-regular" color="accent-600">
                TxID:
              </Text>
            </div>
            <div className={styles.content}>
              <Text type="caption-12-regular">
                0x9nq30x2609nt0x9nq30789548696x2609nt085
              </Text>
            </div>
          </div>
          <div className={styles.iconGroupAddress}>
            <div className={styles.icon}>
              <Text type="caption-12-regular">
                <img src="/assets/images/coolicon.png" alt="" />
              </Text>
            </div>
            <div className={styles.iconCopyTxId}>
              <img src="/assets/images/Group-copy.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementClaimHistory;
