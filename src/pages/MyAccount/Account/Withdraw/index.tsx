import Button from '@/components/Button';
import FormItem from '@/components/Form';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Text from '@/components/Text';
import { useWalletInfo } from '@/utils/hooks/connect/wallet';
import { normalizeInputAmount } from '@/utils/normalizers';
import classNames from 'classnames';
import Form from 'rc-field-form';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {}

interface FormValues {
  amount: string;
}

const Withdraw: React.FC<Props> = (props: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const walletInfo = useWalletInfo();

  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    return () => {
      if (visible) {
        form.resetFields();
      }
    };
  }, [visible]);

  const onVisible = () => setVisible(!visible);

  const onFinish = (values: FormValues) => {
    console.log('🚀 ~ values', values);
  };

  return (
    <div className={styles.withdraw}>
      <Button type="outline" className={styles.btn} onClick={onVisible}>
        {intl.formatMessage({ id: 'common.withdraw' })}
      </Button>

      <Modal
        visible={visible}
        onClose={onVisible}
        width={458}
        className={styles.modalWithdraw}
        content={
          <div className={styles.content}>
            <Text
              type="title-24-bold"
              color="accent-500"
              className={styles.title}
            >
              {intl.formatMessage({ id: 'common.withdraw' })}
            </Text>

            <div className={styles.info}>
              <div className={styles.kingdom}>
                <img alt="" src="/assets/images/ic-logo.png" />
                <Text type="body-14-semi-bold">KingDom Quest</Text>
              </div>

              <img alt="" src="/assets/images/ic-arrow-primary.png" />

              <div className={styles.metamask}>
                <img alt="" src="/assets/images/metamask.png" />
                <div className={styles.detail}>
                  <Text type="body-14-semi-bold">MetaMask</Text>
                  <Text type="caption-12-regular" color="primary-100">
                    {walletInfo.formattedAddress}
                  </Text>
                </div>
              </div>
            </div>

            <Form
              form={form}
              initialValues={{ amount: '' }}
              onFinish={onFinish}
            >
              <Text type="body-14-semi-bold">
                {intl.formatMessage({ id: 'common.amount' })}
              </Text>

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
                        type="number"
                        min={0}
                        placeholder="0"
                        className={classNames(styles.input, {
                          [styles.inputError]: isError,
                        })}
                      />
                    </FormItem>
                  );
                }}
              </FormItem>

              <Button htmlType="submit" className={styles.btnNext}>
                {intl.formatMessage({ id: 'common.next' })}
              </Button>
            </Form>
          </div>
        }
      />
    </div>
  );
};

export default Withdraw;
