import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Animation from '../eCommerce/Animation';
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
 import {FaCartShopping} from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useSelector , useDispatch } from 'react-redux';
import {  fetchFakeStoreid , addToCart  , fetchFakeStore  } from "../../Redux/createSlice";
function Fakestoreapi() {
const { id } = useParams();
  const action = useSelector((state) => state.counter.product)
  const counter = useSelector((state) => state.counter.fakestoreap)
  const Loading = useSelector((state) => state.counter.Loading )
 const similarProducts = counter.filter(
    (item) =>
      item.category === action.category &&
      item.id !== action.id
  )
  .slice(0, 3);
if(Loading) {return <Animation/>}
   const dispatch = useDispatch()
    useEffect(() => {
    dispatch(fetchFakeStoreid(id)); 
     dispatch(fetchFakeStore())
    }, [dispatch, id]);
  return (
    <div>
    {action && (
         <div className="productsData1">
         <div className="product_image"><img id="product_images" src={action.image} alt={action.title} />
          <div className="Sin_img">
     <div className="similar_products">
   {similarProducts.map((item) => (
     <img  id="similar_products1" 
     key={item.id}
       src={action.image}
       alt={item.title}
     />
   ))}
 </div>
          </div>
         </div>
          <div className="product_title">
           <h1 className="productTitle1">{action.title}</h1>
           <div className="statr"><FaStar color="rgb(255, 255, 0)"/>
           <FaStar color="rgb(255, 255, 0)"/><FaStar color="rgb(255, 255, 0)"/><FaStar color="rgb(255, 255, 0)"/></div>
              <div className="product_price">
              <div className="derr">$ <span>{action.price}</span></div>
           </div>
          <div className="description">{action.description}</div>
          <div className="stock"><span>Hurry Up! Only {action.stock} Left In stock</span></div>
          <button id="Add_To_Cart" onClick={()=> dispatch(addToCart(action))}>Add To Cart <FaCartShopping /> </button>
          </div>
         </div>
       )} 


      
            <Swiper id="slider_counter"
      modules={[Autoplay, Navigation]}
      navigation
      autoplay={{ delay: 2000 }}
      loop={true}
      slidesPerView={5}
    >
  {counter.map((item) => (
  <>
    <SwiperSlide key={item.id}>
       <div className="slider_counter_Ahamed">
           <Link to={`/Fakestoreapi/${item.id}`} className="link">
        <img id="image"src={item.image} />
        <div className="Slider_center_and">
          <h1 title={item.title}>{item.title}</h1>
            <div className="FaStar"><FaStar color="rgb(255, 255, 0)"/>
          <FaStar color="rgb(255, 255, 0)"/><FaStar color="rgb(255, 255, 0)"/><FaStar color="rgb(255, 255, 0)"/></div>
        </div>
        </Link>
        <div className="price">
          <span>$ {item.price}</span>
          <button className="buttonAdd" onClick={() => {dispatch(addToCart(counter))}}>Add To Cart</button>
        </div>
      </div>
  
    </SwiperSlide>
  </>
  ))}
</Swiper>

    </div>
  )
}

export default Fakestoreapi