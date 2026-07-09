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

function HeaderTop() {
  const cartData = useSelector((state) => state.counter.cartData); 
  const totalPrice = cartData.reduce((acc , item) =>{
    return acc + item.price * item.quantity
  } , 0)
 
const [sinup , setsinup] = useState(false)

const [search, setSearch] = useState("");
const [products, setProducts] = useState([]);

const searchRef = useRef(null);

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
    `http://localhost:5000/api/products/search?q=${search}`
  );
  const data = await res.json();
  setProducts(data);
};

  return (
    <div id="header_Top">
    <div className="header_Top">
   <Link to="/" className="link">
       <div className="faster_twe-Top">
          <p>Jumia</p>
        <div className="faster_react_2"> <FaStar style={{ fontSize: "15px" }} /></div>
         </div>
   </Link>

         
    <div className="search-box">
     <FaSearch className="icon" />
     <input type="text" placeholder="Seareh products, brands and categorise"   value={search}
  onChange={(e) => setSearch(e.target.value)} />
     {/*  <button className='buttonacton'>Search</button> */}
     </div>


         <div className="img_center">
           
            <div className="account" onClick={()=>setsinup(!sinup)}>
            <FaUser />
            <p>Account</p>
             <MdKeyboardArrowDown style={{fontSize: "20px"}}/>
            </div>
          {sinup && (   <div className="Login">
             <div className="SinUp">
            <Link to="login" className="link"><p>Login</p></Link>
            <Link to="sinup" className="link"><p>SinUp</p></Link>
             </div>
             </div>)}
            <div className="heelp">
                <p>${totalPrice.toFixed(2)}</p>
            </div>
      <Link to="cart" className="link">
      <div className="cart">
      <FaCartShopping />
      <div className="Price_one">{cartData.length}</div>
      <p>Cart</p>
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
          <h3>{item.title}</h3>
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