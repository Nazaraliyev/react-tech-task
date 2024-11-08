import { CustomerType } from './customer';

export interface CreditType {
  customer: string;
  guarantors: string[];
  currency: string;
  amount: number;
  goal: string;
  duration: number;
  interest: number;
  status: 'pending' | 'approved' | 'declined';
  declineReason: string;
  statusUpdatedAt: string;
  createdAt: string;
  createdBy: string;
}
