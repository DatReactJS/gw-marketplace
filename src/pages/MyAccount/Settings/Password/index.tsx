import Button from '@/components/Button';
import ForgotPassword from '@/components/ForgotPassword';
import FormItem from '@/components/Form';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Text from '@/components/Text';
import { api, API_PATHS, privateRequest } from '@/utils/apis';
import { isValidPassword } from '@/utils/common';
import { useRequest } from '@umijs/hooks';
import classNames from 'classnames';
import { trim } from 'lodash';
import Form from 'rc-field-form';
import React from 'react';
import { toast } from 'react-toastify';
import { history, useIntl, useLocation } from 'umi';
import styles from './index.less';

interface Props {}

interface FormValues {
  password: string;
  confirmPassword: string;
  currentPassword: string;
}

const Password: React.FC<Props> = (props: Props) => {
  const location: any = useLocation();
  const intl = useIntl();
  const [form] = Form.useForm();

  const checkIsVisible = (): boolean => {
    if (location.query) {
      if (
        location.query?.type === 'ResetPassword' &&
        location.query?.address &&
        location.query?.email &&
        location.query?.token &&
        location.pathname === '/email'
      ) {
        return true;
      }
    }

    return false;
  };

  const [password, setPassword] = React.useState<string>('12345678');
  const [visible, setVisible] = React.useState<boolean>(checkIsVisible());

  const isCreateNew: boolean = checkIsVisible();

  React.useEffect(() => {
    return () => {
      if (visible) {
        form.resetFields();
      }
    };
  }, [visible]);

  const onVisible = () => setVisible(!visible);

  const onShow = (event: React.MouseEvent) => {
    event.preventDefault();

    onVisible();
  };

  const updatePasswordRequest = useRequest(
    async (newPassword: string, currentPassword: string) => {
      const update = await privateRequest(api.post, API_PATHS.UPDATE_PASSWORD, {
        data: {
          newPassword,
          currentPassword,
        },
      });

      return update;
    },
    {
      manual: true,
      onSuccess: (result: any) => {
        if (result?.status) {
          return toast.error(intl.formatMessage({ id: 'common.failed' }));
        }

        setPassword(updatePasswordRequest.params[0]);
        onVisible();
        toast.success(intl.formatMessage({ id: 'common.success' }));
      },
    },
  );

  const createNewPasswordRequest = useRequest(
    async (password: string) => {
      const create = await api.post(API_PATHS.UPDATE_PASSWORD_BY_TOKEN, {
        data: {
          address: location.query?.address,
          token: location.query?.token,
          newPassword: password,
        },
      });

      return create;
    },
    {
      manual: true,
      onSuccess: (result: any) => {
        if (result?.status) {
          return toast.error(intl.formatMessage({ id: 'common.failed' }));
        }

        setPassword(createNewPasswordRequest.params[0]);
        onVisible();
        toast.success(intl.formatMessage({ id: 'common.success' }));
        history.push('/account/settings');
      },
    },
  );

  const onFinish = (values: FormValues) => {
    if (isCreateNew) {
      return createNewPasswordRequest.run(values.password);
    }
    return updatePasswordRequest.run(values.password, values.currentPassword);
  };

  const action = (type?: 'title'): string => {
    if (isCreateNew && type !== 'title') return 'createNew';

    if (password) return 'change';

    return 'add';
  };
  const isChange: boolean = action() === 'change';

  return (
    <div className={styles.password}>
      <Text type="body-14-semi-bold">
        {intl.formatMessage({ id: 'settings.password' })}
      </Text>

      <div className={styles.wrapperInput}>
        <Input
          disabled
          value={password}
          placeholder={intl.formatMessage({ id: 'settings.password' })}
          className={styles.inputPassword}
          type="password"
        />

        <Button className={styles.btn} onClick={onShow}>
          {intl.formatMessage({ id: `settings.${action('title')}` })}
        </Button>
      </div>

      <Modal
        visible={visible}
        onClose={onVisible}
        className={styles.modalPassword}
        content={
          <div className={styles.content}>
            <Text
              type="title-24-bold"
              color="accent-500"
              className={styles.title}
            >
              {intl.formatMessage({
                id: `settings.${action()}Password`,
              })}
            </Text>

            <Form
              form={form}
              initialValues={{
                password: '',
                confirmPassword: '',
                currentPassword: '',
              }}
              onFinish={onFinish}
              className={styles.form}
            >
              {isChange && (
                <>
                  <FormItem shouldUpdate>
                    {() => {
                      const isError: boolean =
                        form.getFieldError('currentPassword').length > 0;
                      return (
                        <FormItem
                          name="currentPassword"
                          rules={[
                            {
                              validator: (_: any, value: string) => {
                                const trimValue: string = trim(value);

                                if (!trimValue) {
                                  return Promise.reject(
                                    intl.formatMessage({
                                      id: 'settings.currentPasswordRequired',
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
                              id: 'settings.currentPassword',
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

                  <ForgotPassword onPreVisible={onVisible} />
                </>
              )}

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
                  updatePasswordRequest.loading ||
                  createNewPasswordRequest.loading
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

export default Password;
