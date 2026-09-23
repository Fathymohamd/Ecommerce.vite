import { Link } from "react-router-dom";

import { useState } from "react";

import { useTranslation } from "react-i18next";

import { useSelector, useDispatch } from "react-redux";

import { useEffect, useRef } from "react";

import {
  FaBars,
  FaSearch,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaUser,
  FaTimes,
  FaChevronDown,
  FaGlobe,
  FaBox,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { FaHeart, FaStar } from "react-icons/fa6";

import { getMe, logout } from "../../Redux/authSlice";

import { getCart } from "../../Redux/cartSlice";

import { getCartwishlist } from "../../Redux/wishlistSlice";
import { useNavigate } from "react-router-dom";


function Header() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const searchRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const { t, i18n } = useTranslation();
  const cart = useSelector((state) => state.cart.cart);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const navigate = useNavigate();
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "AR" : "EN"));
  };

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
    dispatch(getCartwishlist());
    dispatch(getCart());
  }, [dispatch]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };
const handleProductClick = () => {
  setProducts([]);
  setSearch("");
};

  useEffect(() => {
    const handleClickOutside = (e) => {
        
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setProducts([]);
        setSearch("");
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleClickOutside
      );
    };
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim() === "") {
        setProducts([]);
        return;
      } else {
        handleSearch();
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

const handleSearch = async () => {
  const res = await fetch(
    `https://ecommerce-vite-two.vercel.app/api/products/search?q=${search}`,
    {
      credentials: "include",
    }
  );

  const data = await res.json();

  setProducts(data);
};

  const handleLogout = async () => {
    try {
      const res = await fetch(
        "https://ecommerce-vite-two.vercel.app/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (res.ok) {
        dispatch(logout());
      }

      setShowLogoutModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">

          <a href="/" className="logo">
            <span>Shop</span>Zone
          </a>

          <div className="location">
            <FaMapMarkerAlt className="location-icon" />

            <div>
              <small>
                {t("header.deliverTo")}
              </small>

              <strong>
                {t("header.egypt")}
              </strong>
            </div>
          </div>

          <div className="search-box">

         <select
  className="search-category"
  onChange={(e) => {
    const value = e.target.value;

    if (value === "home") navigate("/");
    if (value === "electronics") navigate("/electronics");
    if (value === "fashion") navigate("/fashion");
    if (value === "homeKitchen") navigate("/homeKitchen");
    if (value === "newArrivals") navigate("/newArrivals");
  }}
>
  <option value="home">
    {t("header.home")}
  </option>

  <option value="electronics">
    {t("header.electronics")}
  </option>

  <option value="fashion">
    {t("header.fashion")}
  </option>


<option value="homeKitchen">
  {t("header.homeKitchen")}
</option>

<option value="newArrivals">
  {t("header.newArrivals")}
</option>
</select>

            <input
              type="text"
              placeholder={t("header.searchPlaceholder")}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />

            <button type="button">
              <FaSearch />
            </button>

          </div>

          <div className="account-wrapper">

            <div className="nav-account">

              <span className="user-icon">
                <FaUser />
              </span>

              <div className="account-info">

                <small>
                  {t("header.hello")},{" "}
                  {user
                    ? user.name
                    : t("header.signIn")}
                </small>

                <strong>
                  {t("header.account")}

                  <span className="arrow">
                    ▼
                  </span>
                </strong>

              </div>

            </div>

            <div className="account-dropdown">

              <div className="dropdown-title">
                {t("header.welcome")}  <FaStar />
              </div>

              {user ? (
                <>
                  <div className="dropdown-divider"></div>

                  <a href="/wishlis">
                    <FaHeart />

                    <span>
                      {t("header.wishlist")}
                    </span>
                  </a>

                  <div className="dropdown-divider"></div>

                  <a href="/profile">
                    <FaUser />

                    <span>
                      {t("header.myAccount")}
                    </span>
                  </a>

                  <a href="/order">
                    <FaBox />

                    <span>
                      {t("header.myOrders")}
                    </span>
                  </a>

                  <a href="/settings">
                    <FaCog />

                    <span>
                      {t("header.settings")}
                    </span>
                  </a>

                  <div className="dropdown-divider"></div>

                  <button
                    type="button"
                    className="logout"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt />

                    <span>
                      {t("header.logout")}
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <div className="account-login-box">

                    <h3>
                      {t("header.welcomeBack")}{" "}
                      <FaUser />
                    </h3>

                    <p>
                      {t("header.signInAccess")}
                    </p>

                    <a
                      href="/login"
                      className="login-btn"
                    >
                      {t("header.signIn")}
                    </a>

                    <div className="new-customer">

                      <span>
                        {t("header.newCustomer")}
                      </span>

                      <a href="/register">
                        {t("header.createAccount")}
                      </a>

                    </div>

                  </div>
                </>
              )}

            </div>

          </div>

          <button
            type="button"
            className="language-btn"
            onClick={toggleLanguage}
          >
            <FaGlobe />

            <div>

              <small>
                {t("header.language")}
              </small>

              <strong
                onClick={() =>
                  changeLanguage(
                    language === "EN"
                      ? "ar"
                      : "en"
                  )
                }
              >
                {language === "EN"
                  ? "English"
                  : "العربية"}
              </strong>

            </div>

            <FaChevronDown className="language-arrow" />

          </button>

          <Link
            to="/wishlis"
            className="cart"
          >
            <div className="cart-icon">

              <FaHeart />

              <span>
                {wishlist?.length}
              </span>

            </div>

            <span>
              {t("header.wishlist")}
            </span>

          </Link>

          <a href="/cart" className="cart">

            <div className="cart-icon">

              <FaShoppingCart />

              <span>
                {cart?.length}
              </span>

            </div>

            <strong>
              {t("header.cart")}
            </strong>

          </a>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>

        </div>
      </header>

      <nav
        className={`nav-links ${
          menuOpen ? "active" : ""
        }`}
      >
        <div className="nav-links-container">

          <button
            type="button"
            className="all-menu"
          >
            <FaBars />

            {t("header.all")}
          </button>

          <a href="/">
            {t("header.home")}
          </a>

          <a href="/deals">
            {t("header.todaysDeals")}
          </a>

          <a href="/bestSellers">
            {t("header.bestSellers")}
          </a>

          <a href="/electronics">
            {t("header.electronics")}
          </a>

          <a href="/fashion">
            {t("header.fashion")}
          </a>

          <a href="/homeKitchen">
            {t("header.homeKitchen")}
          </a>

          <a href="/newArrivals">
            {t("header.newArrivals")}
          </a>

        </div>
      </nav>


{products.length > 0 && (
  <div className="searchResults" ref={searchRef}>
    {products.map((item) => {
      const productLink = item.images?.length
        ? `/products/${item.id}`
        : `/Fakestoreapi/${item.id}`;

      return (
        <Link  onClick={handleProductClick}
          to={productLink}
          className="searchProducts link"
          key={item.id}
        >
          <div className="searchProductImage">
            <img 
              className="imgProduct"
              src={item.image || item.images?.[0]}
              alt={item.title}
            />
          </div>

          <div className="searchInfo">
            <h3>
              {i18n.language === "ar"
                ? t(`products.${item.id}.title`, {
                    defaultValue: item.title,
                  })
                : item.title}
            </h3>

            <div className="searchPrice">
              <span>$</span>
              <strong>{item.price}</strong>
            </div>
          </div>
        </Link>
      );
    })}
  </div>
)}

    </>
  );
}

export default Header;