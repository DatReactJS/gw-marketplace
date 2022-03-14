import Text from '@/components/Text';
import React, { useState } from 'react';
import styles from './index.less';
import { Range } from 'rc-slider';
import { isEqual } from 'lodash';
import { usePrevious, useUpdateEffect } from '@umijs/hooks';

interface Props {
  value?: number[];
  onChange?: Function;
}

const Intelligence: React.FC<Props> = ({
  value = [100, 1000],
  onChange,
}: Props) => {
  const [innerValue, setInnerValue] = useState(value);

  const prevValue: number[] | undefined = usePrevious(value);

  useUpdateEffect(() => {
    if (!isEqual(prevValue, value)) {
      setInnerValue(value);
    }
  }, [value]);

  return (
    <div className={styles.container}>
      <Text type="caption-12-bold" color="primary-100">
        INT
      </Text>

      <div className={styles.wrapRange}>
        <Range
          className={styles.slider}
          value={innerValue}
          min={100}
          max={1000}
          onChange={(values: any) => {
            setInnerValue(values);
          }}
          onAfterChange={(values) => {
            if (onChange) {
              onChange(values);
            }
          }}
        />
      </div>

      <div className={styles.valueContainer}>
        <div className={styles.valueSwitchMin}>
          <Text type="caption-12-semi-bold">{innerValue[0]}</Text>
        </div>
        <div className={styles.valueSwitchMax}>
          <Text type="caption-12-semi-bold">{innerValue[1]}</Text>
        </div>
      </div>
    </div>
  );
};

export default Intelligence;
