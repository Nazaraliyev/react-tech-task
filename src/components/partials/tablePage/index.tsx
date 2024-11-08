import React, { ChangeEvent } from 'react';
import styles from './styles.module.css';
import { Divider, Paper, TextField } from '@mui/material';
import { Flex, CustomTable } from '@/components/common';
import Empty from '@/components/common/empty';
import { GridColDef } from '@mui/x-data-grid';

interface Props {
  columns: GridColDef[];
  data: { [key: string]: any }[];
  hasData: boolean;
  searchPlaceHolder: string;
  onSearch: (value: string) => any;
  extras: React.ReactNode;
}

const TablePage = (props: Partial<Props>) => {
  // Functions
  return (
    <Paper variant="outlined" elevation={3} className={styles.container}>
      <Header {...props} />
      <Divider />
      {!props.data?.length ? <Empty className={styles.empty} /> : <Table {...props} />}
    </Paper>
  );
};

export default TablePage;

const Header = ({ searchPlaceHolder = 'Search...', ...props }: Partial<Props>) => {
  // Functions
  const onSearch = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => props.onSearch?.(event.target.value);

  return (
    <Flex justify="flex-end" gap={'l'} className={styles.header}>
      <TextField size="small" label={searchPlaceHolder} onChange={onSearch} className={styles.header_search} />
      {props.extras}
    </Flex>
  );
};

const Table = ({ data = [], columns = [] }: Partial<Props>) => {
  // Memos
  const dataMemo = React.useMemo(() => data.map((item, index) => ({ ...item, index: index + 1 })), [data]); // prettier-ignore
  const columnsMemo = React.useMemo(() => {
    const newColumns = [...columns];
    newColumns.unshift({ field: 'index', headerName: '#', headerAlign: 'center', align: 'center', width: 10 });
    return newColumns;
  }, [columns]);

  return <CustomTable data={dataMemo} columns={columnsMemo} disableColumnFilter disableColumnMenu disableColumnSorting hideFooterPagination />;
};
