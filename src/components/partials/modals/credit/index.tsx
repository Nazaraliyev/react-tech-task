import React from 'react';
import styles from './styles.module.css';
import CreditDataProvider, { useCreditDataContext } from './context/data';
import { CustomModal, Flex } from '@/components/common';
import { CustomerType } from '@/types/customer';
import { Step, StepLabel, Stepper } from '@mui/material';
import CreditFooter from './components/footer';
import { steps } from './utils/constants';
import CreditDecline from './components/decline';

interface Props {
  customer: CustomerType;
  open: boolean;
  onClose: () => void;
}

const Wrapper = (props: Props) => (
  <CreditDataProvider {...{ customer: props.customer, open: props.open, onClose: props.onClose }}>
    <CreditModal {...props} />
  </CreditDataProvider>
);
export default Wrapper;

const CreditModal = (props: Props) => {
  // Store
  const { step, data } = useCreditDataContext();

  // Memos
  const stepLabels = React.useMemo(() => steps.map((item) => item.label), []);

  // Variables
  const Component = data.status === 'declined' ? CreditDecline : steps[step].component;

  return (
    <CustomModal
      width={900}
      open={props.open}
      title="Create Credit"
      onClose={props.onClose}
      bodyClassName={styles.body}
      footer={<CreditFooter />}>
      <Flex direction="column" gap={'xxxl'}>
        <Stepper nonLinear activeStep={1}>
          {stepLabels.map((label, index) => (
            <Step key={label} active={step === index} completed={step > index || data.status === 'approved'}>
              <StepLabel color="inherit" error={index === steps.length - 1 && data.status === 'declined'}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Component />
      </Flex>
    </CustomModal>
  );
};
