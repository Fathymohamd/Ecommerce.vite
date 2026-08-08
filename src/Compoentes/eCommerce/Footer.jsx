
import { FaSearch } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { FaAppleAlt, FaTruck, FaGift, FaMoneyBillWave } from 'react-icons/fa'

<FaQuestionCircle className="icon" />
import Footer_img  from "../../assets/imgs_MySlider/3.png"
 import footer_center from "../../assets/imgs_MySlider/3.svg"
import FooterEnd from "./FooterEnd";
import { useTranslation } from "react-i18next";
function Footer() {
const {t , i18n} = useTranslation()
  return (
   <>
    <div id="footer">
    <div className="footer">
    <h1> {t("$20 discount for your first order")}</h1>
    <p> {t("Join our newsletter and get...")}</p>
    <h3> {t("Join our email subscription now to get updates on promotions and coupons.")}</h3>
         <div className="search-box">
          <FaSearch className="icon" />
          <input type="text" id="Address" placeholder={t("You Email Address")} />
           <button className='Subscribe'> {t("Subscribe")}</button>
          </div>
    </div>
    <div className="Footer_img">
 <img id="Footer_img" src={Footer_img}/> 
    </div>

    </div>
  <div className="assets">
  <div className="footer_you">
    <div className="footer_center"><p><FaAppleAlt/></p><p> {t("Everyday fresh products")}</p></div>
    <div className="footer_center"><p><FaTruck/></p><p> {t("Free delivery for order over $70")}</p></div>
    <div className="footer_center"><p><FaGift/></p><p> {t("Daily Mega Discounts")}</p></div>
    <div className="footer_center"><p><FaMoneyBillWave/></p><p> {t("Best price on the market")}</p></div>
    </div>
    <div className="Footer_End">
   <div className="Vegetables"> 
   <h1> {t("Fruit & Vegetables")}</h1> 
   <p> {t("Fresh Vegetables")}</p>
   <p> {t("Herbs & Seasonings")}</p>
   <p> {t("Fresh Fruits")}</p>
   <p>s {t("Cuts & Sprout")}</p>
   <p> {t("Exotic Fruits & Veggies")}</p>
   <p> {t("Packaged Produce")}</p>
   <p> {t("Party Trays")}</p>
    <p> {t("Party Trays")}</p>
   </div>
<div className="Vegetables">
  <h1>{t("Breakfast & Dairy")}</h1>
  <p>{t("Milk & Flavoured Milk")}</p>
  <p>{t("Cheese")}</p>
  <p>{t("Eggs Substitutes")}</p>
  <p>{t("Honey")}</p>
  <p>{t("Milk & Flavoured Milk")}</p>
  <p>{t("Marmalades")}</p>
  <p>{t("Sour Cream and Dips")}</p>
  <p>{t("Yogurt")}</p>
</div>

<div className="Vegetables">
  <h1>{t("Meat & Seafood")}</h1>
  <p>{t("Dinner Sausage")}</p>
  <p>{t("Beef")}</p>
  <p>{t("Chicken")}</p>
  <p>{t("Sliced Deli Meat")}</p>
  <p>{t("Shrimp")}</p>
  <p>{t("Wild Caught Fillets")}</p>
  <p>{t("Crab and Shellfish")}</p>
  <p>{t("Farm Raised Fillets")}</p>
</div>

<div className="Vegetables">
  <h1>{t("Beverages")}</h1>
  <p>{t("Water")}</p>
  <p>{t("Sparkling Water")}</p>
  <p>{t("Coffee")}</p>
  <p>{t("Milk & Plant-Based Milk")}</p>
  <p>{t("Tea & Kombucha")}</p>
  <p>{t("Drink Boxes & Pouches")}</p>
  <p>{t("Craft Beer")}</p>
  <p>{t("Wine")}</p>
</div>

<div className="Vegetables">
  <h1>{t("Breads & Bakery")}</h1>
  <p>{t("Milk & Flavoured Milk")}</p>
  <p>{t("Butter and Margarine")}</p>
  <p>{t("Cheese")}</p>
  <p>{t("Eggs Substitutes")}</p>
  <p>{t("Honey")}</p>
  <p>{t("Marmalades")}</p>
  <p>{t("Sour Cream and Dips")}</p>
  <p>{t("Yogurt")}</p>
</div>
    </div>
     <FooterEnd/>
  </div>

   </>
  )
}


export default Footer
