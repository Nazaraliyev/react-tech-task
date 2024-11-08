import { CustomerJobType } from '@/types/customer';

export interface CreditDataType {
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
  status: 'pending' | 'approved' | 'declined';
}
