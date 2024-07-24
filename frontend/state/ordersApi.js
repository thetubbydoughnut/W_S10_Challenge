import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const defaultUrl = 'http://localhost:9009/api/pizza/'

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({ baseUrl: defaultUrl}),
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => 'history',
        }),
        submitForm: builder.mutation({
            query: (formData) => ({
                url: 'order',
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }),
        
    }),
});

export const { useGetOrdersQuery, useSubmitFormMutation } = ordersApi;