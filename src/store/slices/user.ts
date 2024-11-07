import { createSlice } from '@reduxjs/toolkit';
import { UserSliceType } from '../types';

const initialState: UserSliceType = {
  fullName: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.fullName = payload;
    },
    resetUser: (state) => {
      state.fullName = undefined;
    },
  },
});

export const {setUser, resetUser} = userSlice.actions;

export default userSlice.reducer;
