import Form from 'rc-field-form';
import React from 'react';
import styles from './index.less';
import SideFilter from './SideFilter';
import HeadFilter from './HeadFilter';
import { history, useLocation } from 'umi';
import { useMount } from '@umijs/hooks';
import { TabsEnum } from '@/components/Tabs';
import { isNumber } from 'lodash';
import { SorterValues } from './HeadFilter/Sorter';
import { TypeValues } from './HeadFilter/Type';

interface Props {
  children: React.ReactNode;
  onChange: (values: Record<string, any>) => void;
  tab: TabsEnum;
}

interface Ref {
  ref?: React.Ref<any>;
}

const Filters: React.FC<Props & Ref> = React.forwardRef(
  (props: Props, ref: Ref['ref']) => {
    const { children, onChange, tab } = props;
    const [form] = Form.useForm();
    const location: any = useLocation();

    const [numberFilter, setNumberFilter] = React.useState<number>(0);

    const getInitialValues = (values: Record<string, any>) => {
      const newValues = {
        ...values,
      };

      delete newValues?.tab;

      if (typeof values?.rarities === 'string') {
        newValues.rarities = [values.rarities];
      }

      if (typeof values?.classes === 'string') {
        newValues.classes = [values.classes];
      }

      if (values?.vit) {
        newValues.vit = values.vit.map((vit: string) => +vit);
      }

      if (values?.str) {
        newValues.str = values.str.map((str: string) => +str);
      }

      if (values?.agi) {
        newValues.agi = values.agi.map((agi: string) => +agi);
      }

      if (values?.int) {
        newValues.int = values.int.map((int: string) => +int);
      }

      if (values?.spd) {
        newValues.spd = values.spd.map((spd: string) => +spd);
      }

      if (values?.hp) {
        newValues.hp = values.hp.map((hp: string) => +hp);
      }

      if (values?.atk) {
        newValues.atk = values.atk.map((atk: string) => +atk);
      }

      if (values?.def) {
        newValues.def = values.def.map((def: string) => +def);
      }

      return newValues;
    };

    useMount(() => {
      const currentQuery: Record<string, any> = location.query;

      if (JSON.stringify(currentQuery) !== '{}') {
        const newValues = getInitialValues(currentQuery);
        getNumberFilter(newValues);
        form.setFieldsValue(newValues);
      }
    });

    React.useImperativeHandle(
      ref,
      () => ({
        onResetFilter,
      }),
      [],
    );

    const onResetFilter = (nextTab?: TabsEnum) => {
      const currentQuery: Record<string, string> = location.query;

      const sort: SorterValues = form.getFieldValue('sort');
      const type: TypeValues = form.getFieldValue('type');
      const newQuery: {
        sort?: SorterValues;
        type?: TypeValues;
        page?: string;
        tab: TabsEnum;
      } = {
        tab: nextTab || tab,
      };

      delete currentQuery?.sort;
      delete currentQuery?.type;
      delete currentQuery?.page;

      if (Object.keys(currentQuery).length === 1 && !nextTab) return;

      form.resetFields();

      if (sort !== SorterValues.HIGHEST_ID) {
        form.setFieldsValue({ sort });
        newQuery.sort = sort;
      }

      if (type !== TypeValues.FOR_SALE) {
        form.setFieldsValue({ type });
        newQuery.type = type;
      }

      if (location.query?.page) {
        newQuery.page = location.query.page;
      }

      history.push({ query: newQuery });
      form.submit();
    };

    const getValuesFilters = (values: Record<string, any>) => {
      if (!values) return {};

      if (values?.sort === SorterValues.HIGHEST_ID) {
        delete values.sort;
      }

      if (values?.type === TypeValues.FOR_SALE) {
        delete values.type;
      }

      if (
        Array.isArray(values?.vit) &&
        values.vit[0] === 100 &&
        values.vit[1] === 1000
      ) {
        delete values.vit;
      }

      if (
        Array.isArray(values?.str) &&
        values.str[0] === 100 &&
        values.str[1] === 1000
      ) {
        delete values.str;
      }

      if (
        Array.isArray(values?.agi) &&
        values.agi[0] === 100 &&
        values.agi[1] === 1000
      ) {
        delete values.agi;
      }

      if (
        Array.isArray(values?.int) &&
        values.int[0] === 100 &&
        values.int[1] === 1000
      ) {
        delete values.int;
      }

      if (
        Array.isArray(values?.spd) &&
        values.spd[0] === 100 &&
        values.spd[1] === 1000
      ) {
        delete values.spd;
      }

      if (
        Array.isArray(values?.hp) &&
        values.hp[0] === 100 &&
        values.hp[1] === 1000
      ) {
        delete values.hp;
      }

      if (
        Array.isArray(values?.def) &&
        values.def[0] === 100 &&
        values.def[1] === 1000
      ) {
        delete values.def;
      }

      if (
        Array.isArray(values?.atk) &&
        values.atk[0] === 100 &&
        values.atk[1] === 1000
      ) {
        delete values.atk;
      }

      const newValues = Object.keys(values).reduce((acc, key) => {
        if (values[key] || +values[key] === 0) {
          return {
            ...acc,
            [key]: values[key],
          };
        }
        return acc;
      }, {});

      return newValues;
    };

    const onFieldsChange = () => {
      const values = form.getFieldsValue();
      const newValues: Record<string, any> = getValuesFilters(values);
      getNumberFilter(newValues);
      onChange(newValues);
    };

    const getNumberFilter = (values: Record<string, any>) => {
      let count: number = 0;

      if (values?.rarities?.length > 0) {
        count = values.rarities.length;
      }

      if (tab === TabsEnum.CHARACTER) {
        if (values?.classes?.length > 0) {
          count += values.classes.length;
        }

        if (
          (values?.vit?.[0] && +values.vit[0] > 100) ||
          (values?.vit?.[1] && +values.vit[1] < 1000)
        ) {
          count += 1;
        }

        if (
          (values?.str?.[0] && +values.str[0] > 100) ||
          (values?.str?.[1] && +values.str[1] < 1000)
        ) {
          count += 1;
        }

        if (
          (values?.agi?.[0] && +values.agi[0] > 100) ||
          (values?.agi?.[1] && +values.agi[1] < 1000)
        ) {
          count += 1;
        }

        if (
          (values?.int?.[0] && +values.int[0] > 100) ||
          (values?.int?.[1] && +values.int[1] < 1000)
        ) {
          count += 1;
        }

        if (
          (values?.spd?.[0] && +values.spd[0] > 100) ||
          (values?.spd?.[1] && +values.spd[1] < 1000)
        ) {
          count += 1;
        }
      }

      if (tab === TabsEnum.SHIP) {
        if (
          values?.buffAmount ||
          (+values?.buffAmount === 0 && isNumber(+values.buffAmount))
        ) {
          count += 1;
        }
      }

      if (tab === TabsEnum.ACCESORY) {
        if (values?.stat || (+values?.stat === 0 && isNumber(+values.stat))) {
          count += 1;
        }

        if (
          (values?.hp?.[0] && +values.hp[0] > 100) ||
          (values?.hp?.[1] && +values.hp[1] < 1000)
        ) {
          count += 1;
        }
        if (
          (values?.atk?.[0] && +values.atk[0] > 100) ||
          (values?.atk?.[1] && +values.atk[1] < 1000)
        ) {
          count += 1;
        }
        if (
          (values?.def?.[0] && +values.def[0] > 100) ||
          (values?.def?.[1] && +values.def[1] < 1000)
        ) {
          count += 1;
        }
        if (
          (values?.spd?.[0] && +values.spd[0] > 100) ||
          (values?.spd?.[1] && +values.spd[1] < 1000)
        ) {
          count += 1;
        }
      }

      setNumberFilter(count);
    };

    return (
      <Form
        form={form}
        className={styles.filter}
        onFieldsChange={onFieldsChange}
        initialValues={
          {
            // sort: SorterValues.HIGHEST_ID,
            // type: TypeValues.FOR_SALE,
          }
        }
      >
        <SideFilter onClear={onResetFilter} total={numberFilter} tab={tab} />

        <div className={styles.content}>
          <HeadFilter total={1208} />
          {children}
        </div>
      </Form>
    );
  },
);

export default Filters;
