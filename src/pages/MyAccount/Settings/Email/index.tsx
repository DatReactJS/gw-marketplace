import Button from '@/components/Button';
import FormItem from '@/components/Form';
import Input from '@/components/Input';
import Text from '@/components/Text';
import { api, API_PATHS, privateRequest } from '@/utils/apis';
import { isEmail } from '@/utils/common';
import { useRequest } from '@umijs/hooks';
import classNames from 'classnames';
import Form from 'rc-field-form';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import Verify from './Verify';

interface Props {
  email: string;
  isVerified: boolean;
  refresh: () => void;
}

interface FormValues {
  email: string;
}

const Email: React.FC<Props> = (props: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const verifyRef: any = React.useRef();

  const [initEmail, setInitEmail] = React.useState<string>(props.email);
  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    return () => {
      if (visible) {
        form.resetFields();
      }
    };
  }, [visible]);

  const onVisible = () => setVisible(!visible);

  const onSaveEmail = (newEmail: string) => {
    setInitEmail(newEmail);
  };

  const checkEmailRequest = useRequest(
    async (emailValue: string) => {
      const check = await privateRequest(api.post, API_PATHS.CHECK_EMAIL, {
        data: { email: emailValue },
      });

      return {
        ...check,
        email: emailValue,
      };
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
    (emailValue: string) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ email: emailValue });
        }, 500);
      });
    },
    {
      manual: true,
      onSuccess: (result: any) => {
        verifyRef.current?.setEmail?.(result.email);
        verifyRef.current?.onVisible?.();
        onVisible();
      },
    },
  );

  const handleResend = (event: React.MouseEvent) => {
    event.preventDefault();
    const emailValue: string = form.getFieldValue('email');

    if (emailValue === initEmail) {
      resendEmailRequest.run(emailValue);
    }
  };

  const preSubmit = (values: FormValues): boolean => {
    if (values.email !== initEmail && isEmail(values.email)) return true;

    return false;
  };

  const onValuesChange = (values: FormValues) => {
    if (preSubmit(values)) {
      checkEmailRequest.run(values.email);
    }
  };

  const onFinish = (values: FormValues) => {
    if (preSubmit(values)) {
      verifyRef.current?.setEmail?.(values.email);
      verifyRef.current?.onVisible?.();
      onVisible();
    }
  };

  return (
    <div className={styles.email}>
      <Text type="body-14-semi-bold">
        {intl.formatMessage({ id: 'settings.email' })}
      </Text>

      <Form
        form={form}
        initialValues={{ email: props.email }}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <div className={styles.wrapperInput}>
          <FormItem shouldUpdate>
            {() => {
              const isError: boolean = form.getFieldError('email').length > 0;
              const emailValue: string = form.getFieldValue('email');
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
                      [styles.inputInit]: emailValue === initEmail,
                    })}
                  />
                </FormItem>
              );
            }}
          </FormItem>

          <FormItem shouldUpdate>
            {() => {
              const emailValue: string = form.getFieldValue('email');
              const isError: boolean = form.getFieldError('email').length > 0;
              const checkValidEmail: boolean = isEmail(emailValue);
              const isDisabled: boolean =
                isError ||
                !emailValue ||
                emailValue === initEmail ||
                !checkValidEmail;
              return (
                <div className={styles.allBtn}>
                  <Button
                    htmlType="submit"
                    className={styles.btnSaveChange}
                    disabled={isDisabled}
                    loading={checkEmailRequest.loading}
                  >
                    {intl.formatMessage({ id: 'settings.change' })}
                  </Button>
                  {!props.isVerified && initEmail && emailValue === initEmail && (
                    <Button
                      onClick={handleResend}
                      className={styles.btnResend}
                      loading={resendEmailRequest.loading}
                    >
                      {intl.formatMessage({ id: 'settings.resend' })}
                    </Button>
                  )}
                </div>
              );
            }}
          </FormItem>
        </div>
      </Form>

      <Verify ref={verifyRef} refresh={props.refresh} />
    </div>
  );
};

export default Email;
