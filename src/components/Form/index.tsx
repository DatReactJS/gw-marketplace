import classNames from 'classnames';
import { Field } from 'rc-field-form';
import React from 'react';
import Text from '../Text';
import styles from './index.less';

interface Props {
  children: any;
  name?: string;
  hideError?: boolean;
  className?: string;
  [k: string]: any;
}

const FormItem: React.FC<Props> = ({
  children,
  hideError = false,
  className,
  ...props
}: Props) => {
  return (
    <Field {...props}>
      {({ onChange, value }, meta, context) => {
        const { errors } = meta;

        const hasError: string = errors && errors[0];

        return (
          <div className={classNames(styles.formItemContainer, className)}>
            <div>
              {typeof children === 'function'
                ? children({ onChange, value, meta, hasError }, context)
                : React.cloneElement(children, {
                    onChange,
                    value,
                    ...children.props,
                  })}
            </div>

            {!hideError && hasError && (
              <Text
                type="body-14-regular"
                color="warning"
                className={styles.txtError}
              >
                {hasError}
              </Text>
            )}
          </div>
        );
      }}
    </Field>
  );
};

export default FormItem;
