
import {
  FaStar,
  FaHeart,
  FaArrowRight,
  FaSpinner,
} from "react-icons/fa";

import { FaCartShopping } from "react-icons/fa6";

import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { getCart, addToCart } from "../../Redux/cartSlice";

import {
  getCartwishlist,
  addToCartwishlist,
} from "../../Redux/wishlistSlice";

import { fetchAllProducts } from "../../Redux/createSlice";

import { toast } from "react-hot-toast";

import { useTranslation } from "react-i18next";


const Fashion = () => {

  // =========================
  // Redux
  // =========================

  const loading = useSelector(
    (state) => state.counter.Loading
  );

  const data = useSelector(
    (state) => state.counter.data
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { t } = useTranslation();


  // =========================
  // State
  // =========================

  const [Category, setCategory] = useState("all");


  // =========================
  // Get Data
  // =========================

  useEffect(() => {

    dispatch(fetchAllProducts());

    dispatch(getCart());

    dispatch(getCartwishlist());

  }, [dispatch]);


  // =========================
  // Add To Cart
  // =========================

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

      toast.success(
        t("Product added to cart!"),
        {
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
            boxShadow:
              "0 8px 25px rgba(0, 0, 0, 0.12)",
          },
        }
      );

    } else {

      toast.error(
        result.payload ||
        t("Something went wrong")
      );

    }

  };




  const getCartwishlistState = async (product) => {

    if (!user) {

      toast.error(
        t("Please login first")
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);

      return;
    }


    const res = await dispatch(
      addToCartwishlist({
        productId: product._id,
        productModel: "externalproducts",
      })
    );


    if (addToCartwishlist.fulfilled.match(res)) {

      toast.success(
        t("Product added to wishlist!"),
        {
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
            boxShadow:
              "0 8px 25px rgba(0, 0, 0, 0.12)",
          },
        }
      );

    } else {

      toast.error(
        res.payload ||
        t("Something went wrong")
      );

    }

  };

  if (loading) {

    return (
      <div className="loading-container">

        <FaSpinner className="loader-icon" />

      </div>
    );

  }

const products = data.filter((product) => {
  const category = product.category?.toLowerCase();

  if (Category === "all") {
    return (
      category === "mens-shirts" ||
      category === "mens-shoes" ||
      category === "mens-watches" ||
      category === "womens-dresses" ||
      category === "womens-shoes" ||
      category === "womens-watches" ||
      category === "womens-bags" ||
      category === "tops" ||
      category === "sunglasses"
    );
  }

  // Selected Category
  return category === Category;
}) || [];

return (
  <>
    {/* Categories */}
    <div className="electronics-categories">

      <button
        onClick={() => setCategory("all")}
        className={
          Category === "all"
            ? "active"
            : ""
        }
      >
        {t("fashion.allFashion")}
      </button>

      <button
        onClick={() =>
          setCategory("mens-shirts")
        }
        className={
          Category === "mens-shirts"
            ? "active"
            : ""
        }
      >
        {t("fashion.mensShirts")}
      </button>

      <button
        onClick={() =>
          setCategory("mens-shoes")
        }
        className={
          Category === "mens-shoes"
            ? "active"
            : ""
        }
      >
        {t("fashion.mensShoes")}
      </button>

      <button
        onClick={() =>
          setCategory("mens-watches")
        }
        className={
          Category === "mens-watches"
            ? "active"
            : ""
        }
      >
        {t("fashion.mensWatches")}
      </button>

      <button
        onClick={() =>
          setCategory("womens-dresses")
        }
        className={
          Category === "womens-dresses"
            ? "active"
            : ""
        }
      >
        {t("fashion.womensDresses")}
      </button>

      <button
        onClick={() =>
          setCategory("womens-shoes")
        }
        className={
          Category === "womens-shoes"
            ? "active"
            : ""
        }
      >
        {t("fashion.womensShoes")}
      </button>

      <button
        onClick={() =>
          setCategory("womens-watches")
        }
        className={
          Category === "womens-watches"
            ? "active"
            : ""
        }
      >
        {t("fashion.womensWatches")}
      </button>

      <button
        onClick={() =>
          setCategory("womens-bags")
        }
        className={
          Category === "womens-bags"
            ? "active"
            : ""
        }
      >
        {t("fashion.womensBags")}
      </button>

      <button
        onClick={() =>
          setCategory("tops")
        }
        className={
          Category === "tops"
            ? "active"
            : ""
        }
      >
        {t("fashion.tops")}
      </button>

      <button
        onClick={() =>
          setCategory("sunglasses")
        }
        className={
          Category === "sunglasses"
            ? "active"
            : ""
        }
      >
        {t("fashion.sunglasses")}
      </button>

    </div>

    {products.length === 0 ? (
      <div className="empty-category">

        <h2>
          {t("fashion.noFashionProductsFound")}
        </h2>

        <p>
          {t("fashion.noFashionProductsAvailable")}
        </p>

      </div>
    ) : (

      <div className="category-grid">

        {products.map((product) => (

          <div
            className="category-card"
            key={product._id}
          >

            {/* Wishlist */}
            <button
              className="category-heart"
              onClick={() =>
                getCartwishlistState(product)
              }
            >
              <FaHeart />
            </button>

            <Link to={`/products/${product.id}`}>
              <div className="category-image">

                <img
                  src={
                    product.images?.[0] ||
                    product.thumbnail
                  }
                  alt={t(
                    `products.${product.id}.title`,
                    {
                      defaultValue: product.title,
                    }
                  )}
                />

              </div>
            </Link>

            <div className="category-info">

              <span className="category-name">
                {t(
                  `categories.${product.category}`,
                  {
                    defaultValue: product.category,
                  }
                )}
              </span>

              <h2>
                {t(
                  `products.${product.id}.title`,
                  {
                    defaultValue: product.title,
                  }
                )}
              </h2>

              <div className="category-rating">

                <span>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </span>

                <small>
                  {product.rating
                    ? product.rating.toFixed(1)
                    : "4.5"}
                </small>

              </div>

              {/* Price */}
              <div className="category-price">
                ${product.price}
              </div>

              {/* Cart */}
              <button
                className="category-cart"
                onClick={() =>
                  handleAddToCart(product)
                }
              >
                <FaCartShopping />
                {t("fashion.addToCart")}
              </button>

            </div>
          </div>

        ))}

      </div>
    )}
  </>
  );

};


export default Fashion;
