import { createSlice, createSelector } from "@reduxjs/toolkit";

const emptyArray = [];

const selectOrders = state => {
    // console.log(Object.keys(state.ordersApi.queries))
    const query = state.ordersApi.queries['getOrders(undefined)'];
    return query && query.data ? query.data : emptyArray;
}

export const selectFilteredOrders = createSelector(
    [selectOrders, (state, size) => size],
    (orders, size) => orders.filter(order => order.size === size)
)


export const filters = {
    ALL: 'ALL',
    S: 'S',
    M: 'M',
    L: 'L',
}

const initialState = {
    fullName: '',
    size: '',
    toppings: [],
    filterBy: filters.ALL,
}


export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    
    reducers: {
        setFilter(state, action) {
            state.filterBy = action.payload;
        }
    }
});

export const { setFilter } = ordersSlice.actions
