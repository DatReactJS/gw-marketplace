import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Text from '@/components/Text';
import { WALLET_TYPE } from '@/utils/constants/wallet';
import { downloadExtention } from '@/utils/hooks/connect/metamask';
import classNames from 'classnames';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {
  visible: boolean;
  onClose: () => void;
  isTurnOffCoin98?: boolean;
  connectType?: string;
}

const ConnectError: React.FC<Props> = ({
  visible,
  onClose,
  isTurnOffCoin98 = false,
  connectType,
}: Props) => {
  const intl = useIntl();

  const handleDownload = () => {
    if (connectType) {
      downloadExtention(connectType);
    }
  };

  const handleManageCoin98 = () => {
    console.log('🚀 ~ handleManageCoin98');
  };

  const getLogoInstall = (): string => {
    let src: string = '';
    switch (connectType) {
      case WALLET_TYPE.META_MASK:
        src = '/assets/images/logo-metamask.png';
        break;
      case WALLET_TYPE.COIN_98:
        src = '/assets/images/logo-coin98.png';
        break;
      case WALLET_TYPE.WALLET_CONNECT:
        src = '/assets/images/logo-wallet-connect.png';
        break;

      default:
        break;
    }

    return src;
  };

  const getTextConnectType = (): string => {
    let text: string = '';
    switch (connectType) {
      case WALLET_TYPE.META_MASK:
        text = 'Metamask';
        break;
      case WALLET_TYPE.COIN_98:
        text = 'Coin 98';
        break;
      case WALLET_TYPE.WALLET_CONNECT:
        text = 'Wallet Connect';
        break;
      default:
        break;
    }

    return text;
  };

  return (
    <Modal
      closable={false}
      onClose={onClose}
      content={
        <div className={styles.content}>
          {!isTurnOffCoin98 ? (
            <div className={styles.icon}>
              <img alt="" src={getLogoInstall()} />
              <Text type="body-16-semi-bold">{getTextConnectType()}</Text>
            </div>
          ) : (
            <img alt="" src="/assets/images/logo-crash.png" />
          )}

          <div className={styles.description}>
            {!isTurnOffCoin98 ? (
              <>
                <Text type="headline-20-semi-bold">
                  {intl.formatMessage(
                    { id: 'connectWallet.notInstallExt' },
                    {
                      type: getTextConnectType(),
                    },
                  )}
                </Text>
                <Text
                  type="body-16-bold"
                  color="accent-500"
                  className={styles.txtDownload}
                  onClick={handleDownload}
                >
                  {intl.formatMessage({
                    id: 'connectWallet.downloadExtension',
                  })}
                </Text>
              </>
            ) : (
              <>
                <Text type="headline-20-semi-bold">
                  {intl.formatMessage({
                    id: 'connectWallet.cannotUseMetamask',
                  })}
                </Text>

                <div className={styles.manageExt}>
                  <Text type="body-14-regular">
                    {intl.formatMessage({ id: 'connectWallet.disabledCoin98' })}
                  </Text>
                  <Text
                    type="body-14-regular"
                    color="accent-500"
                    className={styles.txtManage}
                    onClick={handleManageCoin98}
                  >
                    {intl.formatMessage({
                      id: 'connectWallet.manageExtensions',
                    })}
                  </Text>
                </div>
              </>
            )}
          </div>

          <Button
            onClick={onClose}
            className={classNames('p-30-semi-bold', styles.btn)}
          >
            {intl.formatMessage({
              id: `connectWallet.${isTurnOffCoin98 ? 'close' : 'gotIt'}`,
            })}
          </Button>
        </div>
      }
      visible={visible}
      className={styles.modalConnectError}
    />
  );
};

export default ConnectError;
