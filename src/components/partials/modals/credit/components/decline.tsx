import { Flex, FormItem } from '@/components/common';
import { TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import useCreditCreator from '../utils/useCreator';
import { useCreditDataContext } from '../context/data';

const CreditDecline = () => {
  // Store
  const { data } = useCreditDataContext();

  // Hooks
  const { create } = useCreditCreator();
  const { control, handleSubmit } = useForm();

  // Functions
  const onSubmit = (event: any) => create(event?.decline);

  return (
    <form id="form" onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap={'xl'}>
        <Typography>Decline Credit</Typography>
        <FormItem {...{ control, name: 'decline', rules: { required: 'This field is required' } }}>
          <TextField label="Reason" multiline rows={6} />
        </FormItem>
      </Flex>
    </form>
  );
};

export default CreditDecline;
