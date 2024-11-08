import styles from '../styles.module.css';
import cx from 'classnames';
import { CustomButton, Flex } from '@/components/common';
import { steps } from '../constants/steps';
import { useCreditDataContext } from '../context/data';

const CreditFooter = () => {
  // Store
  const { step, onPrev, onNext } = useCreditDataContext();

  // Variables
  const isFinal = step === steps.length - 1;

  // Functions
  const onClick = (type: 'prev' | 'next' | 'complete' | 'decline') => () => {
    switch (type) {
      case "complete": return console.log("Complete") // prettier-ignore
      case "decline": return console.log("Decline") // prettier-ignore
      default: return console.log("No action") // prettier-ignore
    }
  };
  return (
    <Flex justify="space-between">
      {isFinal && (
        <CustomButton onClick={onClick('decline')} color="error" className={styles.button}>
          Decline
        </CustomButton>
      )}
      <Flex gap={'m'} justify="flex-end">
        {step !== 0 && (
          <CustomButton onClick={onPrev} variant="text" className={cx(styles.button, styles.button_cancel)}>
            Prev
          </CustomButton>
        )}
        <CustomButton type="submit" form='form' className={styles.button}>
          {isFinal ? 'Complete' : 'Next'}
        </CustomButton>
      </Flex>
    </Flex>
  );
};

export default CreditFooter;
