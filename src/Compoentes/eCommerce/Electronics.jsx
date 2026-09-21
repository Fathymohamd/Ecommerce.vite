import React, { useEffect, useState } from "react";
import { FaCartShopping, FaHeart, FaStar  , FaSpinner} from "react-icons/fa6";
import { useParams , useNavigate, Link } from "react-router-dom"
import { useDispatch  , useSelector} from "react-redux";
import { toast } from "react-hot-toast";
import {getCart , addToCart} from "../../Redux/cartSlice"
import {getCartwishlist    , addToCartwishlist} from "../../Redux/wishlistSlice"
import {fetchAllProducts } from "../../Redux/createSlice"
import { useTranslation } from "react-i18next";
const Electronics = () => {
  const loading = useSelector((state) => state.counter.Loading);
  const user = useSelector((state) => state.auth.user);
  const Data = useSelector((state) => state.counter.data);
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const { category } = useParams();
const { t } = useTranslation();
useEffect(()=>{
   dispatch(fetchAllProducts())
  dispatch(getCart())
  dispatch(getCartwishlist())
} , [dispatch ])

const [categorydata, setCategory] = useState("all");

const products = Data.filter((product) => {
  const productCategory = product.category?.toLowerCase();

  if (categorydata === "all") {
    return (
      productCategory === "smartphones" ||
      productCategory === "laptops" ||
      productCategory === "tablets" ||
      productCategory === "mobile-accessories" ||
      productCategory === "computer-accessories" ||
      productCategory === "electronics"
    );
  }

  return productCategory === categorydata;
});

const handleAddToCart = async (product) => {
  if (!user) {
    toast.error(t("Please login first"));

    setTimeout(() => {
      navigate("/login");
    }, 2000);

    return;
  }

  const result = await dispatch(
    addToCart({
      productId: product._id,
      productModel: "externalproducts",
    })
  );

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
      productModel: "externalproducts",
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

<section className="electronics-page">

 
  <div className="electronics-header">
    <div>
      <h1>{t("electronics.electronics")}</h1>
      <p>
        {t("electronics.description")}
      </p>
    </div>

    <div className="electronics-count">
      {products.length} {t("electronics.products")}
    </div>
  </div>

 
  <div className="electronics-categories">
    <button
      onClick={() => setCategory("all")}
      className={categorydata === "all" ? "active" : ""}
    >
      {t("electronics.allElectronics")}
    </button>

    <button
      onClick={() => setCategory("smartphones")}
      className={categorydata === "smartphones" ? "active" : ""}
    >
      {t("electronics.smartphones")}
    </button>

    <button
      onClick={() => setCategory("laptops")}
      className={categorydata === "laptops" ? "active" : ""}
    >
      {t("electronics.laptops")}
    </button>

    <button
      onClick={() => setCategory("tablets")}
      className={categorydata === "tablets" ? "active" : ""}
    >
      {t("electronics.tablets")}
    </button>
  </div>

  {products.length === 0 ? (
    <div className="no-electronics">
      <h2>{t("electronics.noElectronicsFound")}</h2>
      <p>
        {t("electronics.noElectronicsAvailable")}
      </p>
    </div>
  ) : (
    <div className="electronics-grid">
      {products.map((product) => (
        <div
          className="electronics-card"
          key={product._id}
        >

       
          <button
            className="electronics-heart"
            onClick={() => getCartwishlistState(product)}
            aria-label={t("electronics.addToWishlist")}
          >
            <FaHeart />
          </button>

          <Link to={`/products/${product.id}`}>
            <div className="electronics-image">
              <img
                src={
                  product.images?.[0] ||
                  product.thumbnail
                }
                alt={t(`products.${product.id}.title`, {
                  defaultValue: product.title,
                })}
              />
            </div>
          </Link>

          {/* Product Info */}
          <div className="electronics-info">

            <p className="electronics-category">
              {t(`categories.${product.category}`, {
                defaultValue: product.category,
              })}
            </p>

            <h2>
              {t(`products.${product.id}.title`, {
                defaultValue: product.title,
              })}
            </h2>

         
            <div className="electronics-rating">
              <span className="stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </span>

              <span>
                {product.rating
                  ? product.rating.toFixed(1)
                  : "4.5"}
              </span>
            </div>

            <div className="electronics-price">
              ${product.price}
            </div>

            <button
              className="electronics-cart-btn"
              onClick={() =>
                handleAddToCart(product)
              }
            >
              <FaCartShopping />
              {t("electronics.addToCart")}
            </button>

          </div>
        </div>
      ))}
    </div>
  )}

</section>


  );
};

export default Electronics;