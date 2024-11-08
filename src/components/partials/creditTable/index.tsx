import React from 'react';
import styles from './styles.module.css';
import { Flex, CustomTable } from '@/components/common';
import { Divider, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

interface Props {
  data: any[];
  header?: boolean;
  interest?: number;
  duration?: number;
  total?: number;
  currency?: string;
}
const creditTable = ({ header = true, ...props }: Props) => {
  // Memos
  const { table, total } = React.useMemo(() => {
    let total = 0;
    const table = props.data?.map((item, index) => {
      total += +item.amount;
      return { ...item, id: index, index: index + 1 };
    });
    return { table, total };
  }, [props.data]);

  return (
    <Flex direction="column" gap="xxl">
      {header && (
        <Flex justify="flex-end" gap={'xl'}>
          <Typography>Duration: {props.duration}</Typography>
          <Divider orientation="vertical" />
          <Typography>Interest: {props.interest}%</Typography>
          <Divider orientation="vertical" />
          <Typography>Total: {total?.toFixed(2) + ' ' + props?.currency?.toUpperCase()}</Typography>
        </Flex>
      )}
      <CustomTable data={table} columns={columns} className={styles.table} hideFooter disableColumnSorting disableColumnFilter disableColumnMenu />
    </Flex>
  );
};

export default creditTable;

const columns: GridColDef[] = [
  { field: 'index', headerName: '#', width: 10, headerAlign: 'center', align: 'center' },
  { field: 'month', headerName: 'Month', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'amount', headerName: 'Amount', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'remaining', headerName: 'Remaining', flex: 1, headerAlign: 'center', align: 'center' },
];
