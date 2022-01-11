import Button from '@/components/Button';
import ForgotPassword from '@/components/ForgotPassword';
import FormItem from '@/components/Form';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Text from '@/components/Text';
import { useRequest } from '@umijs/hooks';
import classNames from 'classnames';
import { trim } from 'lodash';
import Form from 'rc-field-form';
import React from 'react';
import { toast } from 'react-toastify';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {}

interface FormValues {
  password: string;
  confirmPassword: string;
  currentPassword: string;
}

const Password: React.FC<Props> = (props: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const [password, setPassword] = React.useState<string>('');
  const [visible, setVisible] = React.useState<boolean>(false);

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
    (password: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(password);
        }, 500);
      });
    },
    {
      manual: true,
      onSuccess: (result: string) => {
        setPassword(result);
        onVisible();
        toast.success(intl.formatMessage({ id: 'common.success' }));
      },
    },
  );

  const onFinish = (values: FormValues) => {
    updatePasswordRequest.run(values.password);
  };

  const isCreateNew: boolean = false; // TODO: check in query url in email link
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

                                if (trimValue !== password) {
                                  return Promise.reject(
                                    intl.formatMessage({
                                      id: 'settings.currentPasswordInvalid',
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
                      />
                    </FormItem>
                  );
                }}
              </FormItem>

              <Button
                htmlType="submit"
                className={styles.btnConfirm}
                loading={updatePasswordRequest.loading}
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
