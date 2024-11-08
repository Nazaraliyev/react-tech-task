import React from 'react';
import styles from '../styles.module.css';
import { Flex } from '@/components/common';
import { Divider, Grid2, Paper, Typography } from '@mui/material';
import { useCreditDataContext } from '../context/data';
import { CustomerJobType, CustomerType } from '@/types/customer';
import { CreditTable } from '@/components/partials';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const CreditComplete = () => {
  // Stores
  const { data } = useCreditDataContext();

  return (
    <Flex direction="column" gap={'xl'}>
      <Typography variant="h4">Confirmation</Typography>
      <Flex direction="column" gap={'m'}>
        <Details {...{ data: data.customer }} />
        <Experience {...{ data: data.experience }} />
        <Calculators {...{ data: data.calendar }} />
        <Guarantors {...{ data: data.guarantors }} />
      </Flex>
    </Flex>
  );
};

export default CreditComplete;

const Block = (props: { title: string; children: React.ReactNode }) => {
  return (
    <Paper variant="outlined">
      <Flex gap={'m'} direction="column" className={styles.confirmation_block}>
        <Typography>{props.title}</Typography>
        <Divider className={styles.confirmation_block_divider} />
        {props.children}
      </Flex>
    </Paper>
  );
};

const RowData = (props: { data?: { label: string; value: string | number | undefined }[] }) => {
  return (
    <Grid2 container>
      {props?.data?.map((item) => (
        <Grid2 key={item.label} className={styles.confirmation_block_row} size={6}>
          <Flex gap={'xl'}>
            <Typography fontSize={12} className={styles.confirmation_row}>
              {item.label} :
            </Typography>
            <Typography fontSize={12} className={styles.confirmation_row}>
              {item.value}
            </Typography>
          </Flex>
        </Grid2>
      ))}
    </Grid2>
  );
};

const Details = (props: { data?: CustomerType }) => {
  // Memos
  const data = React.useMemo(() => createDetailsData(props.data), [props.data]);

  return (
    <Block title="Customer details">
      <RowData data={data} />
    </Block>
  );
};

const Experience = (props: { data?: CustomerJobType }) => {
  // Memos
  const data = React.useMemo(() => createExperienceData(props.data), [props.data]);

  return (
    <Block title="ustomer work experience">
      <RowData data={data} />
    </Block>
  );
};

const Calculators = (props: { data: any[] }) => {
  return (
    <Block title="Credit details">
      <CreditTable data={props.data} header={false} />
    </Block>
  );
};

const Guarantors = (props: { data: string[] }) => {
  // Stores
  const { customers } = useSelector((state: RootState) => state.customer);

  // Memos
  const data = React.useMemo(() => customers.filter((item) => props.data.includes(item.fin)), [customers]);

  return (
    <Block title="Credit guarantors">
      {data.length === 0 ? (
        <Typography fontSize={12}>Guarantors not found</Typography>
      ) : (
        data.map((item) => (
          <Typography fontSize={12}>
            {item.firstName} {item.lastName}, {item.fatherName} {`( ${item.fin} )`}
          </Typography>
        ))
      )}
    </Block>
  );
};

const createDetailsData = (data?: CustomerType) => [
  {
    label: 'Full name',
    value: `${data?.firstName} ${data?.lastName}`,
  },
  {
    label: 'Father`s name',
    value: data?.fatherName,
  },
  {
    label: 'FIN Code',
    value: data?.fin,
  },
  {
    label: 'Series number',
    value: data?.serial,
  },
  {
    label: 'Registration address',
    value: data?.registrationAddress,
  },
  {
    label: 'Actual address',
    value: data?.actualAddress,
  },
  {
    label: 'Phone number',
    value: data?.phone,
  },
  {
    label: 'Email address',
    value: data?.email,
  },
];

const createExperienceData = (data?: CustomerJobType) => [
  {
    label: 'Job title',
    value: data?.jobTitle,
  },
  {
    label: 'Company name',
    value: data?.company,
  },
  {
    label: 'Region',
    value: data?.region,
  },
  {
    label: 'Salary',
    value: data?.salary,
  },
  {
    label: 'Experience',
    value: data?.experienceYears ? `${data?.experienceYears} years ` : '' + data?.experienceMonths ? `${data?.experienceMonths} months` : '',
  },
];
