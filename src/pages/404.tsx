import { CustomButton, Flex } from '@/components/common';
import pages from '@/routes/constants/pages';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  // Hooks
  const navigate = useNavigate();

  // Functions
  const onClick = () => navigate(pages.customers)
  return (
    <Flex isFullHeight center direction="column" gap={'xl'}>
      <Typography fontSize={200} fontWeight={600}>
        404
      </Typography>
      <Typography variant="h4" fontWeight={600}>
        Opps, Looks like you're lost
      </Typography>
      <Typography>The page you are looking for not available!</Typography>
      <CustomButton onClick={onClick}>Go to Back</CustomButton>
    </Flex>
  );
};

export default NotFoundPage;
