import Button from '@/components/Button';
import FormItem from '@/components/Form';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Text from '@/components/Text';
import { api, API_PATHS, privateRequest } from '@/utils/apis';
import { isValidPassword, isValidUsername } from '@/utils/common';
import { useRequest } from '@umijs/hooks';
import classNames from 'classnames';
import { trim } from 'lodash';
import Form from 'rc-field-form';
import React from 'react';
import { toast } from 'react-toastify';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {
  refresh: () => void;
}

interface FormValues {
  username: string;
  password: string;
  confirmPassword?: string;
}

const Init: React.FC<Props> = ({ refresh }: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    return () => {
      if (visible) {
        form.resetFields();
      }
    };
  }, [visible]);

  const onVisible = () => setVisible(!visible);

  const checkUsernameRequest = useRequest(
    async (values: FormValues) => {
      const check = await privateRequest(api.post, API_PATHS.CHECK_USERNAME, {
        data: { username: values.username },
      });

      return {
        ...check,
        ...values,
      };
    },
    {
      onSuccess: (result: any) => {
        if (result?.status) {
          let message: string = intl.formatMessage({
            id: 'settings.usernameWrong',
          });
          if (result.status === 480) {
            /**
             * Username existed with status code 480
             */
            message = intl.formatMessage({ id: 'settings.usernameExist' });
          }

          return form.setFields([
            {
              name: 'username',
              errors: [message],
            },
          ]);
        }

        return initAccountRequest.run({
          username: result.username,
          password: result.password,
        });
      },
      manual: true,
      debounceInterval: 300,
    },
  );

  const initAccountRequest = useRequest(
    async ({ username, password }: FormValues) => {
      const init = await privateRequest(api.post, API_PATHS.INIT, {
        data: { username, password },
      });

      return init;
    },
    {
      manual: true,
      onSuccess: (result: any) => {
        if (result?.status) {
          return toast.error(intl.formatMessage({ id: 'common.failed' }));
        }

        refresh();
      },
    },
  );

  const onFinish = ({ confirmPassword, ...values }: FormValues) => {
    checkUsernameRequest.run(values);
  };

  return (
    <div className={styles.init}>
      <Button className={styles.btn} onClick={onVisible}>
        {intl.formatMessage({ id: 'settings.createAccount' })}
      </Button>

      <Modal
        visible={visible}
        onClose={onVisible}
        className={styles.modalInit}
        content={
          <div className={styles.content}>
            <Text
              type="title-24-bold"
              color="accent-500"
              className={styles.title}
            >
              {intl.formatMessage({
                id: 'settings.createAccount',
              })}
            </Text>

            <Form
              form={form}
              initialValues={{
                username: '',
                password: '',
                confirmPassword: '',
              }}
              onFinish={onFinish}
              className={styles.form}
            >
              <FormItem shouldUpdate>
                {() => {
                  const isError: boolean =
                    form.getFieldError('username').length > 0;
                  return (
                    <FormItem
                      name="username"
                      rules={[
                        {
                          validator: (_: any, value: string) => {
                            const username: string = trim(value);

                            if (!username) {
                              return Promise.reject(
                                intl.formatMessage({
                                  id: 'settings.usernameRequired',
                                }),
                              );
                            }

                            if (username.length < 6) {
                              return Promise.reject(
                                intl.formatMessage({
                                  id: 'settings.usernameMin',
                                }),
                              );
                            }

                            const checkUsername: boolean = isValidUsername(
                              username,
                            );

                            if (!checkUsername) {
                              return Promise.reject(
                                intl.formatMessage({
                                  id: 'settings.usernameInvalid',
                                }),
                              );
                            }

                            return Promise.resolve();
                          },
                        },
                      ]}
                      normalize={(value: string) => {
                        if (!value) return '';

                        const text: string = value.replace(/\s/g, '');

                        return text;
                      }}
                    >
                      <Input
                        maxLength={32}
                        placeholder={intl.formatMessage({
                          id: 'settings.username',
                        })}
                        className={classNames(styles.input, {
                          [styles.inputError]: isError,
                        })}
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

                            const checkPassword: boolean = isValidPassword(
                              value,
                            );

                            if (!checkPassword) {
                              return Promise.reject(
                                intl.formatMessage({
                                  id: 'settings.passwordInvalid',
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

              <FormItem shouldUpdate>
                {() => {
                  const isError: boolean =
                    form.getFieldError('confirmPassword').length > 0;

                  const password: string = form.getFieldValue('password');
                  return (
                    <FormItem
                      name="confirmPassword"
                      rules={[
                        {
                          validator: (_: any, value: string) => {
                            if (!value) {
                              return Promise.reject(
                                intl.formatMessage({
                                  id: 'settings.repeatPasswordRequired',
                                }),
                              );
                            }

                            if (value !== password) {
                              return Promise.reject(
                                intl.formatMessage({
                                  id: 'settings.repeatPasswordMatch',
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
                          id: 'settings.repeatPassword',
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
                  checkUsernameRequest.loading || initAccountRequest.loading
                }
              >
                {intl.formatMessage({ id: 'common.confirm' })}
              </Button>
            </Form>
          </div>
        }
      />
    </div>
  );
};

export default Init;
