import { useEffect } from "react";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchFakeStore} from "../../Redux/createSlice";
import { Link } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import {getCart , addToCart} from "../../Redux/cartSlice"
import {getCartwishlist    , addToCartwishlist} from "../../Redux/wishlistSlice"
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
function BestSellers() {
const { t } = useTranslation();
const fakestoreap = useSelector((state)=> state.counter.fakestoreap)
const user = useSelector((state) => state.auth.user);
const dispatch = useDispatch()
useEffect(()=>{
dispatch(fetchFakeStore())
dispatch(getCart())
dispatch(getCartwishlist())
} , [dispatch])

const handleAddToCart = async (product) => {

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

return (
  <section className="best-sellers">

    <div className="best-sellers-container">

      <div className="best-sellers-header">

        <div>
          <span className="best-label">
            {t("bestSellers.customerFavorites")}
          </span>

          <h2>
            {t("bestSellers.best")}{" "}
            <span>{t("bestSellers.sellers")}</span>
          </h2>

          <p>
            {t("bestSellers.description")}
          </p>
        </div>

        <a
          href="/productsShopNow"
          className="best-view-all"
        >
          {t("bestSellers.viewAll")}
          <FaArrowRight />
        </a>

      </div>

      <div className="best-products-grid">

        {fakestoreap?.data?.map((product) => {
          return (
         
   <Tilt
              key={product._id}
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              perspective={1000}
              scale={1.03}
              transitionSpeed={1000}
              glareEnable={true}
              glareMaxOpacity={0.12}
              glareColor="#ffffff"
              glarePosition="all"
              className="product-card-tilt"
            >
                    <article
            className="best-product-card"
            key={product?._id}
          >

            <div className="best-image-wrapper">

              <a href={`/Fakestoreapi/${product.id}`}>

                <div className="best-image-box">

                  <img
                    src={product.image}
                    alt={product.title}
                    className="best-product-image"
                  />

                </div>

              </a>

              <span className="best-badge">
                {t("bestSellers.bestSeller")}
              </span>

              <button
                onClick={() => getCartwishlistState(product)}
                className="best-wishlist"
                type="button"
                aria-label={t("bestSellers.addToWishlist")}
              >
                <FaHeart />
              </button>

            </div>

         <span className="best-category">
  {t(`fakestoreapi.${product.id}.title`)}
</span>

            <div className="best-product-info">

              <div className="best-rating">

                <strong>
                  ${Number(product.price).toFixed(2)}
                </strong>

                <div className="best-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} />
                  ))}
                </div>

                <span>
                  {product.rating?.rate ?? 0}
                </span>

                <small>
                  ({product.rating?.count ?? 0})
                </small>

              </div>

              <div className="best-sold">
                🔥 {product.sold ?? 0} {t("bestSellers.sold")}
              </div>

              <div className="best-price">

                <strong>
                  ${Number(product.price).toFixed(2)}
                </strong>

                {product.oldPrice && (
                  <del>
                    ${Number(product.oldPrice).toFixed(2)}
                  </del>
                )}

              </div>

              <button
                type="button"
                className="best-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                <FaShoppingCart />
                {t("bestSellers.addToCart")}
              </button>

            </div>

          </article>
</Tilt>
          )
        }
 

        )}

      </div>

    </div>

  </section>
);
  
}

export default BestSellers;