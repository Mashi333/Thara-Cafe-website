import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import './Cart.css'

const Cart = () => {
  const { cartItems, foodList, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)
  const navigate = useNavigate()
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const applyPromo = () => {
    if (promoCode === 'FLAT10') setDiscount(getTotalCartAmount() * 0.1)
    else { setDiscount(0); alert('Invalid promo code') }
  }

  const hasItems = Object.values(cartItems).some((qty) => qty > 0)

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p><p>Title</p><p>Price</p><p>Quantity</p><p>Total</p><p>Remove</p>
        </div>
        <br /><hr />
        {foodList.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p className="cart-items-remove-icon" onClick={() => removeFromCart(item._id)}>&times;</p>
                </div>
                <hr />
              </div>
            )
          }
          return null
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>${getTotalCartAmount()}</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Fee</p><p>${getTotalCartAmount() === 0 ? 0 : 2}</p></div>
            <hr />
            {discount > 0 && <><div className="cart-total-details"><p>Discount</p><p style={{ color: '#ff4c3b' }}>-${discount.toFixed(2)}</p></div><hr /></>}
            <div className="cart-total-details"><p>Total</p><p>${(getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2) - discount).toFixed(2)}</p></div>
          </div>
          <button onClick={() => navigate('/order')} disabled={!hasItems}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
            <button onClick={applyPromo}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
