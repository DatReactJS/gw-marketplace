import Button from '@/components/Button';
import FormItem from '@/components/Form';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Text from '@/components/Text';
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
}

interface FormValues {
  email: string;
}

const Email: React.FC<Props> = (props: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const verifyRef: any = React.useRef();

  const [email, setEmail] = React.useState<string>(props.email);
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

  const onSaveEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  const checkEmailRequest = useRequest(
    (email: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(false);
        }, 500);
      });
    },
    {
      onSuccess: (result: boolean) => {
        if (result) {
          form.setFields([
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

  const onValuesChange = (values: FormValues) => {
    if (isEmail(values.email)) {
      checkEmailRequest.run(values.email);
    }
  };

  const onFinish = (values: FormValues) => {
    if (isEmail(values.email)) {
      verifyRef.current?.setEmail?.(values.email);
      verifyRef.current?.onVisible?.();
      onVisible();
    }
  };

  const action: string = !email ? 'add' : 'change';

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
          {intl.formatMessage({ id: `settings.${action}` })}
        </Button>
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
                id: `settings.${action}Email`,
              })}
            </Text>

            <div className={styles.description}>
              <Text type="body-14-regular" color="primary-100">
                {intl.formatMessage({ id: 'settings.addEmailDescription' })}
              </Text>
            </div>

            <Form
              form={form}
              initialValues={{ email: '' }}
              onFinish={onFinish}
              onValuesChange={onValuesChange}
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

              <FormItem shouldUpdate>
                {() => {
                  const isError: boolean =
                    form.getFieldError('email').length > 0;
                  return (
                    <Button
                      htmlType={!isError ? 'submit' : 'button'}
                      className={styles.btnConfirm}
                      loading={checkEmailRequest.loading}
                    >
                      {intl.formatMessage({ id: 'common.confirm' })}
                    </Button>
                  );
                }}
              </FormItem>
            </Form>
          </div>
        }
      />

      <Verify ref={verifyRef} onSaveEmail={onSaveEmail} />
    </div>
  );
};

export default Email;
