import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'

const Verify = () => {
  const [searchParams] = useSearchParams()
  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')
  const { url, token } = useContext(StoreContext)

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        await fetch(`${url}/api/order/verify`, {
          method: 'POST', headers: { 'Content-Type': 'application/json', token },
          body: JSON.stringify({ orderId, success }),
        })
      } catch (error) { console.error('Error verifying payment:', error) }
    }
    if (orderId) verifyPayment()
  }, [orderId, success])

  return (
    <div style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
      {success === 'true' ? (
        <>
          <h2 style={{ color: '#155724' }}>Payment Successful!</h2>
          <p style={{ color: '#49557e' }}>Your order has been placed.</p>
          <a href="/myorders" style={{ padding: '10px 25px', background: '#ff4c3b', color: '#fff', textDecoration: 'none', borderRadius: '8px' }}>View My Orders</a>
        </>
      ) : (
        <>
          <h2 style={{ color: '#856404' }}>Payment Failed</h2>
          <p style={{ color: '#49557e' }}>Please try again.</p>
          <a href="/cart" style={{ padding: '10px 25px', background: '#ff4c3b', color: '#fff', textDecoration: 'none', borderRadius: '8px' }}>Go to Cart</a>
        </>
      )}
    </div>
  )
}

export default Verify
