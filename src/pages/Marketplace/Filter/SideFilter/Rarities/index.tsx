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
      <Text type="body-14-regular" color="neutral-0" className={styles.title}>
        Rarity
      </Text>
      <div className={styles.checkboxs}>
        <div className={styles.option} onClick={onValueChange('Common')}>
          <RcCheckBox
            onChange={onValueChange('Common')}
            checked={value.includes('Common')}
          >
            <div className={styles.label}>
              <Text type="body-14-regular" className={styles.txt}>
                Common
              </Text>
            </div>
          </RcCheckBox>
        </div>
        <div className={styles.option} onClick={onValueChange('Legendary')}>
          <RcCheckBox
            onChange={onValueChange('Legendary')}
            checked={value.includes('Legendary')}
          >
            <div className={styles.label}>
              <Text type="body-14-regular" className={styles.txt}>
                Legendary
              </Text>
            </div>
          </RcCheckBox>
        </div>
        <div className={styles.option} onClick={onValueChange('Uncommon')}>
          <RcCheckBox
            onChange={onValueChange('Uncommon')}
            checked={value.includes('Uncommon')}
          >
            <div className={styles.label}>
              <Text type="body-14-regular" className={styles.txt}>
                Uncommon
              </Text>
            </div>
          </RcCheckBox>
        </div>
        <div className={styles.option} onClick={onValueChange('Epic')}>
          <RcCheckBox
            onChange={onValueChange('Epic')}
            checked={value.includes('Epic')}
          >
            <div className={styles.label}>
              <Text type="body-14-regular" className={styles.txt}>
                Epic
              </Text>
            </div>
          </RcCheckBox>
        </div>
        <div className={styles.option} onClick={onValueChange('Rare')}>
          <RcCheckBox
            onChange={onValueChange('Rare')}
            checked={value.includes('Rare')}
          >
            <div className={styles.label}>
              <Text type="body-14-regular" className={styles.txt}>
                Rare
              </Text>
            </div>
          </RcCheckBox>
        </div>
      </div>
    </div>
  );
};

export default Rarities;
