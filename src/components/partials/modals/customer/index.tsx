import React from 'react';
import styles from './styles.module.css';
import { CustomModal, Flex, FormItem } from '@/components/common/';
import { RegisterOptions, useForm } from 'react-hook-form';
import { TextField, Typography } from '@mui/material';

interface Props {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

interface ItemType {
  title: string;
  children: {
    name: string;
    label: string;
    component: string;
    isFull?: boolean;
    rules?: RegisterOptions;
  }[];
}

const CustomerModal = (props: Props) => {
  // Hooks
  const { control, handleSubmit, reset } = useForm({ defaultValues });

  // Effects
  React.useEffect(() => { !props.open && reset(defaultValues) }, [props.open]); // prettier-ignore

  return (
    <CustomModal
      width={600}
      form={formId}
      open={props.open}
      title={'Create Customer'}
      loading={props.loading}
      onClose={props.onClose}
      confirmButtonText="Create">
      <form id={formId} onSubmit={handleSubmit(props.onSubmit)}>
        <Flex gap={'xl'} direction="column">
          {items.map((item) => (
            <Block title={item.title}>
              {item.children.map((child) => (
                <FormItem
                  key={child.name}
                  {...{
                    control,
                    name: child.name,
                    rules: { required: 'This field is required' },
                    className: child?.isFull ? undefined : styles.field,
                  }}>
                  {child.component === 'input' ? (
                    <TextField {...{ label: child.label, size: 'small' }} />
                  ) : (
                    <TextField {...{ InputLabelProps: { shrink: true }, label: child.label, size: 'small', type: 'date' }} />
                  )}
                </FormItem>
              ))}
            </Block>
          ))}
        </Flex>
      </form>
    </CustomModal>
  );
};

export default CustomerModal;

const Block = (props: { title: string; children: React.ReactNode }) => {
  return (
    <Flex gap={'m'} direction="column">
      <Typography>{props.title}</Typography>
      <Flex wrap gap={'l'}>
        {props.children}
      </Flex>
    </Flex>
  );
};

const formId = 'customer-form';

const items: ItemType[] = [
  {
    title: 'ID Card Information',
    children: [
      {
        name: 'firstName',
        label: 'First Name',
        component: 'input',
      },
      {
        name: 'lastName',
        label: 'Last Name',
        component: 'input',
      },
      {
        name: 'fatherName',
        label: ' Father’s Name',
        component: 'input',
      },
      {
        name: 'dateOfBirth',
        label: 'Date of Birth',
        component: 'date',
      },
      {
        name: 'fin',
        label: 'FIN Code',
        component: 'input',
      },
      {
        name: 'serial',
        label: 'Serial Number',
        component: 'input',
      },
    ],
  },
  {
    title: 'Address',
    children: [
      {
        name: 'registrationAddress',
        label: 'Registration address',
        component: 'input',
        isFull: true,
      },
      {
        name: 'actualAddress',
        label: 'Actual address',
        component: 'input',
        isFull: true,
      },
    ],
  },
  {
    title: 'Contact',
    children: [
      {
        name: 'phone',
        label: 'Phone number',
        component: 'input',
      },
      {
        name: 'email',
        label: 'Email address',
        component: 'input',
      },
    ],
  },
];

const defaultValues = (() => {
  const value: { [key: string]: any } = {};
  const allItems = items.flatMap((item) => item.children);
  allItems.forEach((item) => { value[item.name] = '' }) // prettier-ignore
  return value;
})();
