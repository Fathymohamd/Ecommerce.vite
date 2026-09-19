import { useState, useEffect } from "react";

import {
  FaCreditCard,
  FaWallet,
  FaMoneyBillWave,
  FaLock,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { toast } from "react-hot-toast";

import { getCart } from "../Redux/cartSlice";

import { clearUserCart } from "../Redux/wishlistSlice";

function Checkout() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Egypt",
    governorate: "",
    city: "",
    address: "",
  });

  const cartData = useSelector((state) => state.cart.cart);

  const user = useSelector(
    (state) => state.auth.user
  );

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const cartItems = Array.isArray(cartData)
    ? cartData
    : [];

  const subtotal = cartItems.reduce((total, item) => {
    const product = item.product || item;
    const price = Number(product?.price || 0);
    const quantity = Number(item?.quantity || 1);

    return total + price * quantity;
  }, 0);

  const shipping = subtotal >= 200 ? 15 : 0;

  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async (e) => {
    try {
      e.preventDefault();

      if (!user) {
        toast.error(t("checkout.pleaseLoginFirst"));

        setTimeout(() => {
          navigate("/login");
        }, 2000);

        return;
      }

      if (!paymentMethod) {
        setError(t("checkout.choosePaymentMethod"));

        return;
      }

      if (cartData.length === 0) {
        return setError(t("checkout.cartEmpty"));
      }

      setLoading(true);

      const res = await fetch(
        "http://localhost:8080/api/order",
        {
          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...formData,
            products: cartData,
            finalPrice: total,
            paymentMethod,
          }),
        }
      );

      const data = await res.json();

      if (res.status === 401) {
        setError(t("checkout.loginBeforeOrder"));

        setTimeout(() => {
          navigate("/login");
        }, 3000);

        return;
      }

      if (!res.ok) {
        setError(data.message);

        return;
      }

      const publicKey =
        import.meta.env.VITE_PAYMOB_PUBLIC_KEY;

      const url = `https://accept.paymob.com/unifiedcheckout/?publicKey=${publicKey}&clientSecret=${data.client_secret}`;

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        governorate: "",
        city: "",
        address: "",
      });

      setError("");

      window.location.href = url;

      await dispatch(clearUserCart());

    } catch (err) {
      console.error("Error:", err);

      setError(t("checkout.somethingWentWrong"));

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="checkout-page">

      <header className="checkout-header">

        <div className="checkout-container">

          <a
            href="/"
            className="checkout-logo"
          >
            Shop<span>Zone</span>
          </a>

          <div className="checkout-secure">

            <FaLock />

            <span>
              {t("checkout.secureCheckout")}
            </span>

          </div>

        </div>

      </header>

      <div className="checkout-container checkout-content">

        <form
          className="checkout-form"
          onSubmit={handleChange}
        >

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <section className="checkout-section">

            <div className="checkout-section-title">

              <div className="section-number">
                1
              </div>

              <div>

                <h2>
                  {t("checkout.deliveryAddress")}
                </h2>

                <p>
                  {t("checkout.deliveryDescription")}
                </p>

              </div>

            </div>

            <div className="checkout-fields">

              <div className="form-group">

                <label>
                  {t("checkout.firstName")}
                </label>

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={t("checkout.firstNamePlaceholder")}
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  {t("checkout.lastName")}
                </label>

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={t("checkout.lastNamePlaceholder")}
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  {t("checkout.emailAddress")}
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  {t("checkout.phoneNumber")}
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+20 100 000 0000"
                  required
                />

              </div>

              <div className="form-group full">

                <label>
                  {t("checkout.country")}
                </label>

                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                >

                  <option value="Egypt">
                    {t("checkout.countries.egypt")}
                  </option>

                  <option value="Saudi Arabia">
                    {t("checkout.countries.saudiArabia")}
                  </option>

                  <option value="United Arab Emirates">
                    {t("checkout.countries.unitedArabEmirates")}
                  </option>

                </select>

              </div>

              <div className="form-group">

                <label>
                  {t("checkout.governorate")}
                </label>

                <select
                  name="governorate"
                  value={formData.governorate}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    {t("checkout.selectGovernorate")}
                  </option>

                  <option value="Cairo">
                    {t("checkout.governorates.cairo")}
                  </option>

                  <option value="Giza">
                    {t("checkout.governorates.giza")}
                  </option>

                  <option value="Alexandria">
                    {t("checkout.governorates.alexandria")}
                  </option>

                  <option value="Sharqia">
                    {t("checkout.governorates.sharqia")}
                  </option>

                  <option value="Dakahlia">
                    {t("checkout.governorates.dakahlia")}
                  </option>

                </select>

              </div>

              <div className="form-group">

                <label>
                  {t("checkout.city")}
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder={t("checkout.cityPlaceholder")}
                  required
                />

              </div>

              <div className="form-group full">

                <label>
                  {t("checkout.fullAddress")}
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={t("checkout.addressPlaceholder")}
                  rows="3"
                  required
                />

              </div>

            </div>

          </section>

          <section className="checkout-section">

            <div className="checkout-section-title">

              <div className="section-number">
                2
              </div>

              <div>

                <h2>
                  {t("checkout.paymentMethod")}
                </h2>

                <p>
                  {t("checkout.paymentDescription")}
                </p>

              </div>

            </div>

            <div className="payment-options">

              <label
                className={`payment-option ${
                  paymentMethod === "cash"
                    ? "active"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={
                    paymentMethod === "cash"
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />

                <div className="payment-option-icon">
                  <FaMoneyBillWave />
                </div>

                <div className="payment-option-content">

                  <strong>
                    {t("checkout.cashOnDelivery")}
                  </strong>

                  <span>
                    {t("checkout.payWhenArrives")}
                  </span>

                </div>

              </label>

              {/* CARD */}
{/* 
              <label
                className={`payment-option ${
                  paymentMethod === "card"
                    ? "active"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={
                    paymentMethod === "card"
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />

                <div className="payment-option-icon">
                  <FaCreditCard />
                </div>

                <div className="payment-option-content">

                  <strong>
                    {t("checkout.creditDebitCard")}
                  </strong>

                  <span>
                    {t("checkout.visaMastercard")}
                  </span>

                </div>

              </label> */}

              {/* WALLET */}

         {/*      <label
                className={`payment-option ${
                  paymentMethod === "wallet"
                    ? "active"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="payment"
                  value="wallet"
                  checked={
                    paymentMethod === "wallet"
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />

                <div className="payment-option-icon">
                  <FaWallet />
                </div>

                <div className="payment-option-content">

                  <strong>
                    {t("checkout.mobileWallet")}
                  </strong>

                  <span>
                    {t("checkout.payUsingWallet")}
                  </span>

                </div>

              </label> */}

            </div>

          </section>

          {/* REVIEW */}

          <section className="checkout-section">

            <div className="checkout-section-title">

              <div className="section-number">
                3
              </div>

              <div>

                <h2>
                  {t("checkout.reviewYourItems")}
                </h2>

                <p>
                  {t("checkout.reviewDescription")}
                </p>

              </div>

            </div>

            <div className="checkout-products">

              {cartItems.map((item) => {

                const product =
                  item.product || item;

                const quantity =
                  item.quantity || 1;

                return (
                  <div
                    className="checkout-product"
                    key={
                      item._id ||
                      product._id
                    }
                  >

                    <div className="checkout-product-image">

                      <img
                        src={
                          product.image ||
                          product.images?.[0]
                        }
                        alt={product.title}
                      />

                    </div>

                    <div className="checkout-product-info">

                      <h3>
                        {t(`products.${product.id}.title`, {
                          defaultValue: product.title,
                        })}
                      </h3>

                      <span>
                        {t("checkout.inStock")}
                      </span>

                      <div className="product-quantity">

                        <button type="button">
                          <FaMinus />
                        </button>

                        <b>
                          {quantity}
                        </b>

                        <button type="button">
                          <FaPlus />
                        </button>

                      </div>

                    </div>

                    <strong className="checkout-product-price">
                      {(
                        Number(product.price || 0) *
                        quantity
                      ).toFixed(2)}{" "}
                      {t("checkout.egp")}
                    </strong>

                  </div>
                );
              })}

            </div>

          </section>

        </form>

        {/* SUMMARY */}

        <aside className="checkout-summary">

          <h2>
            {t("checkout.orderSummary")}
          </h2>

          <div className="summary-row">

            <span>
              {t("checkout.items")} ({cartItems.length})
            </span>

            <strong>
              {subtotal.toFixed(2)} {t("checkout.egp")}
            </strong>

          </div>

          <div className="summary-row">

            <span>
              {t("checkout.shipping")}
            </span>

            <strong
              className={
                shipping === 0
                  ? "summary-free"
                  : ""
              }
            >

              {shipping === 0
                ? t("checkout.free")
                : `${shipping.toFixed(2)} ${t("checkout.egp")}`}

            </strong>

          </div>

          <div className="summary-divider" />

          <div className="summary-total">

            <span>
              {t("checkout.orderTotal")}
            </span>

            <strong>
              {total.toFixed(2)} {t("checkout.egp")}
            </strong>

          </div>

          <button
            type="submit"
            className="place-order-btn"
            onClick={handlePayment}
            disabled={loading}
          >

            {loading
              ? t("checkout.processing")
              : t("checkout.placeYourOrder")}

          </button>

          <div className="checkout-protection">

            <FaLock />

            <span>
              {t("checkout.protection")}
            </span>

          </div>

          <a
            href="/cart"
            className="back-cart"
          >
            ← {t("checkout.backToCart")}
          </a>

        </aside>

      </div>

    </main>
  );
}

export default Checkout;