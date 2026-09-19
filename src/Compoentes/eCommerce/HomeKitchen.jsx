import React, { useEffect, useState } from "react";

import {
  FaCartShopping,
  FaHeart,
  FaStar,
  FaSpinner,
} from "react-icons/fa6";

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

const HomeKitchen = () => {
  const [products, setProducts] = useState("all");

  const loading = useSelector(
    (state) => state.counter.Loading
  );

  const Data = useSelector(
    (state) => state.counter.data
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  const navigate = useNavigate();

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const homeKitchen = Array.isArray(Data)
    ? Data.filter((product) => {
        const category =
          product.category?.toLowerCase();

        if (products === "all") {
          return (
            category === "home-decoration" ||
            category === "kitchen-accessories" ||
            category === "groceries"
          );
        }

        return category === products;
      })
    : [];

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(getCart());
    dispatch(getCartwishlist());
  }, [dispatch]);

  const handleAddToCart = async (product) => {
    if (!user) {
      toast.error(t("homeKitchen.pleaseLoginFirst"));

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
        t("homeKitchen.productAddedToCart"),
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
          t("homeKitchen.somethingWentWrong")
      );
    }
  };

  // =========================
  // Add To Wishlist
  // =========================

  const getCartwishlistState = async (product) => {
    if (!user) {
      toast.error(t("homeKitchen.pleaseLoginFirst"));

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
        t("homeKitchen.productAddedToWishlist"),
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
          t("homeKitchen.somethingWentWrong")
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

  // =========================
  // JSX
  // =========================

  return (
    <section className="deals-page">

      {/* ================= HEADER ================= */}

      <div className="deals-header">

        <div>

          <h1>
            {t("homeKitchen.title")}
          </h1>

          <p>
            {t("homeKitchen.description")}
          </p>

        </div>

        <span className="deals-count">
          {homeKitchen.length}{" "}
          {t("homeKitchen.products")}
        </span>

      </div>

      {/* ================= FILTER BUTTONS ================= */}

      <div className="electronics-categories">

        <button
          onClick={() => setProducts("all")}
          className={
            products === "all"
              ? "active"
              : ""
          }
        >
          {t("homeKitchen.allHomeKitchen")}
        </button>

        <button
          onClick={() =>
            setProducts("home-decoration")
          }
          className={
            products === "home-decoration"
              ? "active"
              : ""
          }
        >
          {t("homeKitchen.homeDecoration")}
        </button>

        <button
          onClick={() =>
            setProducts("kitchen-accessories")
          }
          className={
            products === "kitchen-accessories"
              ? "active"
              : ""
          }
        >
          {t("homeKitchen.kitchenAccessories")}
        </button>

        <button
          onClick={() =>
            setProducts("groceries")
          }
          className={
            products === "groceries"
              ? "active"
              : ""
          }
        >
          {t("homeKitchen.groceries")}
        </button>

      </div>

      {/* ================= PRODUCTS ================= */}

      {homeKitchen.length === 0 ? (

        <div className="no-deals">

          <h2>
            {t("homeKitchen.noProductsFound")}
          </h2>

          <p>
            {t("homeKitchen.noProductsAvailable")}
          </p>

        </div>

      ) : (

        <div className="deals-grid">

          {homeKitchen.map((product) => {

            const oldPrice =
              product.discountPercentage
                ? product.price /
                  (1 -
                    product.discountPercentage / 100)
                : product.price;

            return (

              <div
                className="deal-card"
                key={product._id}
              >

                {/* ================= DISCOUNT ================= */}

                {product.discountPercentage && (

                  <div className="discount-badge">

                    {Math.round(
                      product.discountPercentage
                    )}

                    %{" "}
                    {t("homeKitchen.off")}

                  </div>

                )}

                {/* ================= WISHLIST ================= */}

                <button
                  className="deal-heart"
                  onClick={() =>
                    getCartwishlistState(product)
                  }
                >
                  <FaHeart />
                </button>

                {/* ================= IMAGE ================= */}

                <Link
                  to={`/products/${product.id}`}
                >
                  <div className="deal-image">

                    <img
                      src={
                        product.images?.[0] ||
                        product.thumbnail
                      }
                      alt={t(
                        `products.${product.id}.title`,
                        {
                          defaultValue:
                            product.title,
                        }
                      )}
                    />

                  </div>
                </Link>

                {/* ================= INFO ================= */}

                <div className="deal-info">

                  {/* Category */}

                  <span className="category-name">
                    {t(
                      `categories.${product.category}`,
                      {
                        defaultValue:
                          product.category,
                      }
                    )}
                  </span>

                  {/* Title */}

                  <h3>
                    {t(
                      `products.${product.id}.title`,
                      {
                        defaultValue:
                          product.title,
                      }
                    )}
                  </h3>

                  {/* Rating */}

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
                        ? typeof product.rating === "number"
                          ? product.rating.toFixed(1)
                          : product.rating.rate?.toFixed(1)
                        : "4.5"}
                    </small>

                  </div>

                  {/* ================= PRICE ================= */}

                  <div className="deal-price">

                    <span className="new-price">
                      ${product.price}
                    </span>

                    {product.discountPercentage && (

                      <span className="old-price">
                        ${oldPrice.toFixed(2)}
                      </span>

                    )}

                  </div>

                  {/* ================= PROGRESS ================= */}

                  <div className="deal-progress">

                    <div className="progress-bar">
                      <span></span>
                    </div>

                    <small>
                      {t("homeKitchen.limitedTimeDeal")}
                    </small>

                  </div>

                  {/* ================= CART ================= */}

                  <button
                    className="deal-cart-btn"
                    onClick={() =>
                      handleAddToCart(product)
                    }
                  >
                    <FaCartShopping />

                    {t("homeKitchen.addToCart")}
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

export default HomeKitchen;

