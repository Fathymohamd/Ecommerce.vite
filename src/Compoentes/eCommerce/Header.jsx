import { FaStar } from "react-icons/fa6";
import ReactCountryFlag from "react-country-flag";
import HeaderTop from "./HeaderTop";
import {useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n"
function Header() {
const [state , setstate] = useState(".add")
const { t, i18n   } = useTranslation();
const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
  localStorage.setItem("language", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lang;
};
  return (
    <div>
    <div className="img_Header"><h1>{t("Due to current circumstances, there may be slight delays in order processing")}</h1></div>
    <div className="fathy">
        <div className="sellon">
    <div className="fastar">
     <div className="faster_react"> <FaStar style={{ fontSize: "10px" }} /></div>
        <Link to="ContinueShopping" className="link">  <h1> {t("Sell On Jumia") }</h1></Link>
      </div>


    <div className="sellon_center">
     <div className="faster_twe">
      <Link to="/" className="link">
      <p>{t("Jumia")}</p>
      </Link>
    <div className="faster_react_1"> <FaStar style={{ fontSize: "8px" }} /></div>
     </div>
      <p><Link to="/order" className="link">{t("My Orders")}</Link></p>
    </div> 

  

   <div className="sellon_lrigt">
    <div className="go_li" onClick={()=>setstate(state)}>
    <ReactCountryFlag countryCode="GB" svg className="svg" />
    <p onClick={() => changeLanguage("en")}>English</p>
    </div>
   <div className="reactcount">
    <ReactCountryFlag countryCode="EG" svg className="svg"/>
     <p onClick={() => changeLanguage("ar")}>عربى</p>
   </div>
    </div> 

    </div>
    </div>
    < HeaderTop/>
    </div>
  )
}

export default Header