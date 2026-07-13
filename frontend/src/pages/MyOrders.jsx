import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import './MyOrders.css'

const MyOrders = () => {
  const { url, token } = useContext(StoreContext)
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${url}/api/order/userorders`, { headers: { token } })
      const data = await response.json()
      if (data.success) setOrders(data.data)
    } catch (error) { console.error('Error fetching orders:', error) }
  }

  useEffect(() => { if (token) fetchOrders() }, [token])

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="my-orders-container">
        {orders.length === 0 && <p style={{ textAlign: 'center', color: '#888', padding: '40px' }}>No orders yet</p>}
        {orders.map((order, index) => (
          <div key={index} className="my-orders-order">
            <div className="my-orders-order-items">
              {order.items.map((item, idx) => (
                <span key={idx}>{item.name} x{item.quantity}{idx < order.items.length - 1 ? ', ' : ''}</span>
              ))}
            </div>
            <div className="my-orders-order-info">
              <p>Items: {order.items.length}</p>
              <p>Amount: ${order.amount}</p>
              <p className={`order-status ${order.status.toLowerCase().replace(/\s/g, '-')}`}>{order.status}</p>
            </div>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders
