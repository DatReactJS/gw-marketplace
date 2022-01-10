import Button from '@/components/Button';
import ConnectWallet from '@/components/ConnectWallet';
import ForgotPassword from '@/components/ForgotPassword';
import FormItem from '@/components/Form';
import Input from '@/components/Input';
import Text from '@/components/Text';
import { isEmail } from '@/utils/common';
import classNames from 'classnames';
import Form from 'rc-field-form';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {}

const Login: React.FC<Props> = (props: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const [showFormLogin, setShowFormLogin] = React.useState<boolean>(false);
  const [isLoginError, setIsLoginError] = React.useState<boolean>(false);

  React.useEffect(() => {
    return () => {
      if (showFormLogin) {
        form.resetFields();
      }
    };
  }, [showFormLogin]);

  const onToggleFormLogin = () => {
    setShowFormLogin(!showFormLogin);
  };

  const onTermOfUse = () => {
    window.open('https://www.google.com.vn/?hl=vi', '_blank');
  };

  const onFinish = (values: { email: string; password: string }) => {
    console.log('🚀 ~ values', values);
  };

  return (
    <div className={styles.login}>
      <Text type="title-30-bold" color="accent-500">
        {intl.formatMessage({ id: 'login.logIn' })}
      </Text>

      <div className={styles.main}>
        <ConnectWallet />

        <div
          className={classNames(styles.loginEmail, {
            [styles.formEmail]: showFormLogin,
            [styles.showCursor]: !showFormLogin,
          })}
          onClick={() => {
            !showFormLogin && onToggleFormLogin();
          }}
        >
          <div className={styles.title} onClick={onToggleFormLogin}>
            <img
              alt=""
              src="/assets/images/gmail.svg"
              className={styles.icon}
            />
            <Text type="body-16-bold" color="accent-500">
              {intl.formatMessage({ id: 'login.withEmail' })}
            </Text>
          </div>

          <Form
            form={form}
            className={styles.form}
            initialValues={{ email: '', password: '' }}
            onFinish={onFinish}
          >
            <FormItem shouldUpdate>
              {() => {
                const isError: boolean = form.getFieldError('email').length > 0;
                return (
                  <FormItem
                    name="email"
                    rules={[
                      {
                        validator: (_: any, value: string) => {
                          if (!value) {
                            return Promise.reject(
                              intl.formatMessage({ id: 'login.emailRequired' }),
                            );
                          }

                          const checkValidEmail: boolean = isEmail(value);

                          if (!checkValidEmail) {
                            return Promise.reject(
                              intl.formatMessage({ id: 'login.emailInvalid' }),
                            );
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      placeholder={intl.formatMessage({ id: 'login.email' })}
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
                        required: true,
                        whitespace: true,
                        message: intl.formatMessage({
                          id: 'login.passwordRequired',
                        }),
                      },
                    ]}
                  >
                    <Input
                      placeholder={intl.formatMessage({ id: 'login.password' })}
                      className={classNames(
                        styles.input,
                        styles.inputPassword,
                        {
                          [styles.inputError]: isError,
                        },
                      )}
                      type="password"
                    />
                  </FormItem>
                );
              }}
            </FormItem>

            <ForgotPassword />

            {showFormLogin && isLoginError && (
              <Text
                type="body-14-regular"
                color="warning"
                className={styles.txtError}
              >
                Text Error
              </Text>
            )}

            <Button
              htmlType="submit"
              className={classNames(styles.btnLogin, {
                [styles.btnLoginHide]: !showFormLogin,
              })}
            >
              {intl.formatMessage({ id: 'login.logIn' })}
            </Button>
          </Form>
        </div>

        <div className={styles.termOfUse}>
          <Text type="body-14-regular">
            {intl.formatMessage({ id: 'login.byContinue' })}
          </Text>

          <Text
            type="body-14-bold"
            color="accent-500"
            className={styles.txt}
            onClick={onTermOfUse}
          >
            {intl.formatMessage({ id: 'login.termOfUse' })}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Login;
