import { normalizeInputPrice } from '@/utils/normalizers';
import classNames from 'classnames';
import Form from 'rc-field-form';
import React from 'react';
import { useIntl } from 'umi';
import Button from '../Button';
import Select from '../Select';
import FormItem from '../Form';
import Input from '../Input';
import Modal from '../Modal';
import Text from '../Text';
import styles from './index.less';

interface Props {
  onSell: () => void;
}

interface FormValues {
  price: string;
  expired: string;
}

const Sell: React.FC<Props> = ({ onSell }: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const [visible, setVisible] = React.useState<boolean>(false);

  const onVisible = () => setVisible(!visible);

  React.useEffect(() => {
    return () => {
      if (visible) {
        form.resetFields();
      }
    };
  }, [visible]);

  const onFinish = (values: FormValues) => {
    console.log('🚀 ~ values', values);
    onVisible();

    onSell();
  };

  const optionsExpired: { label: string; value: string }[] = [
    { label: '1 day', value: '1' },
    { label: '3 days', value: '3' },
    { label: '7 days', value: '7' },
    { label: '15 days', value: '15' },
    { label: '30 days', value: '30' },
  ];

  return (
    <div className={styles.sell}>
      <Button className={styles.btn} onClick={onVisible}>
        {intl.formatMessage({ id: 'common.sell' })}
      </Button>

      <Modal
        visible={visible}
        onClose={onVisible}
        content={
          <div className={styles.content}>
            <Text
              type="title-24-bold"
              color="accent-500"
              className={styles.title}
            >
              {intl.formatMessage({ id: 'common.sell' })}
            </Text>

            <Form
              form={form}
              initialValues={{ price: '' }}
              className={styles.form}
              onFinish={onFinish}
            >
              <FormItem shouldUpdate>
                {() => {
                  const isError: boolean =
                    form.getFieldError('price').length > 0;

                  const isErrorExpired: boolean =
                    form.getFieldError('expired').length > 0;

                  return (
                    <>
                      <div className={styles.wrapperInput}>
                        <FormItem
                          name="price"
                          normalize={normalizeInputPrice}
                          rules={[
                            {
                              validator: async (_: any, value: string) => {
                                const floatValue: number = parseFloat(value);

                                if (floatValue === 0) {
                                  return Promise.reject(
                                    intl.formatMessage({
                                      id: 'common.price.zero',
                                    }),
                                  );
                                }

                                if (!value) {
                                  return Promise.reject(
                                    intl.formatMessage({
                                      id: 'common.price.required',
                                    }),
                                  );
                                }

                                return Promise.resolve();
                              },
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            className={classNames(styles.input, {
                              [styles.inputError]: isError,
                            })}
                            placeholder="0"
                          />
                        </FormItem>
                        <img alt="" src="/assets/images/ic-BNB-medium.png" />
                      </div>

                      <Button
                        htmlType="submit"
                        className={classNames(styles.btnSell, {
                          [styles.btnSellHasError]: isError,
                          [styles.btnSellHasErrorExpired]: isErrorExpired,
                          [styles.btnSellHasErrorExpired2]:
                            !isError && isErrorExpired,
                        })}
                      >
                        {intl.formatMessage({ id: 'common.sell' })}
                      </Button>
                    </>
                  );
                }}
              </FormItem>

              <div className={styles.expired}>
                <FormItem
                  name="expired"
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        id: 'common.expired.required',
                      }),
                    },
                  ]}
                >
                  <Select
                    options={optionsExpired}
                    className={styles.selectTime}
                    classNameDropdown={styles.dropdownSelectTime}
                    placeholder={intl.formatMessage({
                      id: 'common.expireAfter',
                    })}
                  />
                </FormItem>
              </div>
            </Form>
          </div>
        }
        className={styles.modalSell}
      />
    </div>
  );
};

export default Sell;
