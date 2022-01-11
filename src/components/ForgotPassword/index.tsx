import { isEmail } from '@/utils/common';
import { useRequest } from '@umijs/hooks';
import classNames from 'classnames';
import Form from 'rc-field-form';
import React from 'react';
import { toast } from 'react-toastify';
import { useIntl } from 'umi';
import Button from '../Button';
import FormItem from '../Form';
import Input from '../Input';
import Modal from '../Modal';
import Text from '../Text';
import styles from './index.less';

interface Props {
  onPreVisible?: () => void;
}

interface FormValues {
  email: string;
}

const ForgotPassword: React.FC<Props> = ({ onPreVisible }: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (visible) {
        form.resetFields();
      }
    };
  }, [visible]);

  const onVisible = () => setVisible(!visible);

  const onClickText = () => {
    onPreVisible?.();
    onVisible();
  };

  const resendConfirmationRequest = useRequest(
    (email: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(email);
        }, 500);
      });
    },
    {
      manual: true,
      onSuccess: (email: string) => {
        toast.success(intl.formatMessage({ id: 'common.success' }));
        onVisible();
      },
    },
  );

  const onFinish = (values: FormValues) => {
    console.log('🚀 ~ values', values);
    resendConfirmationRequest.run(values.email);
  };

  return (
    <div className={styles.forgotPassword}>
      <Text
        type="caption-12-semi-bold"
        color="accent-500"
        className={styles.text}
        onClick={onClickText}
      >
        {intl.formatMessage({ id: 'login.forgotPassword' })}
      </Text>

      <Modal
        visible={visible}
        onClose={onVisible}
        content={
          <div className={styles.content}>
            <img
              alt=""
              src="/assets/images/infor_big.svg"
              className={styles.iconInfo}
            />

            <Text type="title-24-semi-bold">
              {intl.formatMessage({ id: 'settings.forgetPassword' })}
            </Text>

            <Text type="body-14-regular" color="primary-100">
              {intl.formatMessage({ id: 'settings.forgetPasswordDesciption' })}
            </Text>

            <Form form={form} initialValues={{ email: '' }} onFinish={onFinish}>
              <FormItem shouldUpdate>
                {() => {
                  const isError: boolean =
                    form.getFieldError('email').length > 0;
                  return (
                    <FormItem
                      name="email"
                      rules={[
                        {
                          validator: (_: any, value: string) => {
                            if (!value) {
                              return Promise.reject(
                                intl.formatMessage({
                                  id: 'settings.emailRequired',
                                }),
                              );
                            }

                            const checkValidEmail: boolean = isEmail(value);

                            if (!checkValidEmail) {
                              return Promise.reject(
                                intl.formatMessage({
                                  id: 'settings.emailInvalid',
                                }),
                              );
                            }

                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <Input
                        placeholder={intl.formatMessage({
                          id: 'settings.email',
                        })}
                        className={classNames(styles.input, {
                          [styles.inputError]: isError,
                        })}
                      />
                    </FormItem>
                  );
                }}
              </FormItem>

              <Button
                htmlType="submit"
                className={styles.btnConfirm}
                loading={resendConfirmationRequest.loading}
              >
                {intl.formatMessage({ id: 'settings.emailMe' })}
              </Button>
            </Form>
          </div>
        }
        className={styles.modalForgot}
      />
    </div>
  );
};

export default ForgotPassword;
