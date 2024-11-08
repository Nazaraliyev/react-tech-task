import React from 'react';
import cx from 'classnames';
import { CustomButton, Flex } from '@/components/common';
import { TablePage } from '@/components/partials';
import { GridColDef } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const CreditPage = () => {
  // Store
  const { data } = useSelector((state: RootState) => state.credit) || {};
  const { customers } = useSelector((state: RootState) => state.customer) || {};

  // States
  const [search, setSeach] = React.useState<string>('');

  // Memos
  const mappedDataMemo = React.useMemo(() => {
    const mapped = data.map((item, index) => {
      const fC = customers.find((customer) => customer.fin === item.customer);
      return { ...item, index, id: index, fullName: `${fC?.firstName} ${fC?.lastName}, ${fC?.fatherName}`, customer: fC };
    });
    return mapped.filter((item) => item.customer);
  }, [data, customers, search]);

  const tableMemo = React.useMemo(() => mappedDataMemo.filter((item) => item.fullName.toLowerCase().includes(search.toLowerCase())),[search, mappedDataMemo]); // prettier-ignore

  return <TablePage columns={columns} data={tableMemo} onSearch={setSeach} />;
};

export default CreditPage;

const columns: GridColDef[] = [
  {
    field: 'status',
    headerName: 'Status',
    headerAlign: 'center',
    width: 80,
    renderCell: (params) => {
      return (
        <Flex center isFullHeight>
          <div className={cx('credit_status', `credit_status--${params.row.status}`)} />
        </Flex>
      );
    },
  },
  {
    field: 'fullName',
    headerName: 'Full Name',
    flex: 1,
    renderCell: (params) => (
      <Flex align="center" isFullHeight>
        <Typography align="center">{params.row.fullName}</Typography>
      </Flex>
    ),
  },
  {
    field: 'amount',
    headerName: 'Amount',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    renderCell: (params) => (
      <Flex center isFullHeight>
        <Typography align="center">{params.row.amount + ' ' + params.row.currency?.toUpperCase()}</Typography>
      </Flex>
    ),
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
  {
    field: 'action',
    headerName: 'Action',
    headerAlign: 'center',
    align: 'center',
    width: 140,
    renderCell: () => (
      <CustomButton size="small" variant="outlined">
        View
      </CustomButton>
    ),
  },
];
