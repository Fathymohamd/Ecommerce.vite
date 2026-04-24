import tt from "../../assets/imgs/3.svg"
import { FaStar } from "react-icons/fa";
import { useSelector , useDispatch  } from "react-redux";
import {fetchFakeStore , fetchSimilarProducts , addToCart } from  "../../Redux/createSlice"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Animation from "./Animation";
function Products() {
const dispatch = useDispatch()
const counter = useSelector((state) => state.counter.fakestoreap)
const category = useSelector((state) => state.counter.category)
console.log(category)
const Loading = useSelector((state) => state.counter.Loading )
 useEffect(()=>{
 dispatch(fetchFakeStore())
 dispatch(fetchSimilarProducts())
 } , [dispatch ])
  if(Loading) {return <Animation/>}

return (
  <div className='Raincoats'>
  {counter.map((item)=>(
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
)

}

export default Products