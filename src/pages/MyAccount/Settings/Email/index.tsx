import Button from '@/components/Button';
import FormItem from '@/components/Form';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Text from '@/components/Text';
import { api, API_PATHS, privateRequest } from '@/utils/apis';
import { isEmail, isValidPassword } from '@/utils/common';
import { useRequest } from '@umijs/hooks';
import classNames from 'classnames';
import Form from 'rc-field-form';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import Verify from './Verify';

interface Props {
  email: string;
}

interface FormValues {
  email: string;
  password: string;
}

const Email: React.FC<Props> = ({ email }: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const verifyRef: any = React.useRef();

  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    return () => {
      if (visible) {
        form.resetFields();
      }
    };
  }, [visible]);

  const onVisible = () => setVisible(!visible);

  const checkEmailRequest = useRequest(
    async () => {
      const check = await privateRequest(api.post, API_PATHS.CHECK_EMAIL, {
        data: { email: form.getFieldValue('email') },
      });

      return check;
    },
    {
      onSuccess: (result: any) => {
        if (result?.status) {
          return form.setFields([
            {
              name: 'email',
              errors: [intl.formatMessage({ id: 'settings.emailExist' })],
            },
          ]);
        }
      },
      manual: true,
      debounceInterval: 300,
    },
  );

  const resendEmailRequest = useRequest(
    async () => {
      const resend = await privateRequest(
        api.get,
        API_PATHS.RESEND_CONFIRMATION_EMAIL,
      );

      return resend;
    },
    {
      manual: true,
      onSuccess: (result: any) => {
        verifyRef.current?.setEmail?.(email);
        verifyRef.current?.onVisible?.();
      },
    },
  );

  const changeEmailRequest = useRequest(
    async (values: FormValues) => {
      const change = await privateRequest(api.post, API_PATHS.UPDATE_EMAIL, {
        data: { email: values.email, currentPassword: values.password },
      });

      return change;
    },
    {
      manual: true,
      onSuccess: (result: any) => {
        if (result?.status) {
          switch (result.status) {
            case 491:
              return form.setFields([
                {
                  name: 'password',
                  errors: [
                    intl.formatMessage({ id: 'settings.passwordIncorrect' }),
                  ],
                },
              ]);
            case 473:
              return form.setFields([
                {
                  name: 'email',
                  errors: [intl.formatMessage({ id: 'settings.emailInvalid' })],
                },
              ]);
            case 481:
              return form.setFields([
                {
                  name: 'email',
                  errors: [
                    intl.formatMessage({ id: 'settings.emailRegistered' }),
                  ],
                },
              ]);
            default:
              return;
          }
        }
        verifyRef.current?.setEmail?.(changeEmailRequest.params[0].email);
        verifyRef.current?.onVisible?.();
        onVisible();
      },
    },
  );

  const handleResend = (event: React.MouseEvent) => {
    event.preventDefault();
    resendEmailRequest.run();
  };

  const onFinish = (values: FormValues) => {
    changeEmailRequest.run(values);
  };

  const onShow = (event: React.MouseEvent) => {
    event.preventDefault();

    onVisible();
  };

  const action = (): string => {
    if (email) {
      return 'change';
    }

    return 'add';
  };

  return (
    <div className={styles.email}>
      <Text type="body-14-semi-bold">
        {intl.formatMessage({ id: 'settings.email' })}
      </Text>

      <div className={styles.wrapperInput}>
        <Input
          disabled
          value={email}
          placeholder={intl.formatMessage({ id: 'settings.email' })}
          className={styles.inputEmail}
        />

        <Button className={styles.btn} onClick={onShow}>
          {intl.formatMessage({ id: `settings.${action()}` })}
        </Button>
        {email && (
          <Button
            onClick={handleResend}
            className={styles.btnResend}
            loading={resendEmailRequest.loading}
            type="outline"
          >
            {intl.formatMessage({ id: 'settings.resend' })}
          </Button>
        )}
      </div>

      <Modal
        visible={visible}
        onClose={onVisible}
        className={styles.modalEmail}
        content={
          <div className={styles.content}>
            <Text
              type="title-24-bold"
              color="accent-500"
              className={styles.title}
            >
              {intl.formatMessage({
                id: `settings.${action()}Email`,
              })}
            </Text>

            <Form
              form={form}
              initialValues={{ email: '', password: '' }}
              onFinish={onFinish}
              className={styles.form}
            >
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

                            if (value === email) {
                              return Promise.reject(
                                intl.formatMessage({
                                  id: 'settings.emailNotToBeSame',
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
                        onBlur={checkEmailRequest.run}
                      />
                    </FormItem>
                  );
                }}
              </FormItem>

              <FormItem shouldUpdate>
                {() => {
                  const isError: boolean =
                    form.getFieldError('password').length > 0;
                  return (
                    <FormItem
                      name="password"
                      rules={[
                        {
                          validator: (_: any, value: string) => {
                            if (!value) {
                              return Promise.reject(
                                intl.formatMessage({
                                  id: 'settings.passwordRequired',
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
                          id: 'settings.password',
                        })}
                        className={classNames(styles.input, {
                          [styles.inputError]: isError,
                        })}
                        type="password"
                        maxLength={64}
                      />
                    </FormItem>
                  );
                }}
              </FormItem>

              <Button
                htmlType="submit"
                className={styles.btnConfirm}
                loading={
                  checkEmailRequest.loading || changeEmailRequest.loading
                }
              >
                {intl.formatMessage({ id: 'common.confirm' })}
              </Button>
            </Form>
          </div>
        }
      />

      <Verify ref={verifyRef} />
    </div>
  );
};

export default Email;
