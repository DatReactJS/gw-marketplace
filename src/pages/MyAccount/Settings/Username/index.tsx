import Button from '@/components/Button';
import FormItem from '@/components/Form';
import Input from '@/components/Input';
import Text from '@/components/Text';
import { api, API_PATHS, privateRequest } from '@/utils/apis';
import { isValidUsername } from '@/utils/common';
import { useRequest } from '@umijs/hooks';
import classNames from 'classnames';
import { trim } from 'lodash';
import Form from 'rc-field-form';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {
  username: string;
}

interface FormValues {
  username: string;
}

const Username: React.FC<Props> = (props: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const checkUsernameRequest = useRequest(
    async (username: string) => {
      const check = await privateRequest(api.post, API_PATHS.CHECK_USERNAME, {
        data: { username },
      });

      return check;
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
      },
      manual: true,
      debounceInterval: 300,
    },
  );

  const onValuesChange = (values: FormValues) => {
    const username: string = trim(values.username);

    if (isValidUsername(username)) {
      checkUsernameRequest.run(username);
    }
  };

  const onFinish = (values: FormValues) => {};

  return (
    <Form
      className={styles.username}
      form={form}
      initialValues={{ username: props.username }}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
    >
      <Text type="body-14-semi-bold">
        {intl.formatMessage({ id: 'settings.username' })}
      </Text>

      <div className={styles.wrapperInput}>
        <FormItem shouldUpdate>
          {() => {
            const isError: boolean = form.getFieldError('username').length > 0;
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
                          intl.formatMessage({ id: 'settings.usernameMin' }),
                        );
                      }

                      const checkUsername: boolean = isValidUsername(username);

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
                  disabled={!!props.username}
                  placeholder={intl.formatMessage({ id: 'settings.username' })}
                  className={classNames(styles.input, {
                    [styles.inputError]: isError,
                    [styles.inputInit]: true,
                  })}
                />
              </FormItem>
            );
          }}
        </FormItem>

        {!props.username && (
          <FormItem shouldUpdate>
            {() => {
              const username: string = trim(form.getFieldValue('username'));
              const isError: boolean =
                form.getFieldError('username').length > 0;
              const isDisabled: boolean = isError || username.length < 6;
              return (
                <Button
                  htmlType="submit"
                  className={styles.btnSaveChange}
                  disabled={isDisabled}
                  loading={checkUsernameRequest.loading}
                >
                  {intl.formatMessage({ id: 'settings.saveChange' })}
                </Button>
              );
            }}
          </FormItem>
        )}
      </div>
    </Form>
  );
};

export default Username;
