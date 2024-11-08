import { Flex } from '@/components/common';
import styles from '../../styles.module.css';
import cx from 'classnames';
import { Divider, Paper, Typography } from '@mui/material';
import React from 'react';

interface Props {
  extras?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  dividerClassName?: string;
}
const CustomerContainer = (props: Props) => {
  return (
    <Paper variant="outlined" className={props.className}>
      <Flex justify="space-between" align="center" className={props.headerClassName}>
        <Typography> Customer details</Typography>
        {props.extras}
      </Flex>
      <Divider className={cx(styles.divider, props.dividerClassName)} />
      {props.children}
    </Paper>
  );
};

export default CustomerContainer;
