import Button from '@/components/Button';
import RcCheckBox from '@/components/Checkbox';
import ConnectWallet from '@/components/ConnectWallet';
import ForgotPassword from '@/components/ForgotPassword';
import FormItem from '@/components/Form';
import Input from '@/components/Input';
import Text from '@/components/Text';
import { api, API_PATHS } from '@/utils/apis';
import { ENVIRONMENTS } from '@/utils/constants/environments';
import { WALLET_TYPE } from '@/utils/constants/wallet';
import { useWallet } from '@/utils/hooks/connect/wallet';
import { formatWalletAddress } from '@/utils/normalizers';
import { useRequest } from '@umijs/hooks';
import classNames from 'classnames';
import { trim } from 'lodash';
import Form from 'rc-field-form';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import QR from './QR';

interface Props {}

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

const Login: React.FC<Props> = (props: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const { walletState, setWalletState } = useWallet();

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

  const loginWithUsername = useRequest(
    async (values: FormValues) => {
      const result = await api.post(API_PATHS.LOGIN, {
        data: {
          userNameOrEmail: values.email,
          password: values.password,
        },
      });
      return result;
    },
    {
      manual: true,
      onSuccess: (r) => {
        if (r) {
          const address: string = r?.address;
          const walletType: string = WALLET_TYPE.META_MASK;
          const formattedAddress = formatWalletAddress(address);
          localStorage.setItem(
            ENVIRONMENTS.LOCAL_STORAGE_KEY,
            JSON.stringify({
              walletType,
              address,
              formattedAddress,
              token: r?.token,
            }),
          );
          setWalletState({
            ...walletState,
            // @ts-ignore
            walletType,
            // @ts-ignore
            walletInfo: { address, formattedAddress },
          });
        }
      },
    },
  );

  const onFinish = (values: FormValues) => {
    loginWithUsername.run(values);
  };

  return (
    <div className={styles.login}>
      <Text type="title-30-bold" color="accent-500">
        {intl.formatMessage({ id: 'login.logIn' })}
      </Text>

      <div className={styles.main}>
        <ConnectWallet />

        <QR />

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
              src="/assets/images/ic-account.png"
              className={styles.icon}
            />
            <Text type="body-16-bold" color="accent-500">
              {intl.formatMessage({ id: 'login.withUserName' })}
            </Text>
          </div>

          <Form
            form={form}
            className={styles.form}
            initialValues={{ email: '', password: '', remember: false }}
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
                          const username: string = trim(value);

                          if (!username) {
                            return Promise.reject(
                              intl.formatMessage({
                                id: 'login.usernameRequired',
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
                      placeholder={intl.formatMessage({ id: 'login.username' })}
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

            <div className={styles.extra}>
              <div className={styles.checkbox}>
                <FormItem name="remember">
                  {({
                    value,
                    onChange,
                  }: {
                    value: boolean;
                    onChange: Function;
                  }) => {
                    return (
                      <RcCheckBox
                        onChange={() => onChange(!value)}
                        checked={!!value}
                        className={styles.check}
                        tickAccent
                      >
                        <Text
                          type="caption-12-semi-bold"
                          color="accent-500"
                          onClick={() => onChange(!value)}
                        >
                          {intl.formatMessage({ id: 'login.rememberMe' })}
                        </Text>
                      </RcCheckBox>
                    );
                  }}
                </FormItem>
              </div>
              <ForgotPassword />
            </div>

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
              loading={loginWithUsername.loading}
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
