import React, { useEffect } from 'react'
import { FaStar } from "react-icons/fa";
import SideBar from './SideBar'
import { Link } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import {fetchAllProducts ,  addToCart} from  "../../Redux/createSlice"
function ContinueShopping() {
const counter = useSelector((state)=> state.counter.data)
const fakestoreapProucd = useSelector((state)=> state.counter.fakestoreap)
const Login = useSelector((state) => state.counter.Loading)
let dispatch = useDispatch()
useEffect(()=>{
  dispatch(fetchAllProducts())
} , [dispatch])

  return (
<div>
<div className="continus">
<SideBar/>
<div className="fakestoreap_Data">
<div className="product_Fathy">
    {counter.slice(0 , 6).map((item) => (
   <div key={item.id}  className="card">
          <Link to={`/products/${item.id}`} className="link">
        <img id="img_products" src={item.images[0]} />
        <div className="Slider_center">
          <h1 title={item.title}>{item.title}</h1>
             {/* <div className="stock">IN STOCK</div> */}
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
<div className="fakestoreap">
  {fakestoreapProucd.slice(0,6).map((item)=>(
  <div className="array">
        <div className="products" key={item.id}>
     <Link className="link" to={`/Fakestoreapi/${item.id}`}>
        <img id="image" src={item.image}/>
        <div className="title_item" title={item.title}>{item.title}</div>
        <div className="stock">IN STOCK</div>
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
</div>
  )
}

export default ContinueShopping