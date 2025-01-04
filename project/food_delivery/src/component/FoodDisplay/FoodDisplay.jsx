import React from 'react'
import { food_list } from '../../assets/assets'
import './FoodDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItemCard from '../../component/FoodItemCard/FoodItemCard'

const FoodDisplay = ({category}) => {
    const {food_list,url} = useContext(StoreContext);
    console.log(url)
  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className='food-display-list'>
                {food_list.map((food, index) => {
                  if(category===food.category || category==='All')
                    return <FoodItemCard key={index} id={food._id} name={food.name} image={food.image} price={food.price} description={food.description}/>
                })}
            
            </div>
    </div>
  )
}

export default FoodDisplay;