import { createSlice } from "@reduxjs/toolkit";

// let id = 1
// export const getNextId = () => id++
const initialState = {
    fullName: '',
    size: '',
    toppings: []
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        
    }
})