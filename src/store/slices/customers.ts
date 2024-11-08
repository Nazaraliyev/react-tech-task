import { createSlice, current } from '@reduxjs/toolkit';
import { CustomerSliceType } from '../types';
import { CustomerJobType, CustomerType } from '@/types/customer';

const initialState: CustomerSliceType = {
  customers: [],
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    addCustomer: (state, { payload }: { payload: CustomerType }) => {
      state.customers.push(payload);
    },
    updateCustomer: (state, { payload }: { payload: { fin?: string; personal?: CustomerType; job?: CustomerJobType } }) => {
      const customers = current(state.customers);

      const findIndex = customers.findIndex((item) => item.fin === payload.fin);

      if (findIndex !== -1) {
        const foundCustomer = {... customers[findIndex]};

        if (payload.job) foundCustomer.job = payload.job;
        if (payload.personal)  Object.keys(payload.personal).forEach((key) => (foundCustomer as any)[key] = (payload.personal as any)[key])

        state.customers[findIndex] = foundCustomer;
      }
    },
    removeCustomer: (state, { payload }: { payload: string }) => {
      state.customers = state.customers.filter((item) => item.fin !== payload);
    },
  },
});

export const { addCustomer, updateCustomer, removeCustomer } = customerSlice.actions;

export default customerSlice.reducer;
