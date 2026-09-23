import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaArrowLeft,
  FaLock,
  FaSpinner,
} from "react-icons/fa";

import { FiPackage } from "react-icons/fi";

import { useTranslation } from "react-i18next";

import { toast } from "react-hot-toast";

import {
  getCart,
  updateQuantity,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../Redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const cart = useSelector((state) => state.cart.cart);



  const [error, setError] = useState("");

  const handleIncrease = async (id) => {
    try {
      setError("");

      const updatedCart = await increaseQuantity(id);

      if (updatedCart) {
        dispatch(updateQuantity(updatedCart));
      }
    } catch (error) {
      setError(
        error.response?.data?.message || t("cart.somethingWentWrong")
      );
    }
  };

  const handleDecrease = async (id) => {
    try {
      setError("");

      const updatedCart = await decreaseQuantity(id);

      if (updatedCart) {
        dispatch(updateQuantity(updatedCart));
      }
    } catch (error) {
      setError(
        error.response?.data?.message || t("cart.somethingWentWrong")
      );
    }
  };

  const handleDelete = async (id) => {
    const result = await dispatch(removeFromCart(id));

    if (removeFromCart.fulfilled.match(result)) {
      toast.success(t("cart.productRemovedFromCart"), {
        icon: null,
        style: {
          color: "#ff0000",
        },
      });
    } else {
      toast.error(
        result.payload || t("cart.failedToRemoveProduct"),
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
    dispatch(getCart());
  }, [dispatch]);

  const totalPrice = cart.reduce((acc, item) => {
    const price = item.product?.price || 0;
    const quantity = item.quantity || 1;

    return acc + price * quantity;
  }, 0);

  const shipping = totalPrice >= 200 ? 15 : 0;

  const total = totalPrice + shipping;

  return (
    <main className="cart-page">
      <div className="cart-page-header">
        <div className="cart-container">
          <div>
            <span className="cart-label">
              {t("cart.shoppingBag")}
            </span>

            <h1>
              {t("cart.your")} <span>{t("cart.cart")}</span>
            </h1>

            <p>
              {t("cart.reviewItems")}
            </p>
          </div>
        </div>
      </div>

      <div className="cart-container cart-content">
        <section className="cart-items-section">

          {error && (
            <div className="cart-error">
              {error}
            </div>
          )}

          <div className="cart-items-header">
            <h2>
              {t("cart.shoppingCart")}
            </h2>

            <span>
              {cart.length} {t("cart.items")}
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">

              <h3>
                {t("cart.emptyTitle")}
              </h3>

              <p>
                {t("cart.emptyDescription")}
              </p>

              <a
                href="/ProductsShopNow"
                className="continue-shopping-btn"
              >
                {t("cart.startShopping")}
              </a>

            </div>
          ) : (
            <div className="cart-items">

              {cart.map((item) => {

                const product = item.product;

                const quantity = item.quantity || 1;

                const productLink = item.product?.images?.length
                  ? `/products/${item.product.id}`
                  : `/Fakestoreapi/${item.product.id}`;

                return (
                  <article
                    className="cart-item"
                    key={item._id}
                  >

                    <a
                      href={productLink}
                      className="wishlist-product-image"
                    >
                      <img
                        src={
                          item.product?.images?.[0] ||
                          item.product?.image
                        }
                        alt={item.product?.title}
                      />
                    </a>

                    <div className="cart-item-info">

                      <span className="cart-item-category">
                        {t(`categories.${product?.category}`, {
                          defaultValue: product?.category,
                        })}
                      </span>

                      <a
                        href={productLink}
                        className="cart-item-title"
                      >
                        {t(`products.${product?.id}.title`, {
                          defaultValue: product?.title,
                        })}
                      </a>

                      <div className="cart-item-price">
                        ${(product?.price || 0).toFixed(2)}
                      </div>

                      <div className="cart-item-actions">

                        <div className="quantity-control">

                          <button
                            type="button"
                            onClick={() =>
                              handleDecrease(item._id)
                            }
                          >
                            <FaMinus />
                          </button>

                          <span>
                            <span>{item.quantity}</span>
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              handleIncrease(item._id)
                            }
                          >
                            <FaPlus />
                          </button>

                        </div>

                        <button
                          onClick={() =>
                            handleDelete(item._id)
                          }
                          type="button"
                          className="remove-btn"
                        >
                          <FaTrash />
                          {t("cart.remove")}
                        </button>

                      </div>
                    </div>

                    <div className="cart-item-total">
                      <span>
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>

                  </article>
                );
              })}

            </div>
          )}

          <a
            href="/productsShopNow"
            className="continue-shopping"
          >
            <FaArrowLeft />
            {t("cart.continueShopping")}
          </a>

        </section>

        <aside className="cart-summary">

          <h2>
            {t("cart.orderSummary")}
          </h2>

          <div className="summary-line">

            <span>
              {t("cart.subtotal")}
            </span>

            <strong>
              ${totalPrice.toFixed(2)}
            </strong>

          </div>

          <div className="summary-line">

            <span>
              {t("cart.shipping")}
            </span>

            <strong
              className={shipping === 0 ? "free-shipping" : ""}
            >
              {shipping === 0
                ? t("cart.free")
                : `$${shipping.toFixed(2)}`}
            </strong>

          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">

            <span>
              {t("cart.total")}
            </span>

            <strong>
              ${total.toFixed(2)}
            </strong>

          </div>

          <a
            href="/checkout"
            className="checkout-btn"
          >
            {t("cart.proceedToCheckout")}
          </a>

          <div className="secure-checkout">

            <FaLock />

            <span>
              {t("cart.secureCheckout")}
            </span>

          </div>

          <div className="free-shipping-message">

            <FiPackage />

            {shipping === 0
              ? t("cart.qualifyFreeShipping")
              : t("cart.addMoreForFreeShipping", {
                  amount: (200 - totalPrice).toFixed(2),
                })
            }

          </div>

        </aside>

      </div>
    </main>
  );
}

export default Cart;