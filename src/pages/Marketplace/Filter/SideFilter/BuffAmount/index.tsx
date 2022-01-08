import Radio from '@/components/Radio';
import Text from '@/components/Text';
import { isNumber } from 'lodash';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {
  value?: string;
  onChange?: Function;
}

const BuffAmount: React.FC<Props> = ({ value, onChange }: Props) => {
  const intl = useIntl();

  const onValueChange = (val: number) => {
    if (isNumber(value) && val === +value) {
      return onChange?.(undefined);
    }

    onChange?.(val);
  };

  return (
    <div className={styles.buffAmount}>
      <Text type="caption-12-bold" color="accent-500">
        {intl.formatMessage({ id: 'filter.buffAmount' })}
      </Text>

      <div className={styles.checkboxs}>
        {new Array(4).fill(undefined).map((_, index: number) => (
          <div className={styles.option} key={`radio-${index}`}>
            <Radio
              checked={!value && !isNumber(value) ? false : +value === index}
              onChange={() => onValueChange(index)}
            >
              <div className={styles.label}>
                <img alt="" src="/assets/images/token.svg" />
                <Text type="body-16-bold" className={styles.txt}>
                  {intl.formatMessage(
                    { id: `filter.buffAmount.buff${index > 1 ? 's' : ''}` },
                    { amount: index },
                  )}
                </Text>
              </div>
            </Radio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuffAmount;
