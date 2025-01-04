import React from 'react' 
import { useState } from 'react'
import Navbar from './component/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './screens/Home/Home'
import Cart from './screens/Cart/Cart'
import PlaceOrder from './screens/PlaceOrder/PlaceOrder'
import Footer from './component/Footer/Footer'
import LoginPopUp from './component/LoginPopUp/LoginPopUp'
import Verify from './screens/Verify/Verify'
import MyOrder from './screens/MyOrder/MyOder'

const App = ()=>{
const[showLogin,setShowLogin] = useState(false)
  return (
    <>
    {
      showLogin ? <LoginPopUp setShowLogin={setShowLogin}/> :<></>
    }
   
    <div className='app'>
    <Navbar setShowLogin={setShowLogin}/>
    <Routes>
     <Route path='/' element={<Home/>} />
     <Route path='/cart' element={<Cart/>} />
     <Route path='/order' element={<PlaceOrder/>} />
     <Route path='/verify' element={<Verify/>} />  
     <Route path='/MyOrder' element={<MyOrder/>} />    
        
     </Routes>
     </div>
     <Footer/>
     </>
  )
 }

 export default App