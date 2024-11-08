import { FormItem } from '@/components/common';
import { customerJobFields } from '@/utils/constants/customer';
import { Grid2, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useCreditDataContext } from '../context/data';
import React from 'react';

const CreditExperience = () => {
  // Store
  const { data, onNext } = useCreditDataContext();

  // Hooks
  const { control, reset, handleSubmit } = useForm({ defaultValues: generateExperienceValue(data.experience) });

  // Effects
  React.useEffect(() => {
    reset(generateExperienceValue(data.experience));
  }, [data.experience]);

  // Functions
  const onSubmit = (event: any) => {
    onNext();
  };

  return (
    <form id="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container spacing={2}>
        {customerJobFields.map((item) => (
          <Grid2 size={6} key={item.name}>
            <FormItem key={item.name} control={control} name={item.name}>
              {item.component === 'input' ? (
                <TextField size="small" label={item.label} />
              ) : (
                <TextField size="small" label={item.label} type="number" InputProps={{ inputProps: { min: 0 } }} />
              )}
            </FormItem>
          </Grid2>
        ))}
      </Grid2>
    </form>
  );
};

export default CreditExperience;

const generateExperienceValue = (data: any) => customerJobFields.reduce((acc, curr) => ({ ...acc, [curr?.name]: data?.[curr.name] }), {});
