import React from 'react'
import './Footer.css'
import{assets} from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
            <img src={assets.logo} alt=""/>
            <p>Food is the basic human need to stay alive. Moreover, it is the need of every living organism. Therefore it is important that we should not waste food. Our world consists of different types of cultures. These cultures have varieties of dishes of food in them. </p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt=""/>
                <img src={assets.twitter_icon} alt=""/>
                <img src={assets.linkedin_icon} alt=""/>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Get in touch</h2>
            <ul>
                <li>+91-9591106749</li>
                <li>help@tomato.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>copyright 2024 @ 2021 tomato.com. All rights reserved</p>
      </div>
  )
}

export default Footer