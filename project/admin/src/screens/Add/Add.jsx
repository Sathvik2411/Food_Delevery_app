import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from 'axios'
import {toast} from 'react-toastify'

const Add = ({url}) => { 
  //const url="http://localhost:4000"
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }))
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    const response=await axios.post(`${url}/api/food/add`,formData)
    console.log(response.data)
    if(response.data.success){
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      })
      setImage(false)
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  };
  return (
    <div className="add">
      <form onSubmit={onSubmitHandler}>
        <div className="add-img-upload">
          <p> upload image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            id="image"
            hidden
            required
          />
    
        </div>
        <div className="add-product-name">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            type="text"
            value={data.name}
            name="name"
            placeholder="Type Here"
          />
        </div>
        <div className="add-product-description">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            placeholder="Write Content Here"
            rows="6"
          />
        </div>
        <div className="add-category-price">
          <div className="add-category">
            <p>Product Category</p>
            <select
              name="category"
              onChange={onChangeHandler}
              value={data.category}
            >
              <option value=""></option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwitch">Sandwitch</option>
              <option value="cake">cake</option>
              <option value="icecreams">IceCreams</option>
              <option value="Pizza">Pizza</option>
              <option value="Pasta">Pasta</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="20₹"
            />
          </div>
          <button type="submit" className="add-btn">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
