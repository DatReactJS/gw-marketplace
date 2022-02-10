import Button from '@/components/Button';
import FormItem from '@/components/Form';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Text from '@/components/Text';
import { normalizeInputAmount } from '@/utils/normalizers';
import classNames from 'classnames';
import Form from 'rc-field-form';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import ClaimHistory from './ClaimHistory';
import styles from './index.less';

interface Props {}

interface FormValues {
  amount: string;
}

const ClaimTokens: React.FC<Props> = (props: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const [visible, setVisible] = useState<boolean>(false);
  const [tokenActive, setTokenActive] = useState<any>({});

  React.useEffect(() => {
    return () => {
      if (visible) {
        form.resetFields();
      }
    };
  }, [visible]);

  const onToggle = (): void => {
    setVisible(!visible);
  };

  const dataFake = [
    {
      id: '61dfabb36a368b56552f3662',
      symbol: 'AVAX',
      name: 'Avalanche',
      address: 'FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z',
      iconUrl: '/assets/images/ic-avax.png',
    },
    {
      id: '61dfabb36a368b56552f3663',
      symbol: 'USDT',
      name: 'Tether',
      address: '0xc7198437980c041c805a1edcba50c1ce5db95118',
      iconUrl: '/assets/images/ic-usdt.png',
    },
    {
      id: '61dfabb36a368b56552f3664',
      symbol: 'KGC',
      name: 'Kingdom Gold Coin',
      address: '',
      iconUrl: '/assets/images/ic-kingdom-coin-lg.png',
    },
  ];

  const handleClaimToken = (item: object) => {
    setTokenActive(item);
    onToggle();
  };

  const handleClickMax = () => {
    form.setFieldsValue({ amount: '500' });
  };

  const onFinish = (values: FormValues) => {
    console.log('🚀 ~ values', values);
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

        <Form form={form} onFinish={onFinish} initialValues={{ amount: '' }}>
          <div className={styles.wrapInput}>
            <FormItem shouldUpdate>
              {() => {
                const isError: boolean =
                  form.getFieldError('amount').length > 0;

                return (
                  <FormItem
                    name="amount"
                    normalize={(value: string) => {
                      if (!value) return '';

                      return normalizeInputAmount(value);
                    }}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: intl.formatMessage({
                          id: 'common.amount.required',
                        }),
                      },
                    ]}
                  >
                    <Input
                      className={classNames(styles.input, {
                        [styles.inputError]: isError,
                      })}
                      placeholder="Amount"
                      type="number"
                      min={0}
                    />
                  </FormItem>
                );
              }}
            </FormItem>

            <Text
              className={styles.suffix}
              type="body-14-semi-bold"
              onClick={handleClickMax}
            >
              Max
            </Text>
          </div>
          <div className={styles.total}>
            <Text type="body-14-semi-bold">Total: 500</Text>
          </div>
          <div className={styles.btn}>
            <Button className={styles.buttonConfirm} htmlType="submit">
              <Text type="body-16-bold">
                {intl.formatMessage({ id: 'claim.claimConfirm' })}
              </Text>
            </Button>
          </div>
        </Form>
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
      <Modal visible={visible} onClose={onToggle} content={contentModal()} />
    </>
  );
};

export default ClaimTokens;
