import React from 'react'
import SideBar2 from './SideBar2'
import { useSelector , useDispatch } from 'react-redux'
import {useState  , useEffect} from "react"
import {fetchAllProductS , fetchAllProducts  , fetchProductsByCategory , toggleCategory} from "../../Redux/createSlice"
function SideBar() {

let dispatch = useDispatch();

const categories = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];


  return (
    <div>
    <div className="SideBar">
      <div className="spanadd"><p>PRODUCT CATEGORIES</p></div>
<div className="checkboks">

     {categories.map((category) => (
    <div className="checkbok" key={category}>
    <input className='win'
      type="checkbox"
      id={category}
         onChange={() => dispatch(toggleCategory(category))}
    />
    <label htmlFor={category}>
      {category}
    </label>
  </div>

))}
</div>

    <SideBar2/> 
    </div>
    </div>
  )
}

export default SideBar