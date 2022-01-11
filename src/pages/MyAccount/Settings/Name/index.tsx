import Button from '@/components/Button';
import FormItem from '@/components/Form';
import Input from '@/components/Input';
import Text from '@/components/Text';
import { useRequest } from '@umijs/hooks';
import classNames from 'classnames';
import { trim } from 'lodash';
import Form from 'rc-field-form';
import React from 'react';
import { toast } from 'react-toastify';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {
  name: string;
}

interface FormValues {
  name: string;
}

const Name: React.FC<Props> = (props: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const [initName, setInitName] = React.useState<string>(props.name);

  const checkUsernameRequest = useRequest(
    (name: string) => {
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
              name: 'name',
              errors: [intl.formatMessage({ id: 'settings.nameExist' })],
            },
          ]);
        }
      },
      manual: true,
      debounceInterval: 300,
    },
  );

  const updateNameRequest = useRequest(
    (name: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(name);
        }, 500);
      });
    },
    {
      manual: true,
      onSuccess: (result: string) => {
        setInitName(result);
        toast.success(intl.formatMessage({ id: 'common.success' }));
      },
    },
  );

  const onValuesChange = (values: FormValues) => {
    const name: string = trim(values.name);

    if (name && name !== initName) {
      checkUsernameRequest.run(name);
    }
  };

  const onFinish = (values: FormValues) => {
    const name: string = trim(values.name);

    if (name && name !== initName) {
      updateNameRequest.run(name);
    }
  };

  return (
    <Form
      className={styles.name}
      form={form}
      initialValues={{ name: initName }}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
    >
      <Text type="body-14-semi-bold">
        {intl.formatMessage({ id: 'settings.name' })}
      </Text>

      <div className={styles.wrapperInput}>
        <FormItem shouldUpdate>
          {() => {
            const isError: boolean = form.getFieldError('name').length > 0;
            const name: string = trim(form.getFieldValue('name'));
            return (
              <FormItem
                name="name"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: intl.formatMessage({
                      id: 'settings.nameRequired',
                    }),
                  },
                ]}
              >
                <Input
                  maxLength={256}
                  placeholder={intl.formatMessage({ id: 'settings.name' })}
                  className={classNames(styles.input, {
                    [styles.inputError]: isError,
                    [styles.inputInit]: name === initName,
                  })}
                />
              </FormItem>
            );
          }}
        </FormItem>

        <FormItem shouldUpdate>
          {() => {
            const trimName: string = trim(form.getFieldValue('name'));
            const isError: boolean = form.getFieldError('name').length > 0;
            const isDisabled: boolean =
              isError || !trimName || trimName === initName;
            return (
              <Button
                htmlType="submit"
                className={styles.btnSaveChange}
                disabled={isDisabled}
                loading={
                  updateNameRequest.loading || checkUsernameRequest.loading
                }
              >
                {intl.formatMessage({ id: 'settings.saveChange' })}
              </Button>
            );
          }}
        </FormItem>
      </div>
    </Form>
  );
};

export default Name;
