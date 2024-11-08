import React from 'react';
import styles from '../styles.module.css';
import { CustomButton, Flex } from '@/components/common';
import { Grid2, MenuItem, Select, Switch, Typography } from '@mui/material';
import { IoAdd } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Empty from '@/components/common/empty';
import { useForm } from 'react-hook-form';
import { useCreditDataContext } from '../context/data';

interface OptionType {
  label: string;
  value: string;
}
const CreditGuarantor = () => {
  // Store
  const { customers } = useSelector((state: RootState) => state.customer) || {};
  const { onChange, data, onNext } = useCreditDataContext();

  // States
  const [close, setClose] = React.useState(!data.guarantors.length);
  const [selected, setSelected] = React.useState<{ label: string; value: string }[]>([]);
  const [value, setValue] = React.useState<string>('');

  // Memos
  const customerMemo = React.useMemo(() =>customers.map((item) => ({ label: `${item.firstName} ${item.lastName}, ${item.fatherName} (${item.fin})`, value: item.fin })), [customers]); // prettier-ignore

  // Hooks
  const { handleSubmit } = useForm();

  // Effects
  React.useEffect(()=>{ !!data.guarantors.length && setSelected(customerMemo.filter((item) => data.guarantors.includes(item.value)))}, [data.guarantors, customerMemo]) // prettier-ignore

  // Functions
  const onChangeSelect = (event: any) => setValue(event.target.value);
  const onChangeSwitch = () => setClose(!close);
  const onRemove = (fin: string) => setSelected(selected.filter((item) => item.value !== fin));
  const onAdd = () => {
    setValue('');
    setSelected([...selected, customerMemo.find((item) => item.value === value)!]);
  };
  const onSubmit = () => {
    onChange('guarantors', selected.map(item => item.value));
    onNext();
  }

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <Flex gap={'m'} align="center">
            <Typography>Non Guarantor</Typography>
            <Switch checked={close} onChange={onChangeSwitch} />
          </Flex>
        </Grid2>
        {!close && (
          <Grid2 size={6}>
            <Flex gap={'xxl'} direction="column">
              <Input {...{ menu: customerMemo, selected, value, onChange: onChangeSelect, onAdd }} />
              <List {...{ selected, onRemove }} />
            </Flex>
          </Grid2>
        )}
      </Grid2>
      <form id="form" onSubmit={handleSubmit(onSubmit)} />
    </>
  );
};

export default CreditGuarantor;

const Input = (props: { menu: OptionType[]; selected: OptionType[]; value?: string; onChange: (value: any) => void; onAdd: () => void }) => {
  // Memos
  const filteredMemo = React.useMemo(() => props.menu.filter((i) => !props.selected.some((j) => i.value === j.value)), [props.menu, props.selected]); // prettier-ignore

  return (
    <Flex gap={'m'}>
      <Select value={props.value} onChange={props.onChange} size="small" label="Customers" className={styles.select}>
        {filteredMemo.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <CustomButton startIcon={<IoAdd />} size="small" className={styles.add_button} onClick={props.onAdd} disabled={!props.value}>
        Add
      </CustomButton>
    </Flex>
  );
};
const List = (props: { selected: OptionType[]; onRemove: (value: string) => void }) => {
  return !props.selected.length ? (
    <Empty />
  ) : (
    <Flex direction="column" gap={'m'}>
      {props.selected.map((item, index) => (
        <Flex gap={'m'} align="center" key={item.value}>
          <Typography>{`${index + 1}.`}</Typography>
          <Typography className={styles.customer_name}>{item.label}</Typography>
          <CustomButton color="error" size="small" onClick={() => props.onRemove(item.value)} className={styles.remove_button}>
            Remove
          </CustomButton>
        </Flex>
      ))}
    </Flex>
  );
};
