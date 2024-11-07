import { Flex } from '@/components/common';
import { CustomerType } from '@/types/customer';
import { Typography } from '@mui/material';

const CustomerCredits = (props: { data?: CustomerType }) => {
  return (
    <Flex gap={'xxl'}>
      <Typography>Credits</Typography>
      <form></form>
    </Flex>
  );
};

export default CustomerCredits;
