import { createSlice } from '@reduxjs/toolkit';
import { CustomerSliceType } from '../types';
import { CustomerType } from '@/types/customer';

const initialState: CustomerSliceType = {
  customers: [
    {
      firstName: 'Nazar',
      lastName: 'Nazaraliyev',
      fatherName: 'Habib',
      dateOfBirth: '1222-12-12',
      fin: '56565',
      serial: '123123123',
      registrationAddress: 'Azerbaijan',
      actualAddress: 'Azerbaijan',
      phone: '12312312312',
      email: 'asdasdasd',
      isGuarantor: false,
    },
    {
      firstName: 'Samir',
      lastName: 'Nazaraliyev',
      fatherName: 'Habib',
      dateOfBirth: '1222-12-12',
      fin: '1231',
      serial: '123123123',
      registrationAddress: 'Azerbaijan',
      actualAddress: 'Azerbaijan',
      phone: '12312312312',
      email: 'asdasdasd',
      isGuarantor: false,
    },
    {
      firstName: 'Gunel',
      lastName: 'Nazaraliyev',
      fatherName: 'Habib',
      dateOfBirth: '1222-12-12',
      fin: '123',
      serial: '123123123',
      registrationAddress: 'Azerbaijan',
      actualAddress: 'Azerbaijan',
      phone: '12312312312',
      email: 'asdasdasd',
      isGuarantor: false,
    },
    {
      firstName: 'Yaxsi',
      lastName: 'Nazaraliyev',
      fatherName: 'Habib',
      dateOfBirth: '1222-12-12',
      fin: '12312323232323',
      serial: '123123123',
      registrationAddress: 'Azerbaijan',
      actualAddress: 'Azerbaijan',
      phone: '12312312312',
      email: 'asdasdasd',
      isGuarantor: false,
    },
  ],
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    addCustomer: (state, { payload }: { payload: CustomerType }) => {
      state.customers.push(payload);
    },
    selectCustomer: (state, { payload }: { payload: number }) => {
      state.selected = payload;
    },
    removeCustomer: (state, { payload }: { payload: string }) => {
      state.customers = state.customers.filter((item) => item.fin !== payload);
    },
  },
});

export const { addCustomer, selectCustomer, removeCustomer } = customerSlice.actions;

export default customerSlice.reducer;
