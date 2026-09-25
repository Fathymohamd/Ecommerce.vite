import { Link ,useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
 import {FaCartShopping} from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useSelector , useDispatch } from 'react-redux';
import {  fetchFakeStoreid   , fetchFakeStore  } from "../../Redux/createSlice";
import { addToCart } from "../../Redux/cartSlice";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import Tilt from "react-parallax-tilt";

const Fakestoreapi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const {t , i18n} = useTranslation() 
const action = useSelector((state) => state.counter.product);
const counter = useSelector((state) => state.counter.fakestoreap);
const loading = useSelector((state) => state.counter.Loading);
  const user = useSelector((state) => state.auth.user);
const product = counter?.data?.find(
  (item) => item._id === id
);

const similarProducts =
  counter?.data?.filter(
    (item) =>
      item.category === action?.category &&
      item.id !== action?.id
  ) || [];

useEffect(() => {
  dispatch(fetchFakeStoreid(id));
  dispatch(fetchFakeStore());
}, [dispatch, id]);

const totalPrice = action?.price || 0;
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (action) {
      setSelectedImage(action.image);
    }
  }, [action]);

  if (!action) {
    return (
      <div className="productNotFound">
        <h2>Product not found</h2>
        <button onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    );
  }

const images = action?.image
  ? [action.image]
  : [];

  const rating = action.rating?.rate || action.rating || 4.5;
  const reviews = action.rating?.count || 0;

  // const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    navigate("/checkout");
  };


const handleAddToCarTt = async (product) => {

  if (!user) {
    toast.error(t("Please login first"));
    setTimeout(()=>{
      navigate("/login");
    }, 2000)
    return;
  }

  const result = await dispatch(addToCart({
          productId: product._id,
      productModel: "products",
  }));
 
  if (addToCart.fulfilled.match(result)) {
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
    
  } else {
    toast.error(result.payload || t("Something went wrong"));
  }
};
const getCartwishlistState = async (product) => {
  if (!user) {
    toast.error(t("Please login first"));
    setTimeout(()=>{
      navigate("/login");
    }, 2000)
    return;
  }
const res = await dispatch(addToCartwishlist({
        productId: product._id,
      productModel: "products",
}));
if(addToCartwishlist.fulfilled.match(res)){
  toast.success(t("Product added to wishlis!"), {
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
}else {
     toast.error(result.payload || t("Something went wrong"));
}
}


 if(loading){
  return <div className="loading-container">
  <FaSpinner className="loader-icon" />
</div>
 }

  return (

<div className="productDetails">

  <div className="productBreadcrumb">
    {t("productDetails.home")} /{" "}
    {t("productDetails.products")} /{" "}
  {t(`fakestoreapi.${action.id}.title`)}
  </div>

  <div className="productDetailsContainer">

    <div className="productImages">

      <div className="thumbnailList">
        {Array.isArray(images) &&
          images.map((image, index) => (
            <button
              key={index}
              className={
                selectedImage === image
                  ? "thumbnail active"
                  : "thumbnail"
              }
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={t(`products.${action.id}.title`, {
                  defaultValue: action.title,
                })}
              />
            </button>
          ))}
      </div>

      <div className="mainProductImage">
        <img
          src={selectedImage}
          alt={t(`products.${action.id}.title`, {
            defaultValue: action.title,
          })}
        />
      </div>

    </div>

    <div className="productInfo">

      <h1>
      {t(`fakestoreapi.${action.id}.title`)}
      </h1>

      <div className="ratingRow">

        <span className="rating">
          {rating} ★
        </span>

        <span className="reviewText">
          {reviews} {t("productDetails.ratings")}
        </span>

      </div>

      <div className="divider" />

      <div className="priceSection">

        <span className="priceLabel">
          {t("productDetails.price")}:
        </span>

        <span className="productPrice">
          ${action.price}
        </span>

      </div>

      <p className="taxText">
        {t("productDetails.taxIncluded")}
      </p>

      <div className="divider" />

      <div className="productDescription">

        <h3>
          {t("productDetails.aboutThisItem")}
        </h3>

        <p>
          {t(`products.${action.id}.description`, {
            defaultValue:
              action.description ||
              "High quality product with excellent performance and great value.",
          })}
        </p>

      </div>

      <div className="divider" />

      
      <div className="stock">
        <span>
          {t("productDetails.inStock")}
        </span>
      </div>

     
      <div className="quantitySection">
      </div>

      <div className="productActions">

        <button
          className="addCartBtn"
          onClick={() => handleAddToCarTt(action)}
        >
          {t("productDetails.addToCart")}
        </button>

        <button
          className="buyNowBtn"
          onClick={handleAddToCart}
        >
          {t("productDetails.buyNow")}
        </button>

      </div>



    </div>
  </div>

{similarProducts?.length > 0 && (
  <section className="relatedProducts">
    <h2>
      {t("productDetails.youMayAlsoLike")}
    </h2>

    <div className="relatedProductsGrid">
      {similarProducts.slice(0, 5).map((item) => (
        <Tilt
          key={item.id}
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          perspective={1000}
          scale={1.03}
          transitionSpeed={1000}
          glareEnable={true}
          glareMaxOpacity={0.15}
          glareColor="#ffffff"
          glarePosition="all"
          className="relatedProductTilt"
        >
          <div className="relatedProductCard">

            <Link
              className="link"
              to={`/Fakestoreapi/${item.id}`}
            >
              <img
                src={item.image}
                alt={t(`products.${item.id}.title`, {
                  defaultValue: item.title,
                })}
              />

              <h3>
             {t(`fakestoreapi.${action.id}.title`)}
              </h3>

              <div className="relatedRating">
                <FaStar /> {item.rating?.rate || 4.5}
              </div>

              <p className="relatedPrice">
                ${item.price}
              </p>
            </Link>

            <button
              onClick={() => handleAddToCarTt(item)}
            >
              {t("productDetails.addToCart")}
            </button>

          </div>
        </Tilt>
      ))}
    </div>
  </section>
)}
</div>


  );
};

export default Fakestoreapi;
