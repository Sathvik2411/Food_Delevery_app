import react from 'react';
import { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url}) => {
  //const url = 'http://localhost:4000'
  const [list,setList] = useState([])
  const fecthList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    console.log(response.data)
    if (response.data.success) {
      setList(response.data.data)
    }
    else {
      toast.error(response.data.message)
    }
  }

  useEffect(() =>{
    fecthList()
  },[])

const removeFood=async(foodId)=>{
  const response=await axios.delete(`${url}/api/food/remove`,{params:{id:foodId}})
  await fecthList()
  // console.log(response.data)
  if(response.data.success){
    toast.success(response.data.message)
  }
  else{
    toast.error(response.data.message)
  }
}

  return (
    <div className='list add flex-col'>

      <p><b><h2>All Foods List</h2></b></p>
      <div className='list-table'>
        <div className='list-table-format title'>
        <p><b>Image</b></p>
        <p><b>Name</b></p>
        <p><b>category</b></p>
        <p><b>price</b></p>
        <p><b>Action</b></p>
      </div>
      {
      list.map((item,index)=>{
        return(
          <div key={index} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt=""/>
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p  onClick={()=>removeFood(item._id)} className='cursor'>X</p>
          </div>
        )
      })
    }
    </div>
    </div>
  )
}

export default List