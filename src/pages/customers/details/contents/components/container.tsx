import { Flex } from '@/components/common';
import styles from '../../styles.module.css';
import { Divider, Paper, Typography } from '@mui/material';
import React from 'react';

interface Props {
  extras?: React.ReactNode;
  title: string;
  children: React.ReactNode;
}
const CustomerContainer = (props: Props) => {
  return (
    <Paper variant="outlined" className={styles.container}>
      <Flex justify="space-between" align="center">
        <Typography> Customer details</Typography>
        {props.extras}
      </Flex>
      <Divider className={styles.divider} />
      {props.children}
    </Paper>
  );
};

export default CustomerContainer;
