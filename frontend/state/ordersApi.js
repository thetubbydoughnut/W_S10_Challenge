import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const defaultUrl = 'http://localhost:9009/api/pizza/'

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({ baseUrl: defaultUrl}),
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => '/history',
        }),
    }),
});

export const { useGetOrdersQuery } = ordersApi;