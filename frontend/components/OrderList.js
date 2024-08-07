import React from 'react'
import { useGetOrdersQuery } from '../state/ordersApi';
import { setFilter, filters, getOrderSuccess, selectFilteredOrders, startLoading, hasError } from '../state/ordersSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function OrderList() {
  const dispatch = useDispatch();
  const queryResult = useGetOrdersQuery(undefined, {
    onStarted: () => {
      dispatch(startLoading());
    },
    onSuccess: (data) => {
      dispatch(getOrderSuccess(data));
    },
    onError: (error) => {
      dispatch(hasError(error));
    },
  });
  console.log('queryResult: ', queryResult)
  const filter = useSelector(state => state.orders.filterBy);
  const orders = useSelector(state => selectFilteredOrders(state, filter));
  
  
    console.log('Filter: ', filter)
    console.log('Filtered Orders: ', orders)

  const filteredOrders = orders ? orders.filter(order => filter === 'ALL' 
    || order.size.toUpperCase() === filter) 
    : [];

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          filteredOrders.map((order) => {
            const toppings = order.toppings || [];
            const toppingsText = toppings.length > 0 ? toppings.length : 'no';
            console.log('order: ', order)
            return (
              <li key={order.id}>
                <div>
                  {/* order details here */}
                  {order.customer} ordered a size {order.size} with {toppingsText} topping
                  {toppingsText === 'no' && toppingsText == 1 ? '' : 's'}
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
              >{size}</button>
          })
        }
      </div>
    </div>
  )
}
