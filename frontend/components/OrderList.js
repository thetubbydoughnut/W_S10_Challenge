import React, { useEffect } from 'react'
import { useGetOrdersQuery } from '../state/ordersApi';
import { setFilter, filters, getOrderSuccess, selectFilteredOrders } from '../state/ordersSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function OrderList() {
  const dispatch = useDispatch();
  const { data: ordersApiData, error, isloading } = useGetOrdersQuery(undefined, {
    onSuccess: (data) => {
      dispatch(getOrderSuccess(data));
    },
  });
  const filter = useSelector(state => state.orders.filterBy);
  const orders = useSelector(state => selectFilteredOrders(state, filter))

  useEffect(() => {
    console.log("API Response: ", ordersApiData)
  }, [ordersApiData])

    console.log('Filter: ', filter)
    console.log('Filtered Orders: ', orders)

  const filteredOrders = orders ? orders.filter(order => filter === 'ALL' 
    || order.size.toUpperCase() === filter) 
    : [];

  if (isloading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!ordersApiData) return <div> No data available</div>

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          filteredOrders.map((order) => {
            const toppings = order.toppings || [];
            return (
              <li key={order.id}>
                <div>
                  {/* order details here */}
                  {order.customer} ordered a size {order.size} with {toppings > 0 ? toppings.length : 'no'} topping
                  {toppings && toppings.length == 1 ? '' : 's'}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size.toUpperCase() === filter ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              onClick={() => dispatch(setFilter(filters[size.toUpperCase()]))}
              className={className}
              key={size}
              disabled={!ordersApiData}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
