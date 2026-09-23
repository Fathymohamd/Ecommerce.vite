import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Tilt from "react-parallax-tilt";
import {
  fetchAllProducts,
  fetchById,
} from "../../Redux/createSlice";

import { Link } from "react-router-dom";

import { FaStar, FaHeart } from "react-icons/fa6";

import { getCart, addToCart } from "../../Redux/cartSlice";

import {
  getCartwishlist,
  addToCartwishlist,
} from "../../Redux/wishlistSlice";

import { toast } from "react-hot-toast";

import { useTranslation } from "react-i18next";

const ProductDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const [mainImage, setMainImage] = useState("");

  const [selectedImage, setSelectedImage] = useState("");

  const product = useSelector(
    (state) => state.counter.productsTolist
  );

  const products = useSelector(
    (state) => state.counter.data
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  const cartData = useSelector(
    (state) => state.counter.cartData
  );

  const wishlistData = useSelector(
    (state) => state.wishlist?.wishlist || []
  );

  const similarProducts = products.filter(
    (item) =>
      item.category === product?.category &&
      item.id !== product?.id
  );

  useEffect(() => {
    dispatch(fetchById(id));
    dispatch(fetchAllProducts());
    dispatch(getCart());

    if (user) {
      dispatch(getCartwishlist());
    }
  }, [dispatch, id, user]);

  const totalPrice = cartData.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  useEffect(() => {
    if (product) {
      setSelectedImage(
        product.image || product.images?.[0]
      );
    }
  }, [product]);

  if (!product) {
    return (
      <div className="productNotFound">
        <h2>
          {t("productDetail.productNotFound")}
        </h2>

        <button onClick={() => navigate("/products")}>
          {t("productDetail.backToProducts")}
        </button>
      </div>
    );
  }

  const images = product.images?.length
    ? product.images
    : [product.image];

  const rating =
    product.rating?.rate || product.rating || 4.5;

  const reviews =
    product.rating?.count || 0;

  const handleAddToCart = () => {
    navigate("/checkout");
  };

  const handleAddToCarT = async (product) => {
    if (!user) {
      toast.error(
        t("productDetail.pleaseLoginFirst")
      );

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
        t("productDetail.productAddedToCart"),
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
          t("productDetail.somethingWentWrong")
      );
    }
  };


  const handleAddToWishlist = async (product) => {
    if (!user) {
      toast.error(
        t("productDetail.pleaseLoginFirst")
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
        t("addedToWishlist"),
        {
          duration: 3000,
          position: "top-right",
        }
      );

      dispatch(getCartwishlist());
    } else {
      toast.error(
        result.payload ||
          t("addedToWishlist.somethingWentWrong")
      );
    }
  };

  const isInWishlist = wishlistData.some(
    (item) =>
      item.product?._id === product._id ||
      item.product === product._id
  );

  return (
    <div className="productDetails">

      {/* Breadcrumb */}
      <div className="productBreadcrumb">
        {t("productDetail.home")} /{" "}
        {t("productDetail.products")} /{" "}
        {t(`products.${product.id}.title`)}
      </div>

      <div className="productDetailsContainer">

      
        <div className="productImages">

          <div className="thumbnailList">

            {images.map((image, index) => (
              <button
                key={index}
                className={
                  selectedImage === image
                    ? "thumbnail active"
                    : "thumbnail"
                }
                onClick={() =>
                  setSelectedImage(image)
                }
              >
                <img
                  src={image}
                  alt={product.title}
                />
              </button>
            ))}

          </div>

          <div className="mainProductImage">

            <img
              src={selectedImage}
              alt={product.title}
            />

            {/* =========================
                Wishlist Button
            ========================= */}
            <button
              className={
                isInWishlist
                  ? "productWishlistBtn active"
                  : "productWishlistBtn"
              }
              onClick={() =>
                handleAddToWishlist(product)
              }
              title={t(
                "productDetail.addToWishlist"
              )}
            >
              <FaHeart />
            </button>

          </div>

        </div>

   
        <div className="productInfo">

          <h3>
            {t(`products.${product.id}.title`)}
          </h3>

          <div className="ratingRow">

            <span className="rating">
              {rating} ★
            </span>

            <span className="reviewText">
              {reviews}{" "}
              {t("productDetail.ratings")}
            </span>

          </div>

          <div className="divider" />

          <div className="priceSection">

            <span className="priceLabel">
              {t("productDetail.price")}:
            </span>

            <span className="productPrice">
              ${product.price}
            </span>

          </div>

          <p className="taxText">
            {t("productDetail.taxIncluded")}
          </p>

          <div className="divider" />

          <div className="productDescription">

            <h3>
              {t("productDetail.aboutThisItem")}
            </h3>

            <p>
              {t(
                `products.${product.id}.description`
              )}
            </p>

          </div>

          <div className="divider" />

          {/* Stock */}
          <div className="stock">

            <span>
              {t("productDetail.inStock")}
            </span>

          </div>

          <div className="productActions">

            <button
              className="addCartBtn"
              onClick={() =>
                handleAddToCarT(product)
              }
            >
              {t("productDetail.addToCart")}
            </button>

            <button
              className="buyNowBtn"
              onClick={handleAddToCart}
            >
              {t("productDetail.buyNow")}
            </button>

          </div>

        </div>
      </div>


  {similarProducts?.length > 0 && (
  <section className="relatedProducts">
    <h2>
      {t("productDetail.youMayAlsoLike")}
    </h2>

    <div className="relatedProductsGrid">
      {similarProducts.slice(0, 5).map((item) => (
        <Tilt
          key={item._id || item.id}
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
              to={`/products/${item.id}`}
            >
              <img
                src={item.image || item.images?.[0]}
                alt={item.title}
              />

              <h3>
                {t(`products.${item.id}.title`)}
              </h3>

              <div className="relatedRating">
                <FaStar />{" "}
                {item.rating?.rate || item.rating || 4.5}
              </div>

              <p className="relatedPrice">
                ${item.price}
              </p>
            </Link>

            <div className="relatedProductActions">
              <button
                onClick={() => handleAddToCarT(item)}
              >
                {t("productDetail.addToCart")}
              </button>

              <button
                className="relatedWishlistBtn"
                onClick={() => handleAddToWishlist(item)}
              >
                <FaHeart />
              </button>
            </div>
          </div>
        </Tilt>
      ))}
    </div>
  </section>
)}

    </div>
  );
};

export default ProductDetails;