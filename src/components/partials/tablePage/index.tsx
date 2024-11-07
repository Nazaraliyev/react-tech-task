import React, { ChangeEvent } from 'react';
import styles from './styles.module.css';
import { Divider, Paper, Table as MUTable, TextField, TableHead, TableBody } from '@mui/material';
import { Flex } from '@/components/common';
import Empty from '@/components/common/empty';

interface Props {
  columns: { [key: string]: any }[];
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
      {!props.data?.length ? <Empty className={styles.empty}/> : <Table {...props} />}
      <Table {...props} />
    </Paper>
  );
};

export default TablePage;


const Header = ({ searchPlaceHolder = 'Search...', ...props }: Partial<Props>) => {
  // Functions
  const onSearch = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => props.onSearch?.(event.target.value);

  return (
    <Flex justify="flex-end" className={styles.header} gap={'l'}>
      <TextField size="small" label={searchPlaceHolder} onChange={onSearch} className={styles.header_search} />
      {props.extras}
    </Flex>
  );
};


const Table = ({ data = [], columns = [], ...props }: Partial<Props>) => {
  return (
    <MUTable>
      <TableHead></TableHead>
      <TableBody></TableBody>
    </MUTable>
  );
};
