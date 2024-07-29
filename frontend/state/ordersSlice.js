import { createSlice, createSelector } from "@reduxjs/toolkit";

const emptyArray = [];

const selectOrders = state => {
    // console.log(Object.keys(state.ordersApi.queries))
    const query = state.ordersApi.queries['getOrders(undefined)'];
    return query && query.data ? query.data : emptyArray;
}

export const selectFilteredOrders = createSelector(
    [selectOrders, (state, size) => size],
    (orders, size) => {
        if(size === filters.ALL) {
        return orders;
    } 
    return orders.filter(order => order.size === size);
}
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
    loading: false,
    error: null,
    orders: [],
    errorMessage: '',
}


export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    
    reducers: {
        setFilter(state, action) {
            state.filterBy = action.payload;
        },
        startLoading: (state) => {
            state.loading = true
        },
        hasError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getOrderSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        }
    }
});

export const { setFilter, getOrderSuccess, setErrorMessage, startLoading, hasError } = ordersSlice.actions
