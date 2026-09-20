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

const countries = [
  { value: "Afghanistan", key: "afghanistan" },
  { value: "Albania", key: "albania" },
  { value: "Algeria", key: "algeria" },
  { value: "Andorra", key: "andorra" },
  { value: "Angola", key: "angola" },
  { value: "Antigua and Barbuda", key: "antiguaAndBarbuda" },
  { value: "Argentina", key: "argentina" },
  { value: "Armenia", key: "armenia" },
  { value: "Australia", key: "australia" },
  { value: "Austria", key: "austria" },
  { value: "Azerbaijan", key: "azerbaijan" },

  { value: "Bahamas", key: "bahamas" },
  { value: "Bahrain", key: "bahrain" },
  { value: "Bangladesh", key: "bangladesh" },
  { value: "Barbados", key: "barbados" },
  { value: "Belarus", key: "belarus" },
  { value: "Belgium", key: "belgium" },
  { value: "Belize", key: "belize" },
  { value: "Benin", key: "benin" },
  { value: "Bhutan", key: "bhutan" },
  { value: "Bolivia", key: "bolivia" },
  { value: "Bosnia and Herzegovina", key: "bosniaAndHerzegovina" },
  { value: "Botswana", key: "botswana" },
  { value: "Brazil", key: "brazil" },
  { value: "Brunei", key: "brunei" },
  { value: "Bulgaria", key: "bulgaria" },
  { value: "Burkina Faso", key: "burkinaFaso" },
  { value: "Burundi", key: "burundi" },

  { value: "Cabo Verde", key: "caboVerde" },
  { value: "Cambodia", key: "cambodia" },
  { value: "Cameroon", key: "cameroon" },
  { value: "Canada", key: "canada" },
  { value: "Central African Republic", key: "centralAfricanRepublic" },
  { value: "Chad", key: "chad" },
  { value: "Chile", key: "chile" },
  { value: "China", key: "china" },
  { value: "Colombia", key: "colombia" },
  { value: "Comoros", key: "comoros" },
  { value: "Congo", key: "congo" },
  { value: "Costa Rica", key: "costaRica" },
  { value: "Croatia", key: "croatia" },
  { value: "Cuba", key: "cuba" },
  { value: "Cyprus", key: "cyprus" },
  { value: "Czech Republic", key: "czechRepublic" },

  { value: "Denmark", key: "denmark" },
  { value: "Djibouti", key: "djibouti" },
  { value: "Dominica", key: "dominica" },
  { value: "Dominican Republic", key: "dominicanRepublic" },

  { value: "Ecuador", key: "ecuador" },
  { value: "Egypt", key: "egypt" },
  { value: "El Salvador", key: "elSalvador" },
  { value: "Equatorial Guinea", key: "equatorialGuinea" },
  { value: "Eritrea", key: "eritrea" },
  { value: "Estonia", key: "estonia" },
  { value: "Eswatini", key: "eswatini" },
  { value: "Ethiopia", key: "ethiopia" },

  { value: "Fiji", key: "fiji" },
  { value: "Finland", key: "finland" },
  { value: "France", key: "france" },

  { value: "Gabon", key: "gabon" },
  { value: "Gambia", key: "gambia" },
  { value: "Georgia", key: "georgia" },
  { value: "Germany", key: "germany" },
  { value: "Ghana", key: "ghana" },
  { value: "Greece", key: "greece" },
  { value: "Grenada", key: "grenada" },
  { value: "Guatemala", key: "guatemala" },
  { value: "Guinea", key: "guinea" },
  { value: "Guinea-Bissau", key: "guineaBissau" },
  { value: "Guyana", key: "guyana" },

  { value: "Haiti", key: "haiti" },
  { value: "Honduras", key: "honduras" },
  { value: "Hungary", key: "hungary" },

  { value: "Iceland", key: "iceland" },
  { value: "India", key: "india" },
  { value: "Indonesia", key: "indonesia" },
  { value: "Iran", key: "iran" },
  { value: "Iraq", key: "iraq" },
  { value: "Ireland", key: "ireland" },
  { value: "Israel", key: "israel" },
  { value: "Italy", key: "italy" },

  { value: "Jamaica", key: "jamaica" },
  { value: "Japan", key: "japan" },
  { value: "Jordan", key: "jordan" },

  { value: "Kazakhstan", key: "kazakhstan" },
  { value: "Kenya", key: "kenya" },
  { value: "Kiribati", key: "kiribati" },
  { value: "Kuwait", key: "kuwait" },
  { value: "Kyrgyzstan", key: "kyrgyzstan" },

  { value: "Laos", key: "laos" },
  { value: "Latvia", key: "latvia" },
  { value: "Lebanon", key: "lebanon" },
  { value: "Lesotho", key: "lesotho" },
  { value: "Liberia", key: "liberia" },
  { value: "Libya", key: "libya" },
  { value: "Liechtenstein", key: "liechtenstein" },
  { value: "Lithuania", key: "lithuania" },
  { value: "Luxembourg", key: "luxembourg" },

  { value: "Madagascar", key: "madagascar" },
  { value: "Malawi", key: "malawi" },
  { value: "Malaysia", key: "malaysia" },
  { value: "Maldives", key: "maldives" },
  { value: "Mali", key: "mali" },
  { value: "Malta", key: "malta" },
  { value: "Marshall Islands", key: "marshallIslands" },
  { value: "Mauritania", key: "mauritania" },
  { value: "Mauritius", key: "mauritius" },
  { value: "Mexico", key: "mexico" },
  { value: "Micronesia", key: "micronesia" },
  { value: "Moldova", key: "moldova" },
  { value: "Monaco", key: "monaco" },
  { value: "Mongolia", key: "mongolia" },
  { value: "Montenegro", key: "montenegro" },
  { value: "Morocco", key: "morocco" },
  { value: "Mozambique", key: "mozambique" },
  { value: "Myanmar", key: "myanmar" },

  { value: "Namibia", key: "namibia" },
  { value: "Nauru", key: "nauru" },
  { value: "Nepal", key: "nepal" },
  { value: "Netherlands", key: "netherlands" },
  { value: "New Zealand", key: "newZealand" },
  { value: "Nicaragua", key: "nicaragua" },
  { value: "Niger", key: "niger" },
  { value: "Nigeria", key: "nigeria" },
  { value: "North Korea", key: "northKorea" },
  { value: "North Macedonia", key: "northMacedonia" },
  { value: "Norway", key: "norway" },

  { value: "Oman", key: "oman" },

  { value: "Pakistan", key: "pakistan" },
  { value: "Palau", key: "palau" },
  { value: "Palestine", key: "palestine" },
  { value: "Panama", key: "panama" },
  { value: "Papua New Guinea", key: "papuaNewGuinea" },
  { value: "Paraguay", key: "paraguay" },
  { value: "Peru", key: "peru" },
  { value: "Philippines", key: "philippines" },
  { value: "Poland", key: "poland" },
  { value: "Portugal", key: "portugal" },

  { value: "Qatar", key: "qatar" },

  { value: "Romania", key: "romania" },
  { value: "Russia", key: "russia" },
  { value: "Rwanda", key: "rwanda" },

  { value: "Saint Kitts and Nevis", key: "saintKittsAndNevis" },
  { value: "Saint Lucia", key: "saintLucia" },
  {
    value: "Saint Vincent and the Grenadines",
    key: "saintVincentAndTheGrenadines",
  },
  { value: "Samoa", key: "samoa" },
  { value: "San Marino", key: "sanMarino" },
  { value: "Sao Tome and Principe", key: "saoTomeAndPrincipe" },
  { value: "Saudi Arabia", key: "saudiArabia" },
  { value: "Senegal", key: "senegal" },
  { value: "Serbia", key: "serbia" },
  { value: "Seychelles", key: "seychelles" },
  { value: "Sierra Leone", key: "sierraLeone" },
  { value: "Singapore", key: "singapore" },
  { value: "Slovakia", key: "slovakia" },
  { value: "Slovenia", key: "slovenia" },
  { value: "Solomon Islands", key: "solomonIslands" },
  { value: "Somalia", key: "somalia" },
  { value: "South Africa", key: "southAfrica" },
  { value: "South Korea", key: "southKorea" },
  { value: "South Sudan", key: "southSudan" },
  { value: "Spain", key: "spain" },
  { value: "Sri Lanka", key: "sriLanka" },
  { value: "Sudan", key: "sudan" },
  { value: "Suriname", key: "suriname" },
  { value: "Sweden", key: "sweden" },
  { value: "Switzerland", key: "switzerland" },
  { value: "Syria", key: "syria" },

  { value: "Taiwan", key: "taiwan" },
  { value: "Tajikistan", key: "tajikistan" },
  { value: "Tanzania", key: "tanzania" },
  { value: "Thailand", key: "thailand" },
  { value: "Timor-Leste", key: "timorLeste" },
  { value: "Togo", key: "togo" },
  { value: "Tonga", key: "tonga" },
  { value: "Trinidad and Tobago", key: "trinidadAndTobago" },
  { value: "Tunisia", key: "tunisia" },
  { value: "Turkey", key: "turkey" },
  { value: "Turkmenistan", key: "turkmenistan" },
  { value: "Tuvalu", key: "tuvalu" },

  { value: "Uganda", key: "uganda" },
  { value: "Ukraine", key: "ukraine" },
  { value: "United Arab Emirates", key: "unitedArabEmirates" },
  { value: "United Kingdom", key: "unitedKingdom" },
  { value: "United States", key: "unitedStates" },
  { value: "Uruguay", key: "uruguay" },
  { value: "Uzbekistan", key: "uzbekistan" },

  { value: "Vanuatu", key: "vanuatu" },
  { value: "Vatican City", key: "vaticanCity" },
  { value: "Venezuela", key: "venezuela" },
  { value: "Vietnam", key: "vietnam" },

  { value: "Yemen", key: "yemen" },

  { value: "Zambia", key: "zambia" },
  { value: "Zimbabwe", key: "zimbabwe" },
];

