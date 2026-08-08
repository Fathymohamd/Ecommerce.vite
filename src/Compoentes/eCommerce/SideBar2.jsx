import img_Checkbox from "../../assets/imgs_MySlider/1.png"
import { useSelector , useDispatch } from 'react-redux'
import {useState  , useEffect} from "react"
import { useTranslation } from "react-i18next"
function SideBar2() {
const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");
const {t , i18n} = useTranslation()
  return (
    <div>
    <div className="sidebar2">
       
       <div className="PRICE">
        <p>{t("PRICE")}</p>
        <div className="inputs">
        <input value={minPrice}   onChange={(e) => setMinPrice(e.target.value)}  type="number" />
        _
        <input value={maxPrice}   onChange={(e) => setMaxPrice(e.target.value)}  type="number" />
        </div>
       </div>
  
       <div className="AVAILABILIYT">
      
       <img className="img_Checkbox" src={img_Checkbox}/>
       </div>
    </div>
    </div>
  )
}

export default SideBar2