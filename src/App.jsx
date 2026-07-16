import { Routes, Route } from "react-router-dom";
import Layout from "./Compoentes/Layout/Layout";
import Cart from "./Routes/Cart";
import Home from "./Compoentes/eCommerce/Home";
import Sinup from './Compoentes/Froms/Sinup';
import Login from './Compoentes/Froms/Login';
import ProductsData from "./Compoentes/eCommerce/ProductsData";
import ContinueShopping from './Compoentes/eCommerce/ContinueShopping'
import Fakestoreapi from "./Compoentes/eCommerce/Fakestoreapi";
import Checkout from "./Routes/Checkout";
import PaymentSuccess from "./Compoentes/eCommerce/PaymentSuccess";
import PaymentFailed from "./Compoentes/eCommerce/PaymentFailed"
import  Order from "./Compoentes/eCommerce/Order"
import  Logout from "./Compoentes/Froms/Logout"
import  ForgotPassword from "./Compoentes/Froms/ForgotPassword"
import ResetPassword from "./Compoentes/eCommerce/ResetPassword";


import "./Syles/Header.css"
import "./Syles/HeaderTop.css"
import "./Syles/MySlider.css"
import "./Syles/SideBar.css"
import "./Syles/SideBar2.css"
import "./Syles/Footer.css"
import "./Syles/FooterEnd.css"
import "./Syles/ProductsData.css"
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
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}> 
         <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login/>}/>
          <Route path="sinup" element={<Sinup/>}/>
          <Route path="/ContinueShopping" element={<ContinueShopping/>}/>
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="products/:id" element={<ProductsData />}/>
          <Route path="Fakestoreapi/:id" element={<Fakestoreapi/>}/>
          <Route path="*" element={<h1>Page Not Found</h1>} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/order" element={<Order />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />}/>
        </Route>
      </Routes>

    </>
  );
}

export default App;
