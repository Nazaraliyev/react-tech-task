import styles from '../../styles.module.css';
import { CustomerType } from '@/types/customer';
import CustomerProfile from './components/profile';
import { Grid2} from '@mui/material';
import { CustomButton, Flex } from '@/components/common';
import { customerFields, customerJobFields } from '@/utils/constants/customer';
import CustomerBlock from './components/block';
import useFormHandle from './hooks/useFormHandle';
import CustomerContainer from '../components/container';

const CustomerDetails = ({ data }: { data?: CustomerType }) => {
  // Hooks
  const { controlExperience, controlInfo, onSubmit, loading } = useFormHandle(data);

  return (
    <CustomerContainer title="Customer details">
      <Grid2 container columns={24} spacing={3}>
        <Grid2 size={6}>
          <CustomerProfile {...{ data }} />
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
    </CustomerContainer>
  );
};

export default CustomerDetails;