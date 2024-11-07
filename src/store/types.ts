import { CustomerType } from '@/types/customer';

export interface UserSliceType {
  fullName: string | undefined;
}

export interface CustomerSliceType {
  customers: CustomerType[];
}

export interface CreditSliceType {}
