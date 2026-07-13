import React from 'react'
import './Header.css'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Satisfy your cravings and elevate your dining experience.</p>
        <a href="#explore-menu"><button>View Menu</button></a>
      </div>
      <img className="header-img" src={assets.header_img} alt="header" />
    </div>
  )
}

export default Header
