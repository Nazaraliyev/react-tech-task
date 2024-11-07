import styles from './styles.module.css';
import cx from 'classnames';
import { LogoImg, OperatorImg } from '@/assets/images';
import { TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { CustomButton, Flex, FormItem } from '@/components/common';
import Cookies from 'js-cookie';
import { cookieKeys } from '@/utils/constants/common';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/user';
import useDelay from '@/utils/hooks/useDelay';
import { useNavigate } from 'react-router-dom';
import pages, { route } from '@/routes/constants/pages';

const AuthPage = () => {
  return (
    <Flex direction="column" isFullHeight className={styles.container} gap={'xxl'}>
      <Content />
      <Footer />
    </Flex>
  );
};

export default AuthPage;

const Content = () => (
  <Flex full center>
    <Flex className={styles.content}>
      <Flex direction="column" gap={'xxl'} justify="center" className={cx(styles.content_item, styles.content_form)}>
        <Typography variant="h4" align="center">
          Sign In
        </Typography>
        <Form />
      </Flex>
      <img src={OperatorImg} alt="operator" className={cx(styles.content_item, styles.content_image)} />
    </Flex>
  </Flex>
);

const Footer = () => (
  <Flex justify="space-between" align="baseline">
    <img src={LogoImg} className={styles.footer_logo} alt="logo" />
    <Typography color="textSecondary">© 1992 - 2024 All rights reserved</Typography>
  </Flex>
);

const Form = () => {
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getDelay, delaying } = useDelay();
  const { control, handleSubmit } = useForm({ defaultValues: { fullName: '', } }); // prettier-ignore

  // Functions
  const onSubmit = (data: { fullName: string }) => {
    getDelay(() => {
      Cookies.set(cookieKeys.token, data?.fullName);
      dispatch(setUser(data?.fullName));
      navigate(pages.customers, { replace: true });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap={'m'}>
        <FormItem control={control} name="fullName" rules={{ required: 'This field is required' }}>
          <TextField label="Full name" size="small" />
        </FormItem>
        <CustomButton variant="contained" color="primary" type="submit" loading={delaying}>
          Login
        </CustomButton>
      </Flex>
    </form>
  );
};
