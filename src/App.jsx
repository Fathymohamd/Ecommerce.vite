import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Layout from "./Compoentes/Layout/Layout";
import Cart from "./Routes/Cart";
import Home from "./Compoentes/eCommerce/Home";
import Register from './Compoentes/Froms/Register';
import Login from './Compoentes/Froms/Login';
import ProductDetails from "./Compoentes/eCommerce/ProductDetails";
import ContinueShopping from './Compoentes/eCommerce/ContinueShopping'
import Fakestoreapi from "./Compoentes/eCommerce/Fakestoreapi";
import Checkout from "./Routes/Checkout";
import PaymentSuccess from "./Compoentes/eCommerce/PaymentSuccess";
import PaymentFailed from "./Compoentes/eCommerce/PaymentFailed"
import  Order from "./Compoentes/eCommerce/Order"
import  ForgotPassword from "./Compoentes/Froms/ForgotPassword"
import ResetPassword from "./Compoentes/eCommerce/ResetPassword";
import ProductsShopNow from "./Compoentes/eCommerce/ProductsShopNow";
import Wishlist from "./Compoentes/eCommerce/Wishlist";
import Deals from "./Compoentes/eCommerce/Deals";
import BestSellers from "./Compoentes/eCommerce/BestSellers";
import Electronics from "./Compoentes/eCommerce/Electronics";
import Fashion from "./Compoentes/eCommerce/Fashion";
import NewArrivals from "./Compoentes/eCommerce/NewArrivals";
import HomeKitchen from "./Compoentes/eCommerce/HomeKitchen";
import CategoryProducts from "./Compoentes/eCommerce/CategoryProducts";
import Settings from "./Compoentes/eCommerce/Settings";
import Profile from "./Compoentes/eCommerce/Profile";
import BigDeals from "./Compoentes/eCommerce/BigDeals";
import Categories from "./Compoentes/eCommerce/Categories";
import Contact from "./Compoentes/eCommerce/Contact";
import Features from "./Compoentes/eCommerce/Features";
import ShippingDelivery from "./Compoentes/eCommerce/ShippingDelivery";
import ReturnsRefunds from "./Compoentes/eCommerce/ReturnsRefunds";
import FAQ from "./Compoentes/eCommerce/FAQ";

import "./Syles/Header.css"
import "./Syles/HeaderTop.css"
import "./Syles/MySlider.css"
import "./Syles/SideBar.css"
import "./Syles/SideBar2.css"
import "./Syles/Footer.css"
import "./Syles/ProductDetails.css"
import "./Syles/Products.css"
import "./Syles/Login.css"
import "./Syles/Imgas.css"
import "./Syles/SwoperData.css"
import "./Syles/CheckImgs.css"
import "./Syles/Cart.css"
import "./Syles/ContinueShopping.css"
import "./Syles/Fakestoreapi.css"
import "./Syles/Animation.css"
import "./Syles/checkout.css"
import "./Syles/PaymentSuccess.css"
import "./Syles/PaymentFailed.css"
import "./Syles/Order.css"
import "./Syles/ForgotPassword.css"
import "./Syles/ResetPassword.css"
import "./Syles/pagination.css"
import "./Syles/Features.css"
import "./Syles/Categories.css"
import "./Syles/FeaturedProducts.css"
import "./Syles/BigDeals.css"
import "./Syles/BestSellers.css"
import "./Syles/NewArrivals.css"
import "./Syles/Newsletter.css"
import "./Syles/ProductsShopNow.css"
import "./Syles/Wishlist.css"
import "./Syles/Register.css"
import "./Syles/Deals.css"
import "./Syles/BestSellers.css"
import "./Syles/Electronics.css"
import "./Syles/Fashion.css"
import "./Syles/CategoryProducts.css"
import "./Syles/Settings.css"
import "./Syles/Profile.css"
import "./Syles/Contact.css"

import "./Syles/ShippingDelivery.css"
import "./Syles/ReturnsRefunds.css"
import "./Syles/FAQ.css"
import "./Syles/HomeKitchen.css"

import { useSelector , useDispatch } from "react-redux";
import {useEffect} from "react"
import {getDarkMode}  from "./Redux/darkMode"
import "../App.css";
function App() {
const darkMode = useSelector((state) => state.darkMode.darkMode);

const initialized = useSelector(
  (state) => state.darkMode.initialized
);

const dispatch = useDispatch();

useEffect(() => {
  dispatch(getDarkMode());
}, [dispatch]);

if (!initialized) {
  return null;
}
  return (
    <>
       <div className={darkMode ? "app dark-mode" : "app"}>
         <Routes>
        <Route path="/" element={<Layout />}> 
         <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/wishlis" element={<Wishlist />} />
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="/ContinueShopping" element={<ContinueShopping/>}/>
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="products/:id" element={<ProductDetails />}/>
          <Route path="Fakestoreapi/:id" element={<Fakestoreapi/>}/>
          <Route path="/category/:category" element={<CategoryProducts />}/>
           <Route path="/contact" element={<Contact />}/>
         <Route path="/categories" element={<Categories />}/>
        <Route path="/bigDeals" element={<BigDeals />}/>;
        <Route path="/features" element={<Features />}/>;
      <Route
  path="*"
  element={
    <div className="notFoundPage">
      <div className="notFoundContent">
        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link to="/">
          Back to Home
        </Link>
      </div>
    </div>
  }
/>
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="payment-failed" element={<PaymentFailed />} />
          <Route path="/productsShopNow" element={<ProductsShopNow />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order" element={<Order />} />
          <Route path="/deals" element={<Deals />} />
           <Route path="/bestSellers" element={<BestSellers />} />
           <Route path="/electronics" element={<Electronics />} />
            <Route path="/fashion" element={<Fashion />} />
             <Route path="/homeKitchen" element={<HomeKitchen />} />
            <Route path="/newArrivals" element={<NewArrivals />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />}/>
          <Route path="/shipping-delivery"element={<ShippingDelivery />}/>
          <Route path="/returns-refunds"element={<ReturnsRefunds />}/>
         <Route path="/faq" element={<FAQ />}/>
        </Route>
      </Routes>
    </div>
  
    </>
  );
}

export default App;
