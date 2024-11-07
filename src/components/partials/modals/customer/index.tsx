import React from 'react';
import styles from './styles.module.css';
import { CustomModal, Flex, FormItem } from '@/components/common/';
import { useForm } from 'react-hook-form';
import { TextField, Typography } from '@mui/material';
import { customerFields } from '@/utils/constants/customer';

interface Props {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
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
          {customerFields.map((item) => (
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

const defaultValues = (() => {
  const value: { [key: string]: any } = {};
  const allItems = customerFields.flatMap((item) => item.children);
  allItems.forEach((item) => { value[item.name] = '' }) // prettier-ignore
  return value;
})();
