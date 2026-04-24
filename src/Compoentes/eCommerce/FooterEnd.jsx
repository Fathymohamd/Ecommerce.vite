
import imgs_In  from "../../assets/imgs/3.svg"
import imgs_On from "../../assets/imgs/5.svg"
import cookie  from  "../../assets/imgs/6.svg"
import { FaPhone } from 'react-icons/fa';
import { FaFacebook, FaTwitter, FaFacebookMessenger } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
 function FooterEnd() {
  return (
    <div>
    <div className="FooterEnd">
    <div className="nmber"><p><FaPhone/></p><p id="data"><span>8 800 555-55 </span>Working 8:00 - 22:00</p></div>
    <div className="mobil"><p id="mobil"><span>Download App on Mobile :</span>
    15% discount on your first purchase</p>
    <div className="imgs_In">
    <img src={imgs_In}/> 
      <img src={imgs_On}/>
    </div>
      <div className="incon">
        <p><FaFacebook  color="#1877F2" /></p>
        <p><FaTwitter color="#1877F2"  /></p>
        <p><FaFacebookMessenger color="#1877F2" /></p>
     </div>
    </div>
    </div>
    <div className="All-Rigth">
    <p>Copyright 2025 © All rights reserved by Blackrise Theme</p>
    <div className="theme">
    <p>Privacy Policy</p>
    <p>Terms and Conditions</p>
    <p>Cookie</p>
    <img src={cookie}/>
    </div>
    </div>
    </div>
  )
}

export default FooterEnd