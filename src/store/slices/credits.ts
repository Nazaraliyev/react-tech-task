import { createSlice } from '@reduxjs/toolkit'
import { CreditSliceType } from '../types'

const initialState: CreditSliceType = {
}

export const creditSlice = createSlice({
  name: 'credit',
  initialState,
  reducers: {
  },
})

export const {  } = creditSlice.actions

export default creditSlice.reducer