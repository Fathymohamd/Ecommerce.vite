import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { FaUser  } from "react-icons/fa";
import { useEffect, useState  , useRef } from "react";
import { useSelector } from "react-redux";
import totalPrice from "../../Routes/Cart"
<FaQuestionCircle className="icon" />
import { useTranslation } from "react-i18next";
function HeaderTop() {
  const cartData = useSelector((state) => state.counter.cartData); 
  const totalPrice = cartData.reduce((acc , item) =>{
    return acc + item.price * item.quantity
  } , 0)
 
const [sinup , setsinup] = useState(false)

const [search, setSearch] = useState("");
const [products, setProducts] = useState([]);

const searchRef = useRef(null);
const {t , i18n} = useTranslation()
useEffect(()=>{
const  handleClickOutside  = (e)=>{
if (searchRef.current && !searchRef.current.contains(e.target) ) { 
  setProducts([])
  setSearch("")
}}
document.addEventListener("pointerdown", handleClickOutside); 
return () => { 
  document.removeEventListener( "pointerdown", handleClickOutside )
  };
} , [])
 
useEffect(() => {
  const delayDebounce = setTimeout(() => {
    if (search.trim() === "") {
      setProducts([]);
      return;
    }else {
 handleSearch();
    }
  }, 400);

return () => clearTimeout(delayDebounce);
}, [search]);


const handleSearch = async () => {
  const res = await fetch(
    `https://ecommerce-vite-9iwf.vercel.app/api/products/search?q=${search}`
  );
  const data = await res.json();
  setProducts(data);
};

  return (
    <div id="header_Top">
    <div className="header_Top">
   <Link to="/" className="link">
       <div className="faster_twe-Top">
          <p>{t("Jumia")}</p>
         
        <div className="faster_react_2"><FaStar style={{ fontSize: "15px" }} /></div>
         </div>
   </Link>

         
    <div className="search-box">
     <FaSearch className="icon" />
     <input type="text" placeholder={t("Seareh products, brands and categorise")}   value={search}
  onChange={(e) => setSearch(e.target.value)} />
     {/*  <button className='buttonacton'>Search</button> */}
     </div>


         <div className="img_center">
      <Link to="/logout" className="logout-link">{t("Logout")}</Link>
            <div className="account" onClick={()=>setsinup(!sinup)}>
            <FaUser />
            <p>{t("Account")}</p>
             <MdKeyboardArrowDown style={{fontSize: "20px"}}/>
            </div>
          {sinup && (   <div className="Login">
             <div className="SinUp">
            <Link to="login" className="link"><p>{t("Login")}</p></Link>
            <Link to="sinup" className="link"><p>{t("SinUp")}</p></Link>
             </div>
             </div>)}
            <div className="heelp">
                <p>${totalPrice.toFixed(2)}</p>
            </div>
      <Link to="cart" className="link">
      <div className="cart">
      <FaCartShopping />
      <div className="Price_one">{cartData.length}</div>
      <p>{t("Cart")}</p>
      </div>
      </Link>
      </div>
    </div>
   
{products.length > 0 && (
  <div className="searchResults" ref={searchRef}>
    {products.map((item) => (
      <div className="searchProducts" key={item.id}>
        <img
          id="imgProduct"
          src={item.image || item.images?.[0]}
  
        />
        <div className="searchInfo">
          <h3>{i18n.language === "ar" ? t(`products.${item.id}.title`): item.title}</h3>
          <h4>$ {item.price}</h4>
        </div>
      </div>
    ))}
  </div>
)}

    </div>
  )
}

export default  HeaderTop