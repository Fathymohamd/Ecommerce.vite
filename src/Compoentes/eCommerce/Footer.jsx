
import { FaSearch } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { FaAppleAlt, FaTruck, FaGift, FaMoneyBillWave } from 'react-icons/fa'

<FaQuestionCircle className="icon" />
import Footer_img  from "../../assets/imgs_MySlider/3.png"
 import footer_center from "../../assets/imgs_MySlider/3.svg"
import FooterEnd from "./FooterEnd";
function Footer() {
  return (
   <>
    <div id="footer">
    <div className="footer">
    <h1>$20 discount for your first order</h1>
    <p>Join our newsletter and get...</p>
    <h3>Join our email subscription now to get updates
     on promotions and coupons.</h3>
         <div className="search-box">
          <FaSearch className="icon" />
          <input type="text" placeholder="You Email Address" />
           <button className='Subscribe'>Subscribe</button>
          </div>
    </div>
    <div className="Footer_img">
 <img id="Footer_img" src={Footer_img}/> 
    </div>

    </div>
  <div className="assets">
  <div className="footer_you">
    <div className="footer_center"><p><FaAppleAlt/></p><p>Everyday fresh products</p></div>
    <div className="footer_center"><p><FaTruck/></p><p>Free delivery for order over $70</p></div>
    <div className="footer_center"><p><FaGift/></p><p>Daily Mega Discounts</p></div>
    <div className="footer_center"><p><FaMoneyBillWave/></p><p>Best price on the market</p></div>
    </div>
    <div className="Footer_End">
   <div className="Vegetables"> 
   <h1>Fruit & Vegetables</h1> 
   <p>Fresh Vegetables</p>
   <p>Herbs & Seasonings</p>
   <p>Fresh Fruits</p>
   <p>Cuts & Sprouts</p>
   <p>Exotic Fruits & Veggies</p>
   <p>Packaged Produce</p>
   <p>Party Trays</p>
    <p>Party Trays</p>
   </div>
   <div className="Vegetables">
     <h1>Breakfast & Dairy</h1>
   <p>Milk & Flavoured Milk</p> 
   <p>Cheese</p>
   <p>Eggs Substitutes</p>
   <p>Honey</p>
   <p>Milk & Flavoured Milk</p>
   <p>Marmalades</p>
   <p>Sour Cream and Dips</p>
   <p>Yogurt</p>
    </div>
   <div className="Vegetables"> 
    <h1>Meat & Seafood</h1>
    <p>Dinner Sausage</p> 
   <p>Beef</p>
   <p>Chicken</p>
   <p>Sliced Deli Meat</p>
   <p>Shrimp</p>
   <p>Wild Caught Fillets</p>
   <p>Crab and Shellfish</p>
   <p>Farm Raised Fillets</p>
    </div>
    
   <div className="Vegetables">
    <h1>Beverages</h1>
    <p>Water</p> 
   <p>Sparkling Water</p>
   <p>Coffee</p>
   <p>Milk & Plant-Based Milk</p>
   <p>Tea & Kombucha</p>
   <p>Drink Boxes & Pouches</p>
   <p>Craft Beer</p>
   <p>Wine</p>
    </div>

   <div className="Vegetables">
    <h1>Breads & Bakery</h1>
    <p>Milk & Flavoured Milk</p> 
   <p>Butter and Margarine</p>
   <p>Cheese</p>
   <p>Eggs Substitutes</p>
   <p>Honey</p>
   <p>Marmalades</p>
   <p>Sour Cream and Dips</p>
   <p>Yogurt</p>
    </div>
    </div>
     <FooterEnd/>
  </div>

   </>
  )
}


export default Footer
