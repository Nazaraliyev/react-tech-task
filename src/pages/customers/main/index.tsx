import { CustomButton } from '@/components/common';
import { TablePage, CustomerModal } from '@/components/partials';
import pages from '@/routes/constants/pages';
import { RootState } from '@/store';
import { addCustomer } from '@/store/slices/customers';
import { useDelay } from '@/utils/hooks';
import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import React from 'react';
import { IoAdd } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CustomerPage = () => {
  // Store
  const { customers } = useSelector((state: RootState) => state.customer) || {};

  // States
  const [search, setSearch] = React.useState<string>('');

  // Hooks
  const navigate = useNavigate();

  // Functions
  const onView = (fin: string) => navigate(`${pages.customers}/${fin}`);

  // Memos
  const columnsMemo = React.useMemo(() => generateColumns(onView), [onView]);
  const dataMemo = React.useMemo(() => {
    const data = customers.map((item) => ({ ...item, id: item.fin, fullName: `${item.firstName} ${item.lastName}, ${item.fatherName}` }));
    const filtered = data.filter((item) => item.fullName.toLowerCase().includes(search.toLowerCase()));
    return filtered;
  }, [customers, search]);

  return <TablePage data={dataMemo} columns={columnsMemo} extras={<Create />} onSearch={setSearch} />;
};

export default CustomerPage;

const Create = () => {
  // States
  const [open, setOpen] = React.useState(false);

  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { delaying, getDelay } = useDelay();

  // Functions
  const toggleModal = (type: 'open' | 'close') => () => setOpen(type === 'open');
  const onSubmit = (data: any) => {
    const customer = { ...data, isGuarantor: false };
    getDelay(() => {
      dispatch(addCustomer(customer));
      setOpen(false);
      enqueueSnackbar('Customer created successfully', { variant: 'success' });
      setTimeout(() => { navigate(`/customers/${data.fin}`, { replace: true }) }, 200); // prettier-ignore
    });
  };

  return (
    <>
      <CustomButton startIcon={<IoAdd />} onClick={toggleModal('open')}>
        Create
      </CustomButton>
      <CustomerModal {...{ open, onSubmit, loading: delaying, onClose: toggleModal('close') }} />
    </>
  );
};

const generateColumns = (onClick: (fin: string) => any): GridColDef[] => [
  { field: 'fullName', headerName: 'Full Name', flex: 1, filterable: false },
  { field: 'fin', headerName: 'Fin code', flex: 1, filterable: false },
  { field: 'phone', headerName: 'Phone number', flex: 1, filterable: false },
  {
    field: 'action',
    headerName: 'Action',
    width: 140,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => <CustomButton onClick={() => onClick(params.row.fin)}>View</CustomButton>,
  },
];
