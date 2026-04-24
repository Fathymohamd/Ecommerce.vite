import { FaStar } from "react-icons/fa6";
import ReactCountryFlag from "react-country-flag";
import HeaderTop from "./HeaderTop";
import {useState } from "react";
import { Link } from "react-router-dom";
function Header() {
const [state , setstate] = useState(".add")
  return (
    <div>
    <div className="img_Header"><h1>Due to current circumstances, there may be slight delays in order processing</h1></div>
    <div className="fathy">
        <div className="sellon">
    <div className="fastar">
     <div className="faster_react"> <FaStar style={{ fontSize: "10px" }} /></div>
          <h1>  Sell On Jumia</h1>
      </div>

<Link to="/" className="link">
    <div className="sellon_center">
     <div className="faster_twe">
      <p>Jumia</p>
    <div className="faster_react_1"> <FaStar style={{ fontSize: "8px" }} /></div>
     </div>
      <p>pay</p>
    </div> 
</Link>
  

   <div className="sellon_lrigt">
    <div className="go_li" onClick={()=>setstate(state)}>
    <ReactCountryFlag countryCode="GB" svg className="svg" />
    <p>English</p>
    </div>
   <div className="reactcount">
    <ReactCountryFlag countryCode="EG" svg className="svg"/>
     <p>عربى</p>
   </div>
    </div> 

    </div>
    </div>
    < HeaderTop/>
    </div>
  )
}

export default Header