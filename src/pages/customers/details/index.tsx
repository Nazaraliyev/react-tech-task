import React from 'react';
import styles from './styles.module.css';
import pages from '@/routes/constants/pages';
import { RootState } from '@/store';
import { CustomerType } from '@/types/customer';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CustomerProfile from './components/profile';
import { Divider, Grid2, Paper, Typography } from '@mui/material';
import { CustomButton, Flex } from '@/components/common';
import { customerFields, customerJobFields } from '@/utils/constants/customer';
import CustomerBlock from './components/block';
import useFormHandle from './hooks/useFormHandle';
import { CreditModal } from '@/components/partials';

const CustomerDetailsPage = () => {
  // Store
  const { customers } = useSelector((state: RootState) => state.customer) || {};

  // States
  const [data, setData] = React.useState<CustomerType>();

  // Hooks
  const params = useParams();
  const navigate = useNavigate();

  // Effects
  React.useEffect(() => {
    const customer = customers.find((item) => item.fin === params.id);
    if (!customer) navigate(pages.customers);
    else setData(customer);
  }, [customers]);

  return (
    <Paper variant="outlined" className={styles.container}>
      <Header data={data} />
      <Divider className={styles.divider} />
      <Content data={data} />
    </Paper>
  );
};

export default CustomerDetailsPage;

const Header = (props: { data?: CustomerType }) => {
  // States
  const [open, setOpen] = React.useState(false);

  // Functions
  const toggleModal = (type:"open"|"close") => () => setOpen(type === "open");

  return (
    <>
      <Flex justify="space-between" align="center">
        <Typography> Customer details</Typography>
        <CustomButton onClick={toggleModal("open")}>New Credit</CustomButton>
      </Flex>
      <CreditModal {...{ open, onClose: toggleModal("close"), customer: props.data! }} />
    </>
  );
};

const Content = (props: { data?: CustomerType }) => {
  // Hooks
  const { controlExperience, controlInfo, onSubmit, loading } = useFormHandle(props.data);

  return (
    <Grid2 container columns={24} spacing={3}>
      <Grid2 size={6}>
        <CustomerProfile {...props} />
      </Grid2>
      <Grid2 size={9}>
        <CustomerBlock
          {...{
            control: controlInfo,
            title: 'Personal Information',
            fields: customerFields.flatMap((item) => item.children),
          }}
        />
      </Grid2>
      <Grid2 size={9}>
        <Flex direction="column" justify="space-between" isFullHeight className={styles.credits}>
          <CustomerBlock
            {...{
              control: controlExperience,
              title: 'Work Experience',
              fields: customerJobFields,
            }}
          />
          <CustomButton className={styles.save_button} onClick={onSubmit} loading={loading}>
            Save
          </CustomButton>
        </Flex>
      </Grid2>
    </Grid2>
  );
};
