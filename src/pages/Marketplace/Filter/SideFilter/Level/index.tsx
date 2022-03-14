import Text from '@/components/Text';
import React, { useState } from 'react';
import styles from './index.less';
import { Range } from 'rc-slider';
import { isEqual } from 'lodash';
import { usePrevious, useUpdateEffect } from '@umijs/hooks';
import RCSelect from '@/components/Select';

interface Props {
  value?: number[];
  onChange?: Function;
}

const Level: React.FC<Props> = ({ value = [1, 10], onChange }: Props) => {
  const [innerValue, setInnerValue] = useState(value);
  interface TabItem {
    label: string;
    value: number;
  }
  const prevValue: number[] | undefined = usePrevious(value);
  const optionsSelect: TabItem[] = [
    {
      label: '1',
      value: 1,
    },
    {
      label: '2',
      value: 2,
    },
    {
      label: '3',
      value: 3,
    },
    {
      label: '4',
      value: 4,
    },
    {
      label: '5',
      value: 5,
    },
    {
      label: '6',
      value: 6,
    },
    {
      label: '7',
      value: 7,
    },
    {
      label: '8',
      value: 8,
    },
    {
      label: '9',
      value: 9,
    },
    {
      label: '10',
      value: 10,
    },
  ];

  useUpdateEffect(() => {
    if (!isEqual(prevValue, value)) {
      setInnerValue(value);
    }
  }, [value]);

  return (
    <div className={styles.container}>
      <Text type="body-14-regular" color="neutral-0" className={styles.title}>
        Level
      </Text>

      <div className={styles.Level}>
        <RCSelect
          options={optionsSelect}
          className={styles.select}
          placeholder="Level"
          iconLabel={
            <img alt="arrow" src="/assets/images/marketplace/ic-level.png" />
          }
        />
      </div>
      <div className={styles.wrapRange}>
        <Range
          className={styles.slider}
          value={innerValue}
          min={1}
          max={10}
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

export default Level;
