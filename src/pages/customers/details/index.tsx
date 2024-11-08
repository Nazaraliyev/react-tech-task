import { Flex } from '@/components/common';
import React from 'react';
import CustomerDetails from './contents/details';
import CustomerCredits from './contents/credits';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useNavigate, useParams } from 'react-router-dom';
import pages from '@/routes/constants/pages';
import { CustomerType } from '@/types/customer';

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
    <Flex direction="column" gap={'xxl'}>
      <CustomerDetails {...{ data }} />
      <CustomerCredits {...{ data }} />
    </Flex>
  );
};

export default CustomerDetailsPage;
