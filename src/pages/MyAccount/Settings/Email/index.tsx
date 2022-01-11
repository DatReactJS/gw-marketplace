import Button from '@/components/Button';
import FormItem from '@/components/Form';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Text from '@/components/Text';
import { isEmail } from '@/utils/common';
import classNames from 'classnames';
import Form from 'rc-field-form';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {
  email: string;
}

interface FormValues {
  email: string;
}

const Email: React.FC<Props> = (props: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();

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

  const onFinish = (values: FormValues) => {
    onVisible();
    setEmail(values.email);
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

              <Button htmlType="submit" className={styles.btnConfirm}>
                {intl.formatMessage({ id: 'common.confirm' })}
              </Button>
            </Form>
          </div>
        }
      />
    </div>
  );
};

export default Email;