const governorates = [
  { value: "Cairo", key: "cairo" },
  { value: "Alexandria", key: "alexandria" },
  { value: "Port Said", key: "portSaid" },
  { value: "Suez", key: "suez" },
  { value: "Damietta", key: "damietta" },
  { value: "Dakahlia", key: "dakahlia" },
  { value: "Sharqia", key: "sharqia" },
  { value: "Qalyubia", key: "qalyubia" },
  { value: "Kafr El Sheikh", key: "kafrElSheikh" },
  { value: "Gharbia", key: "gharbia" },
  { value: "Monufia", key: "monufia" },
  { value: "Beheira", key: "beheira" },
  { value: "Ismailia", key: "ismailia" },
  { value: "Giza", key: "giza" },
  { value: "Beni Suef", key: "beniSuef" },
  { value: "Fayoum", key: "fayoum" },
  { value: "Minya", key: "minya" },
  { value: "Asyut", key: "asyut" },
  { value: "Sohag", key: "sohag" },
  { value: "Qena", key: "qena" },
  { value: "Luxor", key: "luxor" },
  { value: "Aswan", key: "aswan" },
  { value: "Red Sea", key: "redSea" },
  { value: "New Valley", key: "newValley" },
  { value: "Matrouh", key: "matrouh" },
  { value: "North Sinai", key: "northSinai" },
  { value: "South Sinai", key: "southSinai" },
];
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
  <label>{t("checkout.country")}</label>

<select
  name="country"
  value={formData.country}
  onChange={handleChange}
>
  {countries.map((country) => (
    <option key={country.value} value={country.value}>
      {t(`countries.${country.key}`)}
    </option>
  ))}
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
    {t("checkouts.selectGovernorate")}
  </option>

  {governorates.map((governorate) => (
    <option
      key={governorate.value}
      value={governorate.value}
    >
      {t(`checkouts.governorates.${governorate.key}`)}
    </option>
  ))}
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