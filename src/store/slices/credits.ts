import { createSlice } from '@reduxjs/toolkit';
import { CreditSliceType } from '../types';
import { CreditType } from '@/types/credit';

const initialState: CreditSliceType = {
  data: [
    {
      customer: '56565',
      guarantors: ['1231', '123'],
      currency: 'usd',
      amount: 12121,
      goal: 'salam',
      duration: 12,
      interest: 12,
      status: 'declined',
      declineReason: 'test credit',
      statusUpdatedAt: '2024-11-08 13:51:35',
      createdAt: '2024-11-08 13:51:35',
      createdBy: 'Nazar Nazaraliyev',
    },
    {
      customer: '56565',
      guarantors: ['1231', '123'],
      currency: 'usd',
      amount: 12121,
      goal: 'salam',
      duration: 12,
      interest: 12,
      status: 'declined',
      declineReason: 'test credit',
      statusUpdatedAt: '2024-11-08 13:51:35',
      createdAt: '2024-11-08 13:51:35',
      createdBy: 'Nazar Nazaraliyev',
    },
    {
      customer: '56565',
      guarantors: ['1231', '123'],
      currency: 'usd',
      amount: 12121,
      goal: 'salam',
      duration: 12,
      interest: 12,
      status: 'declined',
      declineReason: 'test credit',
      statusUpdatedAt: '2024-11-08 13:51:35',
      createdAt: '2024-11-08 13:51:35',
      createdBy: 'Nazar Nazaraliyev',
    },
    {
      customer: '56565',
      guarantors: ['1231', '123'],
      currency: 'usd',
      amount: 12121,
      goal: 'salam',
      duration: 12,
      interest: 12,
      status: 'declined',
      declineReason: 'test credit',
      statusUpdatedAt: '2024-11-08 13:51:35',
      createdAt: '2024-11-08 13:51:35',
      createdBy: 'Nazar Nazaraliyev',
    },
  ],
};

export const creditSlice = createSlice({
  name: 'credit',
  initialState,
  reducers: {
    addCredit: (state, { payload }: { payload: CreditType }) => {
      state.data.push(payload);
    },
  },
});

export const { addCredit } = creditSlice.actions;

export default creditSlice.reducer;
