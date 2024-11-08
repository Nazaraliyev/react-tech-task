import React from 'react';
import styles from '../../styles.module.css';
import cx from 'classnames';
import CustomerContainer from '../components/container';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { CreditModal } from '@/components/partials';
import { CustomButton, CustomTable, Empty, Flex } from '@/components/common';
import { CustomerType } from '@/types/customer';
import { GridColDef } from '@mui/x-data-grid';
import { IoAdd } from 'react-icons/io5';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

const CustomerCredits = (props: { data?: CustomerType }) => {
  // Store
  const { data } = useSelector((state: RootState) => state.credit) || {};

  // Memos
  const creditsMemo = React.useMemo(() => {
    if (!data.length) return [];
    const credits = data.filter((item) => item.customer === props.data?.fin);
    return credits.map((item, index) => ({ ...item, id: index, index: index + 1 }));
  }, [data, props.data]);

  return (
    <CustomerContainer
      title="Customer Credits"
      extras={<Extras customer={props.data!} />}
      headerClassName={styles.container}
      dividerClassName={styles.divider_credit}>
      {creditsMemo.length ? <CustomTable data={creditsMemo} columns={columns} /> : <Empty />}
    </CustomerContainer>
  );
};

export default CustomerCredits;

const Extras = ({ customer }: { customer: CustomerType }) => {
  // States
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <CustomButton startIcon={<IoAdd />} onClick={() => setOpen(true)}>
        Create
      </CustomButton>
      <CreditModal {...{ open, customer, onClose: () => setOpen(false) }} />
    </>
  );
};

const columns: GridColDef[] = [
  {
    field: 'status',
    headerName: 'Status',
    headerAlign: 'center',
    width: 100,
    renderCell: (params) => {
      return (
        <Flex center isFullHeight>
          <div className={cx('credit_status', `credit_status--${params.row.status}`)} />
        </Flex>
      );
    },
  },
  {
    field: 'amount',
    headerName: 'Amount',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
  },
  {
    field: 'currency',
    headerName: 'Currency',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    renderCell: (params) => (
      <Flex center isFullHeight>
        <Typography align="center">{params.row.currency?.toUpperCase()}</Typography>
      </Flex>
    ),
  },
  {
    field: 'duration',
    headerName: 'Duration',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
  },
  {
    field: 'interest',
    headerName: 'Interest',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    renderCell: (params) => (
      <Flex center isFullHeight>
        <Typography align="center">{params.row.interest} %</Typography>
      </Flex>
    ),
  },
  {
    field: 'createdBy',
    headerName: 'Created By',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
  },
  {
    field: 'createdAt',
    headerName: 'Created Time',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    renderCell: (params) => (
      <Flex center isFullHeight>
        <Typography align="center">{dayjs(params.row.createdAt).format('DD/MM/YYYY')}</Typography>
      </Flex>
    ),
  },
];
