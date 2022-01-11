import RcCheckBox from '@/components/Checkbox';
import Text from '@/components/Text';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {
  value?: string[];
  onChange?: Function;
}

const Rarities: React.FC<Props> = ({ value = [], onChange }: Props) => {
  const intl = useIntl();

  const onValueChange = (val: string) => () => {
    if (value.includes(val)) {
      onChange && onChange(value.filter((e) => e !== val));
    } else {
      onChange && onChange([...value, val]);
    }
  };

  return (
    <div className={styles.rarities}>
      <Text type="caption-12-bold" color="accent-500">
        {intl.formatMessage({ id: 'filter.rarity' })}
      </Text>

      <div className={styles.checkboxs}>
        <div className={styles.option} onClick={onValueChange('legendary')}>
          <RcCheckBox
            onChange={onValueChange('legendary')}
            checked={value.includes('legendary')}
          >
            <div className={styles.label}>
              <img alt="" src="/assets/images/Legend.png" />
              <Text type="body-16-bold" className={styles.txt}>
                {intl.formatMessage({ id: 'filter.rarity.legendary' })}
              </Text>
            </div>
          </RcCheckBox>
        </div>
        <div className={styles.option} onClick={onValueChange('epic')}>
          <RcCheckBox
            onChange={onValueChange('epic')}
            checked={value.includes('epic')}
          >
            <div className={styles.label}>
              <img alt="" src="/assets/images/Epic.png" />
              <Text type="body-16-bold" className={styles.txt}>
                {intl.formatMessage({ id: 'filter.rarity.epic' })}
              </Text>
            </div>
          </RcCheckBox>
        </div>
        <div className={styles.option} onClick={onValueChange('rare')}>
          <RcCheckBox
            onChange={onValueChange('rare')}
            checked={value.includes('rare')}
          >
            <div className={styles.label}>
              <img alt="" src="/assets/images/Rare.png" />
              <Text type="body-16-bold" className={styles.txt}>
                {intl.formatMessage({ id: 'filter.rarity.rare' })}
              </Text>
            </div>
          </RcCheckBox>
        </div>
        <div className={styles.option} onClick={onValueChange('common')}>
          <RcCheckBox
            onChange={onValueChange('common')}
            checked={value.includes('common')}
          >
            <div className={styles.label}>
              <img alt="" src="/assets/images/Common.png" />
              <Text type="body-16-bold" className={styles.txt}>
                {intl.formatMessage({ id: 'filter.rarity.common' })}
              </Text>
            </div>
          </RcCheckBox>
        </div>
      </div>
    </div>
  );
};

export default Rarities;
