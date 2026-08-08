
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useSelector , useDispatch  } from "react-redux";
import {fetchAllProducts ,  addToCart} from  "../../Redux/createSlice"
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect } from "react";
import SideBar from "../eCommerce/SideBar"
import Animation from '../eCommerce/Animation';
import {useTranslation} from "react-i18next"
const MySlider = () => {
const {t , i18n} = useTranslation()

  const dispatch = useDispatch()
  const products = useSelector((state) => state.counter.data)
  const Loading = useSelector((state) => state.counter.Loading)

 useEffect(()=>{
 dispatch(fetchAllProducts())
 } , [dispatch])
 
 if(Loading) {return  <Animation/>}

  return (

  <div className='Raincoats'>
  {Array.isArray(products) && products?.map((item)=>(

  <div className="array">
   <div className="products" key={item.id}>
     <Link className="link"  to={`/products/${item.id}`}>
  
<img id="image" src={item.images[0]}/>
<div className="title_item" title= {i18n.language === "ar" ? t(`products.${item.id}.title`) : item.title}>
  {i18n.language === "ar" ? t(`products.${item.id}.title`) : item.title}
</div>
  
        <div className="statr">
          <FaStar color="rgb(255, 255, 0)"/>
          <FaStar color="rgb(255, 255, 0)"/>
          <FaStar color="rgb(255, 255, 0)"/>
          <FaStar color="rgb(255, 255, 0)"/>
        </div>
            </Link>
          <div className="price">
          <span>$ {item.price}</span>
          <button className="buttonAdd" onClick={()=>{dispatch(addToCart(item))}}>{t("Add To Cart")}</button>
        </div>
      </div>
     </div>
    ))}
  </div>


  );
};
export default MySlider;