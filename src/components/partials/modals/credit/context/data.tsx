import { CustomerJobType, CustomerType } from '@/types/customer';
import React from 'react';

// Types
interface DataType {
  experience: CustomerJobType | undefined;
  amount: {
    currency: string;
    amount: number;
    goal: string;
    duration: number;
    interest: number;
  };
  guarantors: string[];
  calendar: {
    month: string;
    amount: number;
    remaining: number;
  }[];
}
interface CreditDataContextType {
  step: number;
  data: DataType;
  onNext: () => void;
  onPrev: () => void;
  onChange: (key: 'experience' | 'amount' | 'guarantors', value: any) => void;
}

const initialData: DataType = {
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
};

// Create new Context
export const CreditDataContext = React.createContext<CreditDataContextType>({
  step: 0,
  data: initialData,
  onNext: () => {},
  onPrev: () => {},
  onChange: () => {},
});

const CreditDataProvider = (props: { children: React.ReactNode; customer: CustomerType }) => {
  // States
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState(initialData);

  // Effects
  React.useEffect(() => { props.customer?.job && setData({ ...initialData, experience: props.customer.job })  }, [props.customer]); // prettier-ignore

  // Functions
  const onNext = () => setStep(step + 1);
  const onPrev = () => setStep(step - 1);

  const onChange = (key: 'experience' | 'amount' | 'guarantors', value: any) => {
    setData({ ...data, [key]: value });
    onNext();
  };

  return <CreditDataContext.Provider value={{ step, data, onChange, onNext, onPrev }}>{props.children}</CreditDataContext.Provider>;
};

export default CreditDataProvider;

export const useCreditDataContext = () => {
  const context = React.useContext(CreditDataContext);
  if (context === undefined) throw new Error(`useCreditDataContext must be used within a CreditDataContextProvider`);
  return context;
};
