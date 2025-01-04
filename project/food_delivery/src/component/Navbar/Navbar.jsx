import React from 'react';
import './Navbar.css';
import {assets} from '../../assets/assets'
import { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import {useContext} from 'react';

const Navbar=({setShowLogin})=>{
    const [menu,setMenu]=useState('home');
    const navigate=useNavigate;
    const {getTotalCartAmount,token,setToken}=useContext(StoreContext)

    const logout=()=>{
        localStorage.removeItem("token")
        setToken("")
        navigate("/")
    }
    return(
        <div className='navbar'>
           <Link to='/'  onClick={()=>setMenu('home')}><img className="logo" src={assets.logo} alt="Logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/'  className={menu==='home'?'active':''} onClick={()=>setMenu('home')}>home</Link>
                <a href='#explore-menu'className={menu==='menu'?'active':''} onClick={()=>setMenu('menu')}>menu</a>
                <a href='#app-download' className={menu==='mobile-app'?'active':''} onClick={()=>setMenu('mobile-app')}>mobile-app</a>
                <a href='#footer' className={menu==='contact-us'?'active':''} onClick={()=>setMenu('contact-us')}>contact-us</a>
            </ul>
            <div className="navbar-right">
            <img className="navbar-search-icon" src={assets.search_icon} alt="Search"/>
                <div className="navbar-cart-icon">
                    <Link to='/Cart'><img className="cart" src={assets.basket_icon} alt="basket"/></Link>
                    <div className="dot"></div>
                </div>

         {
            !token
           ?<button onClick={()=>setShowLogin(true)}>Sign Up</button>
                :<div className='navbar-profile'>
                    <img src={assets.profile_icon} alt=""/>
                    <ul className='navbar-profile-dropdown'>
                    <li onClick={()=>navigate('/myorder')}><img src={assets.bag_icon} alt=""/>Orders</li>
                    <hr/>
                    <li onClick={logout}><img src={assets.logout_icon} alt=""/>Logout</li>
                    </ul>
            </div>
            }
        </div>
        </div>
    )
}
export default Navbar;