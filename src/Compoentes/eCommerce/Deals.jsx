import React, { useEffect, useState } from "react";
import { FaCartShopping, FaHeart   , FaSpinner} from "react-icons/fa6";
import { useDispatch  , useSelector} from "react-redux";
import {getCart , addToCart} from "../../Redux/cartSlice"
import { toast } from "react-hot-toast";
import {getCartwishlist    , addToCartwishlist} from "../../Redux/wishlistSlice"
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Deals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
const { t } = useTranslation();
useEffect(()=>{
  dispatch(getCart())
  dispatch(getCartwishlist())
} , [dispatch])
  useEffect(() => {
    const getDeals = async () => {
      try {
        const res = await fetch("hhttps://ecommerce-vite-two.vercel.app/api/products");

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        
   const deals = data?.products?.filter(
  (product) => product.price < 10
);
        setProducts(deals);
      } catch (error) {
        console.log("DEALS ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    getDeals();
  }, []);


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
   <section className="deals-page">

  <div className="deals-header">
    <div>
      <h1>{t("deals.todaysDeals")}</h1>

      <p>{t("deals.saveMore")}</p>
    </div>

    <span className="deals-count">
      {products.length} {t("deals.deals")}
    </span>
  </div>

 
  {products.length === 0 ? (
    <div className="no-deals">
      <h2>{t("deals.noDealsAvailable")}</h2>

      <p>{t("deals.checkBackLater")}</p>
    </div>
  ) : (
    <div className="deals-grid">
      {products.map((product) => {
        const oldPrice =
          product.price /
          (1 - product.discountPercentage / 100);

        return (
          <div className="deal-card" key={product._id}>

         
            <div className="discount-badge">
              {Math.round(product.discountPercentage)}%{" "}
              {t("deals.off")}
            </div>

            <button
              className="deal-heart"
              onClick={() => getCartwishlistState(product)}
              aria-label={t("deals.addToWishlist")}
            >
              <FaHeart />
            </button>

            <Link to={`/products/${product.id}`}>
              <div className="deal-image">
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

            <div className="deal-info">

              <h3>
                {t(`products.${product.id}.title`, {
                  defaultValue: product.title,
                })}
              </h3>

              <div className="deal-price">
                <span className="new-price">
                  ${product.price}
                </span>

                <span className="old-price">
                  ${oldPrice.toFixed(2)}
                </span>
              </div>

             
              <div className="deal-progress">
                <div className="progress-bar">
                  <span></span>
                </div>

                <small>
                  {t("deals.limitedTimeDeal")}
                </small>
              </div>

  
              <button
                className="deal-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                <FaCartShopping />
                {t("deals.addToCart")}
              </button>

            </div>
          </div>
        );
      })}
    </div>
  )}

</section>
  );
};

export default Deals;