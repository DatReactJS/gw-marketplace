import RcCheckBox from '@/components/Checkbox';
import Text from '@/components/Text';
import React from 'react';
import { useIntl } from 'umi';
import styles from './index.less';

interface Props {
  value?: string[];
  onChange?: Function;
}

const Classes: React.FC<Props> = ({ value = [], onChange }: Props) => {
  const intl = useIntl();

  const onValueChange = (val: string) => () => {
    if (value.includes(val)) {
      onChange && onChange(value.filter((e) => e !== val));
    } else {
      onChange && onChange([...value, val]);
    }
  };

  return (
    <div className={styles.classes}>
      <Text type="caption-12-bold" color="accent-500">
        {intl.formatMessage({ id: 'filter.class' })}
      </Text>

      <div className={styles.checkboxs}>
        <div className={styles.option} onClick={onValueChange('warrior')}>
          <RcCheckBox
            onChange={onValueChange('warrior')}
            checked={value.includes('warrior')}
          >
            <div className={styles.label}>
              <img alt="" src="/assets/images/warrior.svg" />
              <Text type="body-16-bold" className={styles.txt}>
                {intl.formatMessage({ id: 'filter.class.warrior' })}
              </Text>
            </div>
          </RcCheckBox>
        </div>
        <div className={styles.option} onClick={onValueChange('mage')}>
          <RcCheckBox
            onChange={onValueChange('mage')}
            checked={value.includes('mage')}
          >
            <div className={styles.label}>
              <img alt="" src="/assets/images/mage.svg" />
              <Text type="body-16-bold" className={styles.txt}>
                {intl.formatMessage({ id: 'filter.class.mage' })}
              </Text>
            </div>
          </RcCheckBox>
        </div>
        <div className={styles.option} onClick={onValueChange('assasin')}>
          <RcCheckBox
            onChange={onValueChange('assasin')}
            checked={value.includes('assasin')}
          >
            <div className={styles.label}>
              <img alt="" src="/assets/images/assasin.svg" />
              <Text type="body-16-bold" className={styles.txt}>
                {intl.formatMessage({ id: 'filter.class.assasin' })}
              </Text>
            </div>
          </RcCheckBox>
        </div>
      </div>
    </div>
  );
};

export default Classes;
