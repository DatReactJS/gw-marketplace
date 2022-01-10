import Button from '@/components/Button';
import FormItem from '@/components/Form';
import Input from '@/components/Input';
import Text from '@/components/Text';
import classNames from 'classnames';
import { trim } from 'lodash';
import Form from 'rc-field-form';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {}

interface FormValues {
  name: string;
}

const Name: React.FC<Props> = (props: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();

  const initName: string = 'David';

  const onFinish = ({ name }: FormValues) => {
    console.log('🚀 ~ name', name);
  };

  return (
    <Form
      className={styles.name}
      form={form}
      initialValues={{ name: initName }}
      onFinish={onFinish}
    >
      <Text type="body-14-semi-bold">
        {intl.formatMessage({ id: 'settings.name' })}
      </Text>

      <div className={styles.wrapperInput}>
        <FormItem shouldUpdate>
          {() => {
            const isError: boolean = form.getFieldError('name').length > 0;
            const name: string = form.getFieldValue('name');
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

        <FormItem
          shouldUpdate={(p: FormValues, n: FormValues) => p.name !== n.name}
        >
          {() => {
            const trimName: string = trim(form.getFieldValue('name'));
            const isDisabled: boolean = !trimName || trimName === initName;
            return (
              <Button
                htmlType="submit"
                className={styles.btnSaveChange}
                disabled={isDisabled}
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
