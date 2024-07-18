import React from 'react'
import { useGetOrdersQuery } from '../state/ordersApi';
import { setFilter, filters, selectFilteredOrders } from '../state/ordersSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function OrderList() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.orders.filterBy);
  const { data, error, isloading } = useGetOrdersQuery();

  console.log("API Response: ", data)

  const orders = useSelector(state => 
    selectFilteredOrders(state, state.orders.filterBy));

    console.log('Filter: ', filter)
    console.log('Filtered Orders: ', orders)

  const filteredOrders = data ? data.filter(orders => filter === 'ALL' 
    || orders.size.toUpperCase() === filter) 
    : [];

  if (isloading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data) return <div> No data available</div>

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          filteredOrders.map((order) => {
            return (
              <li key={order.id}>
                <div>
                  {/* order details here */}
                  {order.customer} ordered a size {order.size} with {order.toppings.length} topping{order.toppings.length ? 's' : ''}
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
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
