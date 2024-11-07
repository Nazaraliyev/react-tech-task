import { configureStore } from '@reduxjs/toolkit'

// Slices
import creditSlice from './slices/credits'
import customerSlice from './slices/customers'
import userSlice from './slices/user'

export const store = configureStore({
  reducer: {
    credit: creditSlice,
    customer: customerSlice,
    user: userSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch