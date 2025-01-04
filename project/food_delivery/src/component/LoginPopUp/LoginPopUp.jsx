import React, { useContext, useEffect } from 'react'
import './LogInPopUp.css'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'


const LogInPopUp = ({setShowLogin}) => {
    const {url,setToken} =useContext(StoreContext)
   const [curState,setState] = useState('login')
   const [data,setData]=useState(
    {
        name:"",
        email:"",
        password:"",
    })
   const onChangeHandler =(e)=>{
    const {name,value}=e.target;
    setData({...data,[name]:value});
   }/*
   useEffect(()=>{
    console.log(data)
},[data])*/
   const onLogin = async(e)=>{
    e.preventDefault();
    let newUrl = url;
    if(curState==='signup'){
        newUrl+='/api/user/register'
    }
    else{
        newUrl+='/api/user/login'
    }
    try{
        const response = await axios.post(newUrl,data)
        serToken(response.data.token)
        localStorage.setItem("token",response.data.token)
        setShowLogin(false)

    }catch (error){
        toast.error(error.response.data.message)

    }
        const response = await axios.post(newUrl,data)
        if(response.data.token)
            {
            setToken(response.data.token);
            localStorage.setItem('token',response.data.token)
            setShowLogin(false);
        }
    }
   
    return (
        <div className="login-popup">
        <form onSubmit={onLogin} action="" className='login-popup-container'>
            <div className='login-popup-title'>
                <h2>{curState==='signup'? 'Sign Up':'Log In'}</h2>
                <img src={assets.cross_icon} onClick={()=>setShowLogin(false)} alt=""/>
            </div>
            <div className='login-popup-inputs'>
              {curState==='signup' && <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder='your Name' required/>}
                <input name='email' onChange={onChangeHandler} type='email' placeholder='Your Email' required/>
                <input name='password' onChange={onChangeHandler} type='password' placeholder='Your Password' required/>
            </div>
            <button type='submit' className='button'>{curState==='signup'?'Sign Up':'Log In'}</button>
            <div className='login-popup-condition'>
                <input type='checkbox' />
                <p>By continuing, I agree to the terms and conditions</p>
            </div>
            {
                curState === 'signup'
            ?<p>Already have an account?<span onClick={()=>setState('login')}><b>Log In</b> </span></p>
            :<p>Do not have an account?<span onClick={()=>setState('signup')}> <b>Create Account.</b></span></p>
            
            
        }
        </form>
        </div>
    )
}

export default LogInPopUp;