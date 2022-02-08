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

const Vitality: React.FC<Props> = ({
  value = [100, 1000],
  onChange,
}: Props) => {
  const [innerValue, setInnerValue] = useState(value);
  const leftPosion = {
    left: `calc(100% / 1000 * ${innerValue[0] - 50}`,
    transform: 'translateX(-50%)',
  };
  const rightPosion = {
    left: `calc(100% / 1000 * ${innerValue[1] - 70}`,
    transform: 'translateX(-50%)',
  };

  const prevValue: number[] | undefined = usePrevious(value);

  useUpdateEffect(() => {
    if (!isEqual(prevValue, value)) {
      setInnerValue(value);
    }
  }, [value]);

  return (
    <div className={styles.container}>
      <Text type="caption-12-bold" color="primary-100">
        VIT
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
        <div className={styles.valueSwitchMin} style={leftPosion}>
          <Text type="caption-12-semi-bold">{innerValue[0]}</Text>
        </div>
        <div className={styles.valueSwitchMax} style={rightPosion}>
          <Text type="caption-12-semi-bold">{innerValue[1]}</Text>
        </div>
      </div>
    </div>
  );
};

export default Vitality;
