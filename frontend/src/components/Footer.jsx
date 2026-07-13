import React from 'react'
import './Footer.css'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h2>Thara Cafe.</h2>
          <p>Discover a world of flavors at Thara Cafe. We craft every dish with passion and the finest ingredients to bring joy to your taste buds.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook" />
            <img src={assets.twitter_icon} alt="twitter" />
            <img src={assets.linkedin_icon} alt="linkedin" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul><li>Home</li><li>About us</li><li>Delivery</li><li>Privacy policy</li></ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul><li>+1-212-456-7890</li><li>contact@tharacafe.com</li></ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 TharaCafe.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
