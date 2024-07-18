import { configureStore } from '@reduxjs/toolkit'
import { ordersApi } from './ordersApi'
import { ordersSlice } from './ordersSlice'
import pizzaFormReducer from '../state/formSlice'

const exampleReducer = (state = { count: 0 }) => {
  return state
}

export const resetStore = () => configureStore({
  reducer: {
    example: exampleReducer,
    // add your reducer(s) here
    orders: ordersSlice.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    PizzaForm: pizzaFormReducer,

  },
  middleware: getDefault => getDefault().concat(
    // if using RTK Query for your networking: add your middleware here
    ordersApi.middleware
    // if using Redux Thunk for your networking: you can ignore this
  ),
})

export const store = resetStore()
