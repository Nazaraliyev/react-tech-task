import styles from '../styles.module.css';
import { Flex } from '@/components/common';
import { CustomerType } from '@/types/customer';
import { Paper, Typography } from '@mui/material';

const CustomerCredits = (props: { data?: CustomerType }) => {
  return (
    <Paper variant="outlined" className={styles.container}>
    </Paper>
  );
};

export default CustomerCredits;
