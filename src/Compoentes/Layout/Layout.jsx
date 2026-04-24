import { Outlet } from "react-router-dom";
import Header from "../eCommerce/Header";
import Footer from "../eCommerce/Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet /> 
      <Footer />
    </div>
  );
};

export default Layout