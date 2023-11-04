import { configureStore } from '@reduxjs/toolkit'
import basketSlice from './slices/basketSlice'
import productSlice from './slices/productSlice'

export const store = configureStore({
  reducer: {
    basket: basketSlice,
    product: productSlice
  },
})