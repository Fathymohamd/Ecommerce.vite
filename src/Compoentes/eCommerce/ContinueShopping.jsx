import React, { useEffect } from 'react'
import { FaStar } from "react-icons/fa";
import SideBar from './SideBar'
import { Link } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import {fetchAllProducts    , addToCart} from  "../../Redux/createSlice"
function ContinueShopping() {
const data = useSelector((state)=> state.counter.data)
const categoryData = useSelector((state) => state.counter.categoryData)
const selectedCategories = useSelector((state) => state.counter.selectedCategories);
console.log(categoryData)
const Login = useSelector((state) => state.counter.Loading)
let dispatch = useDispatch()
const productsToShow =
  selectedCategories.length === 0
    ? data
    : data.filter((item) =>
        selectedCategories.includes(item.category)
      );

useEffect(()=>{
  dispatch(fetchAllProducts())
} , [dispatch])


  return (
<div>
<div className="continus">
<SideBar/>
<div className="fakestoreap_Data">
<div className="product_Fathy">
    {productsToShow?.map((item) => (
   <div key={item.id}  className="card">
          <Link to={`/products/${item.id}`} className="link">
        <img id="img_products" src={item.images?.[0]} />
        <div className="Slider_center">
          <h1 title={item.title}>{item.title}</h1>

            <div className="FaStar"><FaStar color="rgb(255, 255, 0)"/>
          <FaStar color="rgb(255, 255, 0)"/><FaStar color="rgb(255, 255, 0)"/><FaStar color="rgb(255, 255, 0)"/></div>
        </div>
        </Link>
        <div className="price">
          <span>$ {item.price}</span>
          <button className="buttonAdd" onClick={()=>{dispatch(addToCart(item))}}>Add To Cart</button>
        </div>
      </div>

  ))}
</div>
</div>
</div> 
</div>
  )
}

export default ContinueShopping