import Button from '@/components/Button';
import Text from '@/components/Text';
import { useWalletInfo } from '@/utils/hooks/connect/wallet';
import { formatWalletAddress } from '@/utils/normalizers';
import React from 'react';
import { history, useIntl } from 'umi';
import styles from './index.less';

interface Props {}

const Info: React.FC<Props> = (props: Props) => {
  const intl = useIntl();
  const walletInfo = useWalletInfo();

  const navigateMyAccount = () => {
    history.push('/account');
  };

  return (
    <div className={styles.info}>
      <div className={styles.wallet}>
        <img alt="" src="/assets/images/metamask.png" />

        <div className={styles.detail}>
          <Text type="caption-12-semi-bold">{walletInfo?.balance} BNB</Text>
          <Text type="caption-12-regular" color="primary-100">
            {formatWalletAddress(walletInfo?.address, 8)}
          </Text>
        </div>
      </div>

      <Button
        type="outline"
        className={styles.btnMyAccount}
        icon={<img alt="" src="/assets/images/account.svg" />}
        onClick={navigateMyAccount}
      >
        {intl.formatMessage({ id: 'navbar.info.myAccount' })}
      </Button>
    </div>
  );
};

export default Info;
