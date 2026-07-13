import React, { useEffect, useState } from 'react'
import './Orders.css'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const url = ''

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${url}/api/order/list`)
      const data = await response.json()
      if (data.success) {
        setOrders(data.data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const updateStatus = async (orderId, status) => {
    try {
      const response = await fetch(`${url}/api/order/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status }),
      })
      const data = await response.json()
      if (data.success) {
        fetchOrders()
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="orders">
      <h2>Orders</h2>
      <div className="orders-container">
        {orders.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888', padding: '40px' }}>
            No orders yet
          </p>
        )}
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-card-left">
              <div className="order-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <div className="order-card-items">
                {order.items.map((item, idx) => (
                  <p key={idx}>
                    {item.name} x{item.quantity}
                  </p>
                ))}
              </div>
            </div>
            <div className="order-card-middle">
              <p className="order-card-name">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="order-card-address">
                {order.address.street}, {order.address.city},{' '}
                {order.address.state} {order.address.zipcode},{' '}
                {order.address.country}
              </p>
              <p className="order-card-phone">{order.address.phone}</p>
            </div>
            <div className="order-card-right">
              <p>Items: {order.items.length}</p>
              <p>Amount: ${order.amount}</p>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
