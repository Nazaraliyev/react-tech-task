import { createSlice } from '@reduxjs/toolkit'
import { CustomerSliceType } from '../types'

const initialState: CustomerSliceType = {
}

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
  },
})

export const {  } = customerSlice.actions

export default customerSlice.reducer