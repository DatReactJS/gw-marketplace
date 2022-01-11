import Button from '@/components/Button';
import FormItem from '@/components/Form';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Text from '@/components/Text';
import { useRequest } from '@umijs/hooks';
import classNames from 'classnames';
import Form from 'rc-field-form';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import Success from './Success';

interface Props {
  onSaveEmail: (email: string) => void;
}

interface Ref {
  ref: React.Ref<any>;
}

interface FormValues {
  code: string;
}

const Verify: React.FC<Props & Ref> = React.forwardRef(
  ({ onSaveEmail }: Props, ref: Ref['ref']) => {
    const intl = useIntl();
    const [form] = Form.useForm();
    const successRef: any = React.useRef();

    const [email, setEmail] = React.useState('');
    const [visible, setVisible] = React.useState<boolean>(false);

    React.useEffect(() => {
      return () => {
        if (visible) {
          form.resetFields();
        }
      };
    }, [visible]);

    const onVisible = () => setVisible(!visible);

    React.useImperativeHandle(ref, () => ({ onVisible, setEmail }), []);

    const confirmCodeRequest = useRequest(
      (code: string) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 500);
        });
      },
      {
        onSuccess: (result: boolean) => {
          if (result) {
            onSaveEmail(email);
            successRef.current?.onVisible?.();
            return onVisible();
          }

          return form.setFields([
            {
              name: 'code',
              errors: [intl.formatMessage({ id: 'settings.codeWrong' })],
            },
          ]);
        },
        manual: true,
      },
    );

    const onFinish = (values: FormValues) => {
      confirmCodeRequest.run(values.code);
    };

    return (
      <div className={styles.verify}>
        <Modal
          maskClosable={false}
          visible={visible}
          onClose={onVisible}
          className={styles.modalVerify}
          content={
            <div className={styles.content}>
              <Text
                type="title-24-bold"
                color="accent-500"
                className={styles.title}
              >
                {intl.formatMessage({ id: 'settings.verifyEmail' })}
              </Text>

              <div className={styles.description}>
                <Text type="body-14-regular" color="primary-100">
                  {intl.formatMessage(
                    { id: 'settings.verifyEmailDescription' },
                    { email },
                  )}
                </Text>
                <Text type="body-14-regular" color="primary-100">
                  {intl.formatMessage({ id: 'settings.verifyTime' })}
                </Text>
              </div>

              <Form
                form={form}
                initialValues={{ code: '' }}
                onFinish={onFinish}
              >
                <FormItem shouldUpdate>
                  {() => {
                    const isError: boolean =
                      form.getFieldError('code').length > 0;
                    return (
                      <FormItem
                        name="code"
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: intl.formatMessage({
                              id: 'settings.codeRequired',
                            }),
                          },
                        ]}
                        normalize={(value: string) => {
                          if (!value) return '';

                          const text: string = value.replace(/\s/g, '');

                          return text;
                        }}
                      >
                        <Input
                          placeholder={intl.formatMessage({
                            id: 'settings.code',
                          })}
                          className={classNames(styles.input, {
                            [styles.inputError]: isError,
                          })}
                          maxLength={6}
                        />
                      </FormItem>
                    );
                  }}
                </FormItem>

                <FormItem shouldUpdate>
                  {() => {
                    const isError: boolean =
                      form.getFieldError('code').length > 0;
                    return (
                      <Button
                        htmlType={!isError ? 'submit' : 'button'}
                        className={styles.btnConfirm}
                        loading={confirmCodeRequest.loading}
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

        <Success ref={successRef} />
      </div>
    );
  },
);

export default Verify;
