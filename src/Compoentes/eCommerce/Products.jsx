import tt from "../../assets/imgs/3.svg"
import { FaStar } from "react-icons/fa";
import { useSelector , useDispatch  } from "react-redux";
import {fetchFakeStore  , addToCart } from  "../../Redux/createSlice"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Animation from "./Animation";
import { useTranslation } from "react-i18next";
import {useState} from "react"
import toast from "react-hot-toast";
function Products() {

const { t, i18n } = useTranslation();
const dispatch = useDispatch()
const counter = useSelector((state) => state.counter.fakestoreap)
const category = useSelector((state) => state.counter.category)
const Loading = useSelector((state) => state.counter.Loading )
 useEffect(()=>{
 dispatch(fetchFakeStore())
 } , [ dispatch ] )
  if(Loading) {return <Animation/>}

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

return (
  <div className='Raincoats'>
  {counter?.data?.map((item)=>(

  <div className="array">
   <div className="products" key={item.id}>
     <Link className="link" to={`/Fakestoreapi/${item.id}`}>
  
        <img id="image" src={item.image}/>
        <div className="title_item" title={i18n.language === "ar" ? t(`fakestoreapi.${item.id}.title`) : item.title}>
          {i18n.language === "ar" ? t(`fakestoreapi.${item.id}.title`) : item.title}</div>
        <div className="stock">{t("IN STOCK")}</div>
        <div className="statr">
          <FaStar color="rgb(255, 255, 0)"/>
          <FaStar color="rgb(255, 255, 0)"/>
          <FaStar color="rgb(255, 255, 0)"/>
          <FaStar color="rgb(255, 255, 0)"/>
        </div>
            </Link>
          <div className="price">
          <span>$ {item.price}</span>
          <button className="buttonAdd"
          onClick={() => handleAddToCart(item)} >{t("Add to Cart")}</button>
        </div>
 
      </div>
     </div>
    ))}
  </div>
)

}

export default Products