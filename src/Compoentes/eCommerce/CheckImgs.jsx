import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
function CheckImgs() {
  const {t , i18n} = useTranslation()
  return (
    <div id='CheckImgs'>
        <div className="CheckImgs">
           <div id="show">
           <h4>{t("Cookies and Ice Cream")}</h4>
          <Link id='link_show' className='link' to="/ContinueShopping">{t("Show now")}<FaArrowRight size={12} /></Link>
         </div>
        </div>
            <div className="CheckImgs1">
            <div id="show">
           <h4>{t("Cookies and Ice Cream")}</h4>
          <Link id='link_show' className='link' to="/ContinueShopping">{t("Show now")}<FaArrowRight size={12}  /></Link>
         </div>
        </div>
    </div>
  )
}

export default CheckImgs