import React from 'react'
import './MenuCategory.css'
import { menu_list } from '../assets/assets'

const MenuCategory = ({ category, setCategory }) => {
  return (
    <div className="menu-category" id="explore-menu">
      <h2>Explore our menu</h2>
      <p className="menu-category-text">Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience.</p>
      <div className="menu-category-list">
        {menu_list.map((item, index) => (
          <div key={index} onClick={() => { setCategory(category === item.menu_name ? 'All' : item.menu_name); document.getElementById('food-display')?.scrollIntoView({ behavior: 'smooth' }); }} className={`menu-category-item ${category === item.menu_name ? 'active' : ''}`}>
            <img src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  )
}

export default MenuCategory
