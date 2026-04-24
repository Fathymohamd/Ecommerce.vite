import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { FaUser  } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import totalPrice from "../../Routes/Cart"
<FaQuestionCircle className="icon" />

function HeaderTop() {
  const cartData = useSelector((state) => state.counter.cartData); 
  const totalPrice = cartData.reduce((acc , item) =>{
    return acc + item.price * item.quantity
  } , 0)
  console.log(cartData);
   const [sinup , setsinup] = useState(false)
  return (
    <div id="header_Top">
    <div className="header_Top">
   <Link to="/" className="link">
       <div className="faster_twe-Top">
          <p>Jumia</p>
        <div className="faster_react_2"> <FaStar style={{ fontSize: "15px" }} /></div>
         </div>
   </Link>

         <form>
    <div className="search-box">
     <FaSearch className="icon" />
     <input type="text" placeholder="Seareh products, brands and categorise" />
      <button className='buttonacton'>Search</button>
     </div>
   
         </form>
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
    </div>
  )
}

export default  HeaderTop