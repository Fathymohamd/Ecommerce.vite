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
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
function Fakestoreapi() {
  const [t , i18n] = useTranslation()
const { id } = useParams();
  const action = useSelector((state) => state.counter.product)
  const counter = useSelector((state) => state.counter.fakestoreap)
  const Loading = useSelector((state) => state.counter.Loading)
const handleAddToCart = (product) => {
  
  dispatch(addToCart(product));
toast.success(t("Product added to cart!"), {
  duration: 3000,
  position: "top-right",
  style: {
    background: "#ffffff",
    color: "#222",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    padding: "14px 18px",
    fontSize: "15px",
    fontWeight: "500",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)",
  },
});
};



  const product = counter?.data?.find(
  (item) => item.id === Number(id)
);

const similarProducts =  counter?.data?.filter(
  (item) =>
    item.category === action.category &&
    item.id !== action.id
);

console.log(similarProducts)
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
         <div className="product_image"><img id="product_images" src={action?.image} alt={action.title} />
          <div className="Sin_img">
     <div className="similar_products">
<img id="product_image"
  src={product?.image}
  alt={product?.title}
  onClick={() =>
    document.getElementById("product_images").src = product.image
  }
/>
 </div>
 
          </div>
         </div>
          <div className="product_title">
           <h1 className="productTitle1">{t(`fakestoreapi.${action.id}.title`)}</h1>
           <div className="statr"><FaStar color="rgb(255, 255, 0)"/>
           <FaStar color="rgb(255, 255, 0)"/><FaStar color="rgb(255, 255, 0)"/><FaStar color="rgb(255, 255, 0)"/></div>
              <div className="product_price">
              <div className="derr">$ <span>{action.price}</span></div>
           </div>
          <div className="description">{t(`fakestoreapi.${action.id}.description`)}</div>
          <div className="stock"><span> {t(`fakestoreapi.${action.id}.hurry`)}</span></div>
          <button id="Add_To_Cart" onClick={()=> handleAddToCart(action)}>{t("Add To Cart")} <FaCartShopping /> </button>
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
  {Array.isArray(similarProducts) && similarProducts?.map((item) => (
  <>
    <SwiperSlide key={item.id}>
       <div className="slider_counter_Ahamed">
           <Link to={`/Fakestoreapi/${item.id}`} className="link">
        <img id="image"src={item.image} />
        <div className="Slider_center_and">
          <h1 title={t(`fakestoreapi.${action.id}.title`)}>{t(`fakestoreapi.${action.id}.title`)}</h1>
            <div className="FaStar"><FaStar color="rgb(255, 255, 0)"/>
          <FaStar color="rgb(255, 255, 0)"/><FaStar color="rgb(255, 255, 0)"/><FaStar color="rgb(255, 255, 0)"/></div>
        </div>
        </Link>
        <div className="price">
          <span>$ {item.price}</span>
          <button className="buttonAdd" onClick={()=> handleAddToCart(action)}>{t("Add To Cart")} </button>
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