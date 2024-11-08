import { createSlice } from '@reduxjs/toolkit';
import { CreditSliceType } from '../types';
import { CreditType } from '@/types/credit';

const initialState: CreditSliceType = {
  data: [],
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
