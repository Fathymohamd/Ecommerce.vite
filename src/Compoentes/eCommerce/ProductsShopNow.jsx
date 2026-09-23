import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchAllProducts } from "../../Redux/createSlice";

import { FaSpinner, FaHeart } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import { getCart, addToCart } from "../../Redux/cartSlice";

import {
  getCartwishlist,
  addToCartwishlist,
} from "../../Redux/wishlistSlice";

import { toast } from "react-hot-toast";

import { useTranslation } from "react-i18next";

import Tilt from "react-parallax-tilt";

const ProductsShopNow = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.counter.data);

  const loading = useSelector((state) => state.counter.Loading);

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
      toast.error(t("productsShopNow.pleaseLoginFirst"));

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
        t("productsShopNow.productAddedToCart"),
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
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)",
          },
        }
      );
    } else {
      toast.error(
        result.payload ||
          t("productsShopNow.somethingWentWrong")
      );
    }
  };

  const handleAddToWishlist = async (product) => {
    if (!user) {
      toast.error(
        t("productsShopNow.pleaseLoginFirst")
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);

      return;
    }

    const result = await dispatch(
      addToCartwishlist({
        productId: product._id,
        productModel: "externalproducts",
      })
    );

    if (addToCartwishlist.fulfilled.match(result)) {
      toast.success(
        t("productsShopNow.productAddedToWishlist"),
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
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)",
          },
        }
      );
    } else {
      toast.error(
        result.payload ||
          t("productsShopNow.somethingWentWrong")
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
    <div className="products-page">
      <h1>
        {t("productsShopNow.shopOurProducts")}
      </h1>

      <p>
        {t("productsShopNow.description")}
      </p>

      <div className="products-grid">
        {data.map((item) => {
          return (
            <Tilt
              key={item._id}
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
              <div className="product-card">
                <div className="product-image-wrapper">
                  <Link
                    className="link"
                    to={`/products/${item.id}`}
                  >
                    <img
                      src={
                        item.images?.[0] ||
                        item.image
                      }
                      alt={t(
                        `products.${item.id}.title`,
                        {
                          defaultValue: item.title,
                        }
                      )}
                    />
                  </Link>

                  {/* Heart */}
                  <button
                    className="wishlist-btn"
                    onClick={() =>
                      handleAddToWishlist(item)
                    }
                  >
                    <FaHeart />
                  </button>
                </div>

                <Link
                  className="link"
                  to={`/products/${item.id}`}
                >
                  <h3>
                    {t(
                      `products.${item.id}.title`,
                      {
                        defaultValue: item.title,
                      }
                    )}
                  </h3>

                  <p>
                    ${item.price}
                  </p>
                </Link>

                <button
                  className="add-cart-btn"
                  onClick={() =>
                    handleAddToCart(item)
                  }
                >
                  {t("productsShopNow.addToCart")}
                </button>
              </div>
            </Tilt>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsShopNow;