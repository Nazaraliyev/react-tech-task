import { CustomerType } from '@/types/customer';
import React from 'react';
import { CreditDataType } from '../types';

// Types
interface CreditDataContextType {
  step: number;
  data: CreditDataType;
  onNext: () => void;
  onPrev: () => void;
  onChange: (key: keyof typeof initialData, value: any, nextStep?: boolean) => void;
  onClose: () => void;
  loading: boolean;
  setLoading: (event: boolean) => void;
}

interface Props {
  children: React.ReactNode;
  customer: CustomerType;
  open: boolean;
  onClose: () => void;
}

const initialData: CreditDataType = {
  experience: undefined,
  amount: {
    currency: 'usd',
    amount: 0,
    goal: '',
    duration: 0,
    interest: 0,
  },
  guarantors: [],
  calendar: [],
  status: 'pending',
};

// Create new Context
export const CreditDataContext = React.createContext<CreditDataContextType>({
  step: 0,
  loading: false,
  data: initialData,
  onNext: () => {},
  onPrev: () => {},
  onChange: () => {},
  onClose: () => {},
  setLoading: () => {},
});

const CreditDataProvider = (props: Props) => {
  // States
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState(initialData);
  const [loading, setLoading] = React.useState(false);

  // Effects
  React.useEffect(() => { props.customer?.job && setData({ ...initialData, experience: props.customer.job })  }, [props.customer]); // prettier-ignore
  React.useEffect(() => {
    if (!props.open) {
      setData({ ...initialData, experience: props.customer?.job });
      setStep(0);
    }
  }, [props.open]);

  // CallBacks
  const onClose = React.useCallback(props.onClose, [props.onClose]);

  // Functions
  const onNext = () => {
    setStep(step + 1);
  };
  const onPrev = () => {
    if (data.status === 'declined') setData({ ...data, status: 'pending' });
    else setStep(step - 1);
  };

  const onChange = (key: keyof typeof data, value: any, nextStep: boolean = false) => {
    setData({ ...data, [key]: value });
    nextStep && onNext();
  };

  return (
    <CreditDataContext.Provider value={{ step, loading, data, setLoading, onClose, onChange, onNext, onPrev }}>
      {props.children}
    </CreditDataContext.Provider>
  );
};

export default CreditDataProvider;

export const useCreditDataContext = () => {
  const context = React.useContext(CreditDataContext);
  if (context === undefined) throw new Error(`useCreditDataContext must be used within a CreditDataContextProvider`);
  return context;
};
