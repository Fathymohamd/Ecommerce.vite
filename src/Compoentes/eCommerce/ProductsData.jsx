import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts, fetchById   , addToCart   } from "../../Redux/createSlice";
import { useEffect  , useState} from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import {FaCartShopping} from "react-icons/fa6";
import Animation from '../eCommerce/Animation';
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
function ProductsData() {
  const {t , i18n} = useTranslation()
  const [mainImage, setMainImage] = useState("");
  const dispatch = useDispatch();
  const product = useSelector((state) => state.counter.productsTolist);
  const products = useSelector((state) => state.counter.data); 
  const loading = useSelector((state) => state.counter.Loading);
  const { id } = useParams();
const similarProducts = products.filter(
  (item) =>
    item.category === product.category &&
    item.id !== product.id
);
const productimages = products.find(item => item.id === Number(id));

  useEffect(() => {
  dispatch(fetchById(id));
  dispatch(fetchAllProducts());
  } , [dispatch, id]);


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
    <div>
   {product && (
        <div className="productsData">
        <div className="product_imgs"><img id="product_imgs" src={product.images?.[0]} alt={product.title} />
         <div className="Sin_img">
    <div className="similar_products">
{productimages?.images?.map((img, index) => (
  <img key={index} src={img}  id="similar_products" 
  onClick={()=> document.querySelector("#product_imgs").src = img} />
))}

</div>
         </div>
        </div>
         <div className="product_title">
          <h1 className="productTitle">{i18n.language === "ar" ? t(`products.${product.id}.title`) : product.title}</h1>
          <div className="statr"><FaStar color="rgb(255, 255, 0)"/>
          <FaStar color="rgb(255, 255, 0)"/><FaStar color="rgb(255, 255, 0)"/><FaStar color="rgb(255, 255, 0)"/></div>
             <div className="product_price">
             <div className="derr">$ <span>{product.price}</span></div>
             <div id="Availavility"> 
              {t(`products.${product.id}.availability`)} :
         </div>
          </div>
         <div className="description">  {i18n.language === "ar" ? t(`products.${product.id}.description`) 
         : product.description}</div>
     <div className="stock">
  <span>{t(`products.${product.id}.hurry`)}</span>
</div>
         <button id="Add_To_Cart" onClick={()=> handleAddToCart(product)}>{t("Add To Cart")} <FaCartShopping /> </button>
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
  {Array.isArray(similarProducts) && similarProducts.map((item) => (
  <>
    <SwiperSlide key={item.id}>
       <div className="slider_counter_Ahamed">
           <Link to={`/products/${item.id}`} className="link">
        <img id="img_products" src={item.images?.[0]} />
        <div className="Slider_center_and">
          <h1 title={item.title}>{t(`products.${product.id}.title`)}</h1>
            <div className="FaStar"><FaStar color="rgb(255, 255, 0)"/>
          <FaStar color="rgb(255, 255, 0)"/><FaStar color="rgb(255, 255, 0)"/><FaStar color="rgb(255, 255, 0)"/></div>
        </div>
        </Link>
        <div className="price">
          <span>$ {item.price}</span>
          <button className="buttonAdd" onClick={() => handleAddToCart(item)}>{t("Add To Cart")}</button>
        </div>
      </div>
  
    </SwiperSlide>
  </>
  ))}
</Swiper>
    </div>
  );
}

export default ProductsData




