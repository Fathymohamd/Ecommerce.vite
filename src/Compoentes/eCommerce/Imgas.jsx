import React from 'react'
import imgase3  from "../../assets/imgs_MySlider/7.png" 
import imgase4  from "../../assets/imgs_MySlider/8.png" 
import imgase5  from "../../assets/imgs_MySlider/9.png" 
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
function Imgas() {
const {t , i18n} = useTranslation()
  return (
    <div>
        <div className="imgas">
      <div id="imgas">
        <div className="show">
         <div id="show">
           <p>{t("Weekend Discount 40%")}</p>
          <h2>{t("Natural Eggs")}</h2>
          <h1>{t("Eat one every day")}</h1>
          <Link id='link_show' className='link' to="/ContinueShopping">{t("Show now")} <FaArrowRight size={12} /></Link>
         </div>
        </div>
            <div className="show1">
           <div id="show">
           <p>{t("Weekend Discount 40%")}</p>
          <h2>{t("Natural Eggs")}</h2>
          <h1>{t("Eat one every day")}</h1>
          <Link id='link_show' className='link' to="/ContinueShopping">{t("Show now")} <FaArrowRight size={12} /></Link>
         </div>
        </div>
            <div className="show2">
       <div id="show">
           <p>{t("Weekend Discount 40%")}</p>
          <h2>{t("Natural Eggs")}</h2>
          <h1>{t("Eat one every day")}</h1>
          <Link id='link_show' className='link' to="/ContinueShopping">{t("Show now")} <FaArrowRight size={12} /></Link>
         </div>
        </div>
    
        <img className='center_imgase' src={imgase3}/>
        <img className='center_imgase' src={imgase4}/>
        <img className='center_imgase' src={imgase5}/>
      </div>
        </div>
    </div>
  )
}

export default Imgas