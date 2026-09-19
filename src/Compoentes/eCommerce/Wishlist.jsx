import { Link } from "react-router-dom";

import {
  FaHeart,
  FaTrash,
  FaCartShopping,
} from "react-icons/fa6";

import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { addToCart } from "../../Redux/cartSlice";

import {
  getCartwishlist,
  romovewishlistdelet,
} from "../../Redux/wishlistSlice";

import { toast } from "react-hot-toast";

import { useTranslation } from "react-i18next";

const Wishlist = () => {
  const wishlist = useSelector(
    (state) => state.wishlist.wishlist || []
  );

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleDelete = async (id) => {
    const result = await dispatch(romovewishlistdelet(id));

    if (romovewishlistdelet.fulfilled.match(result)) {
      toast.success(
        t("wishlist.productRemovedFromWishlist"),
        {
          icon: null,
          style: {
            color: "#ff0000",
          },
        }
      );
    } else {
      toast.error(
        result.payload ||
          t("wishlist.failedToRemoveProduct"),
        {
          icon: null,
          style: {
            color: "#ff0000",
          },
        }
      );
    }
  };

  useEffect(() => {
    dispatch(getCartwishlist());
  }, [dispatch]);

  const handleAddToCart = async (item) => {
    if (!item.product) {
      toast.error(t("wishlist.productNotFound"));
      return;
    }

    const result = await dispatch(
      addToCart(item.product)
    );

    if (addToCart.fulfilled.match(result)) {
      toast.success(
        t("wishlist.productAddedToCart"),
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
          t("wishlist.failedToAddProduct"),
        {
          duration: 3000,
          position: "top-right",
        }
      );
    }
  };

  return (
    <div className="wishlist-page">

      <div className="wishlist-header">
        <div>
          <h1>
            {t("wishlist.myWishlist")}
          </h1>

          <p>
            {t("wishlist.description")}
          </p>
        </div>

        <div className="wishlist-count">
          <FaHeart />

          <span>
            {wishlist.length}{" "}
            {t("wishlist.items")}
          </span>
        </div>
      </div>

      <div className="wishlist-content">

        <div className="wishlist-items">

          {wishlist.length === 0 ? (

            <div className="empty-wishlist">

              <div className="empty-wishlist-icon">
                <FaHeart />
              </div>

              <h2>
                {t("wishlist.emptyTitle")}
              </h2>

              <p>
                {t("wishlist.emptyDescription")}
              </p>

              <Link
                to="/ProductsShopNow"
                className="start-shopping-btn"
              >
                <FaCartShopping />

                {t("wishlist.startShopping")}
              </Link>

            </div>

          ) : (

            wishlist.map((item) => (

              <div
                className="wishlist-item"
                key={item._id}
              >

                <div className="wishlist-product-image">
                  <img
                    src={
                      item.product?.images?.[0] ||
                      item.product?.image
                    }
                    alt={
                      t(
                        `products.${item.product?.id}.title`,
                        {
                          defaultValue:
                            item.product?.title,
                        }
                      )
                    }
                  />
                </div>

                <div className="wishlist-product-info">

                  <span className="wishlist-category">
                    {t(
                      `categories.${item.product?.category}`,
                      {
                        defaultValue:
                          item.product?.category,
                      }
                    )}
                  </span>

                  {/* TITLE */}
                  <h3>
                    {t(
                      `products.${item.product?.id}.title`,
                      {
                        defaultValue:
                          item.product?.title,
                      }
                    )}
                  </h3>

                  {/* PRICE */}
                  <div className="wishlist-price">
                    ${item.product?.price}
                  </div>

                  {/* ADD TO CART */}
                  <button
                    type="button"
                    className="add-cart-btn"
                    onClick={() =>
                      handleAddToCart(item)
                    }
                  >
                    <FaCartShopping />

                    {t("wishlist.addToCart")}
                  </button>
                </div>

                {/* REMOVE BUTTON */}
                <button
                  onClick={() =>
                    handleDelete(item._id)
                  }
                  type="button"
                  className="remove-wishlist-btn"
                  aria-label={t(
                    "wishlist.removeFromWishlist"
                  )}
                >
                  <FaTrash />
                </button>

              </div>
            ))
          )}

        </div>

        {wishlist.length > 0 && (

          <div className="wishlist-summary">

            <h2>
              {t("wishlist.summary")}
            </h2>

            <div className="summary-row">

              <span>
                {t("wishlist.items")}
              </span>

              <strong>
                {wishlist.length}
              </strong>

            </div>

            <div className="summary-divider"></div>

            <Link
              to="/ProductsShopNow"
              className="continue-shopping-btn"
            >
              {t("wishlist.continueShopping")}
            </Link>

          </div>

        )}

      </div>
    </div>
  );
};

export default Wishlist;