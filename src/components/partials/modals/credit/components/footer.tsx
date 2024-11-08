import styles from '../styles.module.css';
import cx from 'classnames';
import { CustomButton, Flex } from '@/components/common';
import { steps } from '../utils/constans';
import { useCreditDataContext } from '../context/data';
import useCreditCreator from '../utils/useCreator';

const CreditFooter = (props: { onClose: () => void }) => {
  // Store
  const { step, data, onPrev, onNext, onChange } = useCreditDataContext();

  // Variables
  const isFinal = step === steps.length - 1;

  // Hooks
  const { create } = useCreditCreator();

  // Functions
  const onClick = (type?: 'next' | 'complete' | 'decline') => () => {
    switch (type) {
      case 'complete':  return create() // prettier-ignore
      case 'decline': return data.status === 'pending' && onChange('status', 'declined') // prettier-ignore
      default: {
        if ([0, 1, 2].includes(step)) return;
        else onNext();
      }
    }
  };
  return (
    <Flex justify="space-between">
      {isFinal && (
        <CustomButton form={'form'} type={'submit'} onClick={onClick('decline')} color="error" className={styles.button}>
          Decline
        </CustomButton>
      )}
      <Flex gap={'m'} justify="flex-end">
        {step !== 0 && (
          <CustomButton onClick={onPrev} variant="text" className={cx(styles.button, styles.button_cancel)}>
            Prev
          </CustomButton>
        )}
        {!(data.status === 'declined' && isFinal) && (
          <CustomButton type="submit" form="form" onClick={onClick(isFinal ? 'complete' : 'next')} className={styles.button}>
            {isFinal ? 'Complete' : 'Next'}
          </CustomButton>
        )}
      </Flex>
    </Flex>
  );
};

export default CreditFooter;

const generateData = () => {};
