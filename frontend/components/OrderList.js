import React from 'react'
import { useGetOrdersQuery } from '../state/ordersApi';

export default function OrderList() {
  const { data = [], error, isloading } = useGetOrdersQuery();
  if (isloading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          data.map((order) => {
            return (
              <li key={order.id}>
                <div>
                  {/* order details here */}
                  <h3></h3>
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
            const className = `button-filter${size === 'All' ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
