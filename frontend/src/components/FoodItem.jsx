import React, { useContext } from 'react'
import './FoodItem.css'
import { StoreContext } from '../context/StoreContext'
import { assets } from '../assets/assets'

const FoodItem = ({ id, name, price, description, image, category }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={`${url}${image}`} alt={name}
          onError={(e) => { e.target.src = `https://via.placeholder.com/300x200?text=${category}` }} />
        {!cartItems[id] ? (
          <button className="add" onClick={() => addToCart(id)}>+</button>
        ) : (
          <div className="food-item-counter">
            <button onClick={() => removeFromCart(id)}>-</button>
            <p>{cartItems[id]}</p>
            <button onClick={() => addToCart(id)}>+</button>
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
