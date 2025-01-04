import React, { useState,useContext,useEffect} from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount,food_list,cartItem,url,token } = useContext(StoreContext);
 const navigate =useNavigate()

  const [data,setData]=useState({
    first_name:"",
    lastname:"",
    email:"",
    street:"",
    zip_code:"",
    country:"",
    phone:"",
    city:"",
    state:""
  })


  const onChangeHandler =(e)=>{
    const {name,value}=e.target
    setData({...data,[name]:value})
  }
const onSubmitHandler=async(e)=>{
  e.preventDefault()
  let orderItems=[]

  food_list.map((item)=>{
    if(cartItem[item._id]>0){
      let itemInfo=item;
      itemInfo.quantity=cartItem[item._id];
      orderItems.push(itemInfo)
    }
  })
let orderData={
  address:data,
  items:orderItems,
  amount:getTotalCartAmount()+2
}
try{
  let response=await axios.post(url+'/api/order/place',orderData,{headers:{token}})
  console.log(response.data)
  const {session_url}=response.data
  window.location.replace(session_url)
}
catch(err){
  console.log(err)
}
}
useEffect(()=>{
  if(!token){
    navigate('/cart')
  }
  else if(getTotalCartAmount()==0)
    navigate('/cart')
},[token])
 
  return (
    <form  onSubmit={onSubmitHandler} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Address Information</p>

        <div className="multi-fields">
          <input name="first_name" value={data.first_name} onChange={(e)=>onChangeHandler(e)}type="text" placeholder="first Name" />
          <input name="last_name" value={data.last_name} onChange={(e)=>onChangeHandler(e)}type="text" placeholder="Last Name" />
        </div>

        <input name="email" value={data.email} onChange={(e)=>onChangeHandler(e)}type="email" placeholder="email address" />
        <input name="street" value={data.street} onChange={(e)=>onChangeHandler(e)}type="text" placeholder="Street" />
        
        <div className="multi-fields">
        <input name="city" value={data.city} onChange={(e)=>onChangeHandler(e)}type="text" placeholder="City" />
        <input name="state" value={data.state} onChange={(e)=>onChangeHandler(e)}type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
        <input name="zip_code" value={data.zip_code} onChange={(e)=>onChangeHandler(e)}type="text" placeholder="Zip code" />
        <input name="country" value={data.country} onChange={(e)=>onChangeHandler(e)}type="text" placeholder="Country" />
        </div>
        <input name="phone" value={data.phone} onChange={(e)=>onChangeHandler(e)}type="text" placeholder="phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>SubTotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount() == 0 ? 0 : 40}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <p>₹{getTotalCartAmount() == 0 ? 0 : getTotalCartAmount() + 40}</p>
          </div>


          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};
export default PlaceOrder;