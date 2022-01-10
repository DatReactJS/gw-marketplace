import Button from '@/components/Button';
import Text from '@/components/Text';
import { useBNBPrice } from '@/utils/hooks/bnb';
import { useWalletInfo } from '@/utils/hooks/connect/wallet';
import { formatWalletAddress } from '@/utils/normalizers';
import React from 'react';
import { toast } from 'react-toastify';
import { history, useIntl } from 'umi';
import ActivityItem from '../Activity/ActivityItem';
import Deposit from './Deposit';
import styles from './index.less';
import Withdraw from './Withdraw';

interface Props {}

const Account: React.FC<Props> = (props: Props) => {
  const intl = useIntl();
  const walletInfo = useWalletInfo();

  const bnbPrice = useBNBPrice();

  const balance: number = +(walletInfo.balance || 0);
  const USDTPrice: number = +(bnbPrice.usd || 0);

  const onCopied = () => {
    const address = walletInfo?.address;
    if (address) {
      navigator.clipboard?.writeText?.(address);
      toast.success(intl.formatMessage({ id: 'common.copied' }));
    }
  };

  const totalUSDT = (): number => balance * USDTPrice;

  const navigateActitivy = () => history.push('/account/activity');

  return (
    <div className={styles.account}>
      <Text type="title-24-semi-bold" color="primary-100">
        {intl.formatMessage({ id: 'account.wallets' })}
      </Text>

      <div className={styles.info}>
        <div className={styles.left}>
          <div className={styles.bnb}>
            <Text type="title-30-semi-bold">{walletInfo.balance}</Text>
            <img alt="" src="/assets/images/bnb.svg" />
          </div>

          <Text type="body-16-regular" className={styles.usd}>
            ${totalUSDT().toFixed(2)}
          </Text>

          <div className={styles.button}>
            <Deposit />
            <Withdraw />
          </div>

          <div className={styles.walletAddess}>
            <Text type="body-16-regular">
              {intl.formatMessage(
                { id: 'account.metamaskAddress' },
                { address: formatWalletAddress(walletInfo.address, 8) },
              )}
            </Text>

            <img alt="" src="/assets/images/copy.svg" onClick={onCopied} />
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.top}>
            <div className={styles.amount}>
              <img alt="" src="/assets/images/bnb.svg" />
              <Text type="body-16-regular">10 BNB</Text>
            </div>
            <div className={styles.amount}>
              <img alt="" src="/assets/images/bnb.svg" />
              <Text type="body-16-regular">10 KGC</Text>
            </div>
          </div>

          <div className={styles.bottom}>
            <div className={styles.amount}>
              <img alt="" src="/assets/images/char/char2_small.png" />
              <Text type="body-14-regular">
                {intl.formatMessage(
                  { id: `account.characters` },
                  { amount: 10 },
                )}
              </Text>
            </div>
            <div className={styles.amount}>
              <img alt="" src="/assets/images/ship/ship1_small.png" />
              <Text type="body-14-regular">
                {intl.formatMessage({ id: `account.ships` }, { amount: 10 })}
              </Text>
            </div>
            <div className={styles.amount}>
              <img alt="" src="/assets/images/ship/ship1_small.png" />
              <Text type="body-14-regular">
                {intl.formatMessage(
                  { id: `account.accesorys` },
                  { amount: 10 },
                )}
              </Text>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.activities}>
        <Text type="title-24-semi-bold" color="primary-100">
          {intl.formatMessage({ id: 'account.wallets.activities' })}
        </Text>

        <ActivityItem />

        <div className={styles.viewAll} onClick={navigateActitivy}>
          <Text
            type="body-14-semi-bold"
            color="accent-500"
            className={styles.txt}
          >
            {intl.formatMessage({ id: 'account.wallets.viewAllActivities' })}
          </Text>

          <img alt="" src="/assets/images/ic-arrow-large-accent.png" />
        </div>
      </div>
    </div>
  );
};

export default Account;
