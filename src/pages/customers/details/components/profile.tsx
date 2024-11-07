import styles from '../styles.module.css';
import { Typography } from '@mui/material';
import { MaleImg } from '@/assets/images';
import { Flex, CustomButton } from '@/components/common';
import { CustomerType } from '@/types/customer';

const CustomerProfile = (props: { data?: CustomerType }) => {
  return (
    <Flex direction="column" gap={'xxl'} align="center" className={styles.profile}>
      <img src={MaleImg} alt="profile" className={styles.profile_image} />
      <Flex direction="column" gap={'s'} align="center" full>
        <Typography variant="h5" align="center">{`${props.data?.firstName} ${props.data?.lastName}`}</Typography>
        <Typography color="#999">{props.data?.email}</Typography>
        <Typography color="#999">{props.data?.phone}</Typography>
      </Flex>
      <CustomButton color="error">Delete</CustomButton>
    </Flex>
  );
};

export default CustomerProfile;
