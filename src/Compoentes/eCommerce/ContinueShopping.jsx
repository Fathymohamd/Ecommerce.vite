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


  <div className='Raincoats1'>
  {productsToShow?.map((item)=>(

  <div className="array">
   <div className="products" key={item.id}>
     <Link className="link"  to={`/products/${item.id}`}>
  
        <img id="image" src={item.images[0]}/>
        <div className="title_item" title={item.title}>{item.title}</div>
  
        <div className="statr">
          <FaStar color="rgb(255, 255, 0)"/>
          <FaStar color="rgb(255, 255, 0)"/>
          <FaStar color="rgb(255, 255, 0)"/>
          <FaStar color="rgb(255, 255, 0)"/>
        </div>
            </Link>
          <div className="price">
          <span>$ {item.price}</span>
          <button className="buttonAdd" onClick={()=>{dispatch(addToCart(item))}}>Add To Cart</button>
        </div>
      </div>
     </div>
    ))}
  </div>
</div> 
</div>
  )
}

export default ContinueShopping