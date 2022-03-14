import BuyNow from '@/components/BuyNow';
import CancelSell from '@/components/CancelSell';
import Sell from '@/components/Sell';
import Text from '@/components/Text';
import Transaction, { Status, StatusError } from '@/components/Transaction';
import { useIsConnected } from '@/utils/hooks/connect/wallet';
import { useRequest } from '@umijs/hooks';
import React from 'react';
import About from './About';
import styles from './index.less';
import SaleHistory from './SaleHistory';
import Stats from './Stats';

interface Props {
  refresh: () => void;
}

const Info: React.FC<Props> = ({ refresh }: Props) => {
  const isConnected: boolean = useIsConnected();
  const transactionRef: any = React.useRef();

  const testingRequest = useRequest(
    () => {
      return new Promise((resolve, reject) => {
        transactionRef?.current.onVisible();

        setTimeout(() => {
          transactionRef?.current.changeStatus({ status: Status.PROCESSING });
        }, 1000);
        setTimeout(() => {
          resolve(1);
        }, 3000);
      });
    },
    {
      manual: true,
      onSuccess: () => {
        transactionRef?.current.changeStatus({
          status: Status.SUCCESS,
        });
      },
      onError: (error: any) => {
        console.log('🚀 ~ error', error);
        transactionRef?.current.changeStatus({ status: Status.FAILED });
      },
    },
  );

  const onBuy = () => {
    if (!isConnected) {
      transactionRef?.current.onVisible();
      return transactionRef?.current.changeStatus({
        status: Status.FAILED,
        error: StatusError.AUTHENTICATED,
      });
    }

    const balance: number = 1;

    /**
     * TODO: Không đủ tiền, test giá, đổi về giá hero
     */

    if (balance < 1) {
      transactionRef?.current.onVisible();
      return transactionRef?.current.changeStatus({
        status: Status.FAILED,
        error: StatusError.INSUFFICIENT_BALANCE,
      });
    }

    return testingRequest.run();
  };

  const onSell = () => {
    return testingRequest.run();
  };

  const onCancel = () => {
    return testingRequest.run();
  };

  return (
    <div className={styles.info}>
      <div className={styles.head}>
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
        <div className={styles.btnMarket}>
          <BuyNow onBuy={onBuy} />
          <Sell onSell={onSell} />
          <CancelSell onCancel={onCancel} />
        </div>
      </div>

      <About />
      <Stats />
      <SaleHistory />

      <Transaction ref={transactionRef} refresh={refresh} />
    </div>
  );
};

export default Info;
