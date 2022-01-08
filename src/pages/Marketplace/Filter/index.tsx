import Form from 'rc-field-form';
import React from 'react';
import styles from './index.less';
import SideFilter from './SideFilter';
import HeadFilter from './HeadFilter';
import { history, useLocation } from 'umi';
import { useMount } from '@umijs/hooks';

interface Props {
  children: React.ReactNode;
  onChange: (values: Record<string, any>) => void;
}

interface Ref {
  ref?: React.Ref<any>;
}

const Filters: React.FC<Props & Ref> = React.forwardRef(
  (props: Props, ref: Ref['ref']) => {
    const { children, onChange } = props;
    const [form] = Form.useForm();
    const location: any = useLocation();

    const getInitialValues = (values: Record<string, any>) => {
      const newValues = {
        ...values,
      };

      if (typeof values?.rarities === 'string') {
        newValues.rarities = [values.rarities];
      }

      return newValues;
    };

    useMount(() => {
      const currentQuery: Record<string, any> = location.query;

      if (JSON.stringify(currentQuery) !== '{}') {
        const newValues = getInitialValues(currentQuery);

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

    const onResetFilter = () => {
      // const currentQuery: Record<string, string> = location.query;
      // const sort: SorterValues = form.getFieldValue('sort');
      // const newQuery: { sort?: SorterValues; page?: string } = {};
      // delete currentQuery?.sort;
      // delete currentQuery?.page;
      // if (Object.keys(currentQuery).length === 0) return;
      // form.resetFields();
      // if (sort !== SorterValues.LOWEST_ID) {
      //   form.setFieldsValue({ sort });
      //   newQuery.sort = sort;
      // }
      // if (location.query?.page) {
      //   newQuery.page = location.query.page;
      // }
      // history.push({ query: newQuery });
      // form.submit();
    };

    const getValuesFilters = (values: Record<string, any>) => {
      if (!values) return {};

      // if (values?.sort === SorterValues.LOWEST_ID) {
      //   delete values.sort;
      // }

      const newValues = Object.keys(values).reduce((acc, key) => {
        if (values[key]) {
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
      onChange(newValues);
    };

    return (
      <Form
        form={form}
        className={styles.filter}
        onFieldsChange={onFieldsChange}
        // initialValues={{
        //   sort: SorterValues.LOWEST_ID,
        // }}
      >
        <SideFilter
        // onReset={onResetFilter}
        />

        <div className={styles.content}>
          <HeadFilter />
          {children}
        </div>
      </Form>
    );
  },
);

export default Filters;
