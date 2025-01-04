import { createContext,useEffect,useState } from "react";
// import { food_list } from "../assets/assets";
import axios from 'axios'

export const StoreContext=createContext(null);


const StoreContextProvider = (props) => {

  const [token,setToken]=useState("");
  const url="http://localhost:4000"
const [cartItem,setCartItems]=useState({});

const addToCart=async (itemId)=>{
  if(!cartItem[itemId]){
    setCartItems({...cartItem,[itemId]:1})
  }
  else{
    setCartItems({...cartItem,[itemId]:cartItem[itemId]+1})
  }
  if(token)
    await axios.post(url+'/api/cart/add',{itemId},{headers:{token}})
}

const removeFromCart=async(itemId)=>{
  setCartItems({...cartItem,[itemId]:cartItem[itemId]-1})
  if(token)
    await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
}

const getTotalCartAmount = () => {
  let total=0;
  for(let item in cartItem){
    if (cartItem[item] > 0) {
    let itemInfo = food_list.find((food) => food._id===item);
    total += itemInfo.price * cartItem[item];
  }
}
  return total;
};


const[food_list,setFoodList]=useState([]);
const fetchFoodList=async()=>{ 
  const response = await axios.get(url+'/api/food/list')
  setFoodList(response.data.data)
}



const loadCartData=async (token)=>{
  const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
  console.log(response.data.cartData)
  setCartItems(response.data.cartData)
  console.log(cartItem)

}

useEffect(()=> {
  async function loadData() {
    await fetchFoodList();
    if(localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
      await loadCartData(localStorage.getItem("token"));
    }
  }
  loadData();
},[])

const ContextValues={
  token,
  setToken,
  url,
  food_list,
  cartItem,
  setCartItems,
  getTotalCartAmount,
  addToCart,
  removeFromCart
}
  return (
    <StoreContext.Provider value={ContextValues}>
        {props.children}
    </StoreContext.Provider>
  )
}

export {StoreContextProvider}