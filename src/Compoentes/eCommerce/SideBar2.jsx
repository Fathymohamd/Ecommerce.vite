import img_Checkbox from "../../assets/imgs_MySlider/1.png"
function SideBar2() {
  return (
    <div>
    <div className="sidebar2">
        <p>BRANDS</p>
        <div className="checkbok">
        <input id='win9' type='checkbox' name="os"/>
        <label htmlFor="win9" className='win'>Frito Lay</label>
      </div>
          <div className="checkbok">
        <input id='win10' type='checkbox' name="os"/>
        <label htmlFor="win10" className='win'>Quaker</label>
      </div>
          <div className="checkbok">
        <input id='win11' type='checkbox' name="os"/>
        <label htmlFor="win11" className='win'>Cola</label>
      </div>
             <div className="checkbok">
        <input id='win12' type='checkbox' name="os"/>
        <label htmlFor="win12" className='win'>Welch's</label>
      </div>
             <div className="checkbok">
        <input id='win13' type='checkbox' name="os"/>
        <label htmlFor="win13" className='win'>Oreo</label>
      </div>
       <div className="PRICE">
        <p>PRICE</p>
        <div className="inputs">
        <input type="number" />
        <input type="number" />
        </div>
       </div>

       <div className="AVAILABILIYT">
        <p>AVAILABILITY</p>
        <div className="checkbok">
        <input id='win14' type='checkbox' name="os"/>
        <label htmlFor="win14" className='win'>In stock</label>
        </div>
        <div className="checkbok">
        <input id='win15' type='checkbox' name="os"/>
        <label htmlFor="win15" className='win'>Out of stock</label>
      </div>
       <img className="img_Checkbox" src={img_Checkbox}/>
       </div>
    </div>
    </div>
  )
}

export default SideBar2