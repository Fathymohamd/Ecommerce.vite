import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaArrowRight,
  FaSpinner
} from "react-icons/fa";

import React, { useEffect, useState } from 'react'
import { useSelector  , useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {getCart , addToCart} from "../../Redux/cartSlice"
import {getCartwishlist    , addToCartwishlist} from "../../Redux/wishlistSlice"

import {fetchAllProducts} from "../../Redux/createSlice"
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
function FeaturedProducts() {
  const loading = useSelector((state) => state.counter.Loading);
  const dispatch = useDispatch();
  const Data = useSelector((state) => state.counter.data);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
const { t } = useTranslation();
useEffect(()=>{
  dispatch(fetchAllProducts())
  dispatch(getCart())
  dispatch(getCartwishlist())
} , [dispatch])

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
<section className="featured-products">
  <div className="featured-container">

    <div className="featured-header">

      <div className="featured-heading">

        <span className="section-label">
          {t("featured.topPicks")}
        </span>

        <h2>
          {t("featured.featured")}{" "}
          <span>
            {t("featured.products")}
          </span>
        </h2>

        <p>
          {t("featured.description")}
        </p>

      </div>

      <a
        href="/ProductsShopNow"
        className="featured-view-all"
      >
        {t("featured.viewAll")}
        <FaArrowRight />
      </a>

    </div>

    <div className="featured-grid">

      {Data.slice(5, 29).map((product) => (

        <article
          className="product-card"
          key={product.id}
        >

          <div className="product-image-wrapper">

            <a
              href={`/products/${product.id}`}
              className="product-image-link"
            >
              <img
                src={product.images?.[0]}
                alt={t(
                  `products.${product.id}.title`,
                  {
                    defaultValue: product.title,
                  }
                )}
              />
            </a>

            <span className="product-badge">
              {product.badge
                ? product.badge
                : t("featured.new")}
            </span>

            <button
              onClick={() =>
                getCartwishlistState(product)
              }
              type="button"
              className="wishlist-btn"
              aria-label={t("featured.addToWishlist")}
            >
              <FaHeart />
            </button>

          </div>

          <div className="product-info">

            <span className="product-category">
              {t(
                `categories.${product.category}`,
                {
                  defaultValue: product.category,
                }
              )}
            </span>

            <a
              href={`/products/${product.id}`}
              className="product-title"
            >
              {t(
                `products.${product.id}.title`,
                {
                  defaultValue: product.title,
                }
              )}
            </a>

            <div className="product-rating">

              <div className="stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <span>
                {product.rating}
              </span>

              <small>
                ({product.reviews})
              </small>

            </div>

            <div className="product-price">
              <strong>
                ${product.price.toFixed(2)}
              </strong>
            </div>

            <button
              onClick={() =>
                handleAddToCart(product)
              }
              type="button"
              className="add-cart-btn"
            >
              <FaShoppingCart />
              {t("featured.addToCart")}
            </button>

          </div>

        </article>

      ))}

    </div>
  </div>
</section>
  );
}

export default FeaturedProducts;