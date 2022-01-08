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

const Stat: React.FC<Props> = ({ value, onChange }: Props) => {
  const intl = useIntl();

  const onValueChange = (val: number) => {
    if (isNumber(value) && val === +value) {
      return onChange?.(undefined);
    }

    onChange?.(val);
  };

  return (
    <div className={styles.stat}>
      <Text type="caption-12-bold" color="accent-500">
        {intl.formatMessage({ id: 'filter.stat' })}
      </Text>

      <div className={styles.checkboxs}>
        {new Array(2).fill(undefined).map((_, index: number) => (
          <div className={styles.option} key={`radio-${index}`}>
            <Radio
              checked={!value && !isNumber(value) ? false : +value === index}
              onChange={() => onValueChange(index)}
            >
              <div className={styles.label}>
                <img alt="" src="/assets/images/token.svg" />
                <Text type="body-16-bold" className={styles.txt}>
                  {intl.formatMessage(
                    { id: 'filter.stat.amount' },
                    { amount: index + 1 },
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

export default Stat;
