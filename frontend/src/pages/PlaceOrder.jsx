import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import './PlaceOrder.css'

const PlaceOrder = () => {
  const { cartItems, foodList, getTotalCartAmount, url, token } = useContext(StoreContext)
  const navigate = useNavigate()
  const [data, setData] = useState({ firstName: '', lastName: '', email: '', street: '', city: '', state: '', zipcode: '', country: '', phone: '' })

  const onChangeHandler = (e) => setData({ ...data, [e.target.name]: e.target.value })

  const placeOrder = async (e) => {
    e.preventDefault()
    let orderItems = []
    foodList.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ foodId: item._id, name: item.name, price: item.price, quantity: cartItems[item._id], image: item.image })
      }
    })
    const orderData = { items: orderItems, amount: getTotalCartAmount() + 2, address: data }
    try {
      const response = await fetch(`${url}/api/order/place`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', token }, body: JSON.stringify(orderData),
      })
      const result = await response.json()
      if (result.success) window.location.replace(result.session_url)
      else alert('Error placing order')
    } catch (error) { alert('Error placing order') }
  }

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input name="firstName" value={data.firstName} onChange={onChangeHandler} type="text" placeholder="First name" required />
          <input name="lastName" value={data.lastName} onChange={onChangeHandler} type="text" placeholder="Last name" required />
        </div>
        <input name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Email address" required />
        <input name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder="Street" required />
        <div className="multi-field">
          <input name="city" value={data.city} onChange={onChangeHandler} type="text" placeholder="City" required />
          <input name="state" value={data.state} onChange={onChangeHandler} type="text" placeholder="State" required />
        </div>
        <div className="multi-field">
          <input name="zipcode" value={data.zipcode} onChange={onChangeHandler} type="text" placeholder="Zip code" required />
          <input name="country" value={data.country} onChange={onChangeHandler} type="text" placeholder="Country" required />
        </div>
        <input name="phone" value={data.phone} onChange={onChangeHandler} type="text" placeholder="Phone" required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>${getTotalCartAmount()}</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Fee</p><p>${getTotalCartAmount() === 0 ? 0 : 2}</p></div>
            <hr />
            <div className="cart-total-details"><p>Total</p><p>${getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)}</p></div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
