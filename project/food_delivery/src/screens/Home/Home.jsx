import React from 'react'
import './Home.css'
import Header from '../../component/Header/Header'
import ExploreMenu from '../../component/ExploreMenu/ExploreMenu'
import { useState } from 'react'
import FoodDisplay from '../../component/FoodDisplay/FoodDisplay'
import AppDownload from '../../component/AppDownload/AppDownload'
import FoodItemCard from '../../component/FoodItemCard/FoodItemCard'

const Home = () => {
  const [category,setCategory]=useState('All');
  return (
    <div className='home'>
     <Header/>
     <ExploreMenu category={category} setCategory={setCategory}/>
    <FoodDisplay category={category}/>
    <AppDownload />
    </div>
  )
}

export default Home