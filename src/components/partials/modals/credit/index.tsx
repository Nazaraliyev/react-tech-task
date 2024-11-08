import React from 'react';
import styles from './styles.module.css'
import CreditDataProvider, { useCreditDataContext } from './context/data';
import { CustomModal, Flex } from '@/components/common';
import { CustomerType } from '@/types/customer';
import { Step, StepButton, Stepper } from '@mui/material';
import CreditFooter from './components/footer';
import { steps } from './constants/steps';

interface Props {
  customer: CustomerType;
  open: boolean;
  onClose: () => void;
}

const Wrapper = (props: Props) => (
  <CreditDataProvider customer={props.customer}>
    <CreditModal {...props} />
  </CreditDataProvider>
);
export default Wrapper;

const CreditModal = (props: Props) => {
  // Store
  const { step } = useCreditDataContext();

  // Memos
  const stepLabels = React.useMemo(() => steps.map((item) => item.label), []);

  // Variables
  const Component = steps[step].component;

  return (
    <CustomModal width={900} open={props.open} title="Create Credit" onClose={props.onClose} bodyClassName={styles.body} footer={<CreditFooter />}>
      <Flex direction="column" gap={'xxxl'}>
        <Stepper nonLinear activeStep={1}>
          {stepLabels.map((label, index) => (
            <Step key={label} active={step === index}>
              <StepButton color="inherit">{label}</StepButton>
            </Step>
          ))}
        </Stepper>
        <Component />
      </Flex>
    </CustomModal>
  );
};
