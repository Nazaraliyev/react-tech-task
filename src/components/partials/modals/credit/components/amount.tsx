import { FormItem } from '@/components/common';
import { Grid2, MenuItem, Select, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useCreditDataContext } from '../context/data';
import React from 'react';

const CreditAmount = () => {
  // Store
  const { data, onChange } = useCreditDataContext();

  // Hooks
  const { control, reset, handleSubmit } = useForm({ defaultValues: generateAmountValue(data?.amount) });

  // Effects
  React.useEffect(() => { reset(generateAmountValue(data?.amount)) }, [data?.amount]);

  // Functions
  const onSubmit = (event: any) => onChange('amount', event, true);

  return (
    <form id="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container spacing={2}>
        {creditFields.map((item) => (
          <Grid2 size={6} key={item.name}>
            <FormItem key={item.name} control={control} name={item.name}>
              {item.component === 'input' ? (
                <TextField size="small" label={item.label} />
              ) : item.component === 'number' ? (
                <TextField size="small" label={item.label} type='number' InputProps={{ inputProps: { min: 0 } }} />
              ) : (
                <Select size="small" label={item.label}>
                  {item.options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormItem>
          </Grid2>
        ))}
      </Grid2>
    </form>
  );
};

export default CreditAmount;

const generateAmountValue = (data: any) => creditFields.reduce((acc, curr) => ({ ...acc, [curr?.name]: data?.[curr.name] || "" }), {});

const creditFields = [
  {
    name: 'currency',
    label: 'Currency',
    component: 'select',
    options: [
      {
        label: 'USD',
        value: 'usd',
      },
      {
        label: 'EUR',
        value: 'eur',
      },
      {
        label: 'AZN',
        value: 'azn',
      },
    ],
  },
  {
    name: 'goal',
    label: 'Business goal',
    component: 'input',
  },
  {
    name: 'amount',
    label: 'Amount',
    component: 'number',
  },
  {
    name: 'duration',
    label: 'Duration',
    component: 'number',
  },
  {
    name: 'interest',
    label: 'Interest',
    component: 'number',
  },
];
