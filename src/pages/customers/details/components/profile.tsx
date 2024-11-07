import React from 'react';
import styles from '../styles.module.css';
import { Typography } from '@mui/material';
import { MaleImg } from '@/assets/images';
import { Flex, CustomButton, CustomModal } from '@/components/common';
import { CustomerType } from '@/types/customer';
import { useDispatch } from 'react-redux';
import { removeCustomer } from '@/store/slices/customers';
import { useDelay } from '@/utils/hooks';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import pages from '@/routes/constants/pages';

const CustomerProfile = (props: { data?: CustomerType }) => {
  return (
    <Flex direction="column" gap={'xxl'} align="center">
      <img src={MaleImg} alt="profile" className={styles.profile_image} />
      <Flex direction="column" gap={'s'} align="center" full>
        <Typography variant="h5" align="center">{`${props.data?.firstName} ${props.data?.lastName}`}</Typography>
        <Typography color="#999">{props.data?.email}</Typography>
        <Typography color="#999">{props.data?.phone}</Typography>
      </Flex>
      <CustomerDelete fin={props.data?.fin} />
    </Flex>
  );
};

export default CustomerProfile;

const CustomerDelete = (props: { fin?: string }) => {
  // States
  const [open, setOpen] = React.useState(false);

  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { delaying, getDelay } = useDelay();

  // Functions
  const toggleModal = (type: 'open' | 'close') => () => setOpen(type === 'open');
  const onDelete = () => {
    getDelay(() => {
      dispatch(removeCustomer(props.fin!));
      enqueueSnackbar('Customer deleted successfully', { variant: 'success' });
      navigate(pages.customers, { replace: true });
      setOpen(false);
    });
  };

  return (
    <>
      <CustomButton color="error" onClick={toggleModal('open')}>
        Delete
      </CustomButton>
      <CustomModal
        open={open}
        confirmButtonText="Delete"
        onClose={toggleModal('close')}
        title={'Delete Customer'}
        headerClassName={styles.delete_modal_header}
        footerClassName={styles.delete_modal_footer}
        onConfirm={onDelete}
        loading={delaying}>
        <Flex direction="column">
          <Typography>Are you sure you want to delete this customer?</Typography>
          <Typography color="#999">This action cannot be undone</Typography>
        </Flex>
      </CustomModal>
    </>
  );
};
