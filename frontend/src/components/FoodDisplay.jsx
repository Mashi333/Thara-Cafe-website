import React, { useContext } from 'react'
import './FoodDisplay.css'
import FoodItem from './FoodItem'
import { StoreContext } from '../context/StoreContext'

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext)
  const filteredFoods = category === 'All' ? foodList : foodList.filter((item) => item.category === category)

  return (
    <div className="food-display" id="food-display">
      <h2>{category === 'All' ? 'Top dishes near you' : `Dishes in ${category}`}</h2>
      <div className="food-display-list">
        {filteredFoods.map((item) => (
          <FoodItem key={item._id} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} category={item.category} />
        ))}
      </div>
    </div>
  )
}

export default FoodDisplay
