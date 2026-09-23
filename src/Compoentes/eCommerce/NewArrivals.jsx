import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaArrowRight,
  FaSpinner,
} from "react-icons/fa";

import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { getCart, addToCart } from "../../Redux/cartSlice";

import {
  getCartwishlist,
  addToCartwishlist,
} from "../../Redux/wishlistSlice";

import { fetchAllProducts } from "../../Redux/createSlice";

import { toast } from "react-hot-toast";

import { useTranslation } from "react-i18next";

import Tilt from "react-parallax-tilt";

function NewArrivals() {
  const loading = useSelector((state) => state.counter.Loading);

  const dispatch = useDispatch();

  const Data = useSelector((state) => state.counter.data);

  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(getCart());
    dispatch(getCartwishlist());
  }, [dispatch]);

  const handleAddToCart = async (product) => {
    if (!user) {
      toast.error(t("newArrivals.pleaseLoginFirst"));

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
      toast.success(t("newArrivals.productAddedToCart"), {
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
      toast.error(
        result.payload || t("newArrivals.somethingWentWrong")
      );
    }
  };

  const getCartwishlistState = async (product) => {
    if (!user) {
      toast.error(t("newArrivals.pleaseLoginFirst"));

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
      toast.success(t("newArrivals.productAddedToWishlist"), {
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
      toast.error(
        res.payload || t("newArrivals.somethingWentWrong")
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

  return (
    <section className="new-arrivals">
      <div className="new-arrivals-container">

        <div className="new-arrivals-header">
          <div>
            <span className="new-label">
              {t("newArrivals.justAdded")}
            </span>

            <h2>
              {t("newArrivals.new")}{" "}
              <span>{t("newArrivals.arrivals")}</span>
            </h2>

            <p>
              {t("newArrivals.description")}
            </p>
          </div>

          <a
            href="/productsShopNow"
            className="new-view-all"
          >
            {t("newArrivals.viewAll")}
            <FaArrowRight />
          </a>
        </div>

        <div className="new-products-grid">
          {Data.slice(100).map((product) => {
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
                <article className="new-product-card">

                  <div className="new-image-wrapper">

                    <a href={`/products/${product.id}`}>
                      <img
                        src={product.images?.[0]}
                        alt={t(
                          `products.${product.id}.title`,
                          {
                            defaultValue: product.title,
                          }
                        )}
                        className="best-product-images"
                      />
                    </a>

                    <span className="new-badge">
                      {t("newArrivals.new")}
                    </span>

                    <button
                      onClick={() =>
                        getCartwishlistState(product)
                      }
                      type="button"
                      className="new-wishlist"
                      aria-label={t(
                        "newArrivals.addToWishlist"
                      )}
                    >
                      <FaHeart />
                    </button>

                  </div>

                  {/* INFO */}

                  <div className="new-product-info">

                    <span className="new-category">
                      {t(
                        `categories.${product.category}`,
                        {
                          defaultValue: product.category,
                        }
                      )}
                    </span>

                    <a
                      href={`/products/${product.id}`}
                      className="new-title"
                    >
                      {t(
                        `products.${product.id}.title`,
                        {
                          defaultValue: product.title,
                        }
                      )}
                    </a>

                    {/* RATING */}

                    <div className="new-rating">

                      <div className="new-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar key={star} />
                        ))}
                      </div>

                      <span>
                        {product.rating}
                      </span>

                      <small>
                        ({product.reviews})
                      </small>

                    </div>

                    <div className="new-price">
                      <strong>
                        ${product.price.toFixed(2)}
                      </strong>
                    </div>

                    <button
                      onClick={() =>
                        handleAddToCart(product)
                      }
                      type="button"
                      className="new-cart-btn"
                    >
                      <FaShoppingCart />

                      {t("newArrivals.addToCart")}
                    </button>

                  </div>

                </article>
              </Tilt>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default NewArrivals;