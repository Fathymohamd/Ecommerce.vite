import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts, fetchById  , fetchFakeStoreid , addToCart   } from "../../Redux/createSlice";
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

function ProductsData() {
  const [mainImage, setMainImage] = useState("");
  const dispatch = useDispatch();
  const product = useSelector((state) => state.counter.productsTolist);
  const products = useSelector((state) => state.counter.data); 
  const loading = useSelector((state) => state.counter.Loading);
  const similarProducts = products.filter((item) =>  
    item.category === product?.category && item.id !== product?.id).slice(0 , 4);
  const { id } = useParams();

  useEffect(() => {
      dispatch(fetchById(id));
  dispatch(fetchFakeStoreid(id)); 
    dispatch(fetchAllProducts());
  }, [dispatch, id]);

  useEffect(() => {
  if (product) {
    setMainImage(product.thumbnail);
  }
}, [product]);


if (loading) {return <Animation/>}

  return (
    <div>
   {product && (
        <div className="productsData">
        <div className="product_imgs"><img  src={mainImage} alt={product.title} />
         <div className="Sin_img">
    <div className="similar_products">
  {similarProducts.map((item) => (
    <img   onClick={() => setMainImage(item.thumbnail)} id="similar_products" 
    key={item.id}
      src={item.thumbnail}
      alt={item.title}
    />
  ))}
</div>
         </div>
        </div>
         <div className="product_title">
          <h1 className="productTitle">{product.title}</h1>
          <div className="statr"><FaStar color="rgb(255, 255, 0)"/>
          <FaStar color="rgb(255, 255, 0)"/><FaStar color="rgb(255, 255, 0)"/><FaStar color="rgb(255, 255, 0)"/></div>
             <div className="product_price">
             <div className="derr">$ <span>{product.price}</span></div>
             <div id="Availavility">Availavility: <span>{product.availabilityStatus}</span></div>
          </div>
         <div className="description">{product.description}</div>
         <div className="stock"><span>Hurry Up! Only {product.stock} Left In stock</span></div>
         <button id="Add_To_Cart" onClick={()=> dispatch(addToCart(product))}>Add To Cart <FaCartShopping /> </button>
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
  {products.map((item) => (
  <>
    <SwiperSlide key={item.id}>
       <div className="slider_counter_Ahamed">
           <Link to={`/products/${item.id}`} className="link">
        <img id="img_products" src={item.images?.[0]} />
        <div className="Slider_center_and">
          <h1 title={item.title}>{item.title}</h1>
            <div className="FaStar"><FaStar color="rgb(255, 255, 0)"/>
          <FaStar color="rgb(255, 255, 0)"/><FaStar color="rgb(255, 255, 0)"/><FaStar color="rgb(255, 255, 0)"/></div>
        </div>
        </Link>
        <div className="price">
          <span>$ {item.price}</span>
          <button className="buttonAdd" onClick={() => {dispatch(addToCart(product))}}>Add To Cart</button>
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




