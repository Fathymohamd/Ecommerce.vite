import React from 'react'
import SideBar2 from './SideBar2'

function SideBar() {
  return (
    <div>
    <div className="SideBar">
      <div className="spanadd"><p>PRODUCT CATEGORIES</p></div>
     <div className="checkboks">
       <div className="checkbok">
        <input id='win' type='checkbox' name="os"/>
        <label htmlFor="win" className='win'>Beverages</label>
      </div>
        <div className="checkbok">
        <input id='win1' type='checkbox' name="os" value="Biscuits & Snacks"/>
        <label htmlFor="win1" className='win'>Biscuits & Snacks</label>
      </div>
        <div className="checkbok">
        <input id='win2' type='checkbox' name="os"/>
        <label htmlFor="win2" className='win'>Breads & Bakery</label>
      </div>
        <div className="checkbok">
        <input id='win3' type='checkbox' name="os"/>
        <label htmlFor="win3" className='win'>Breakfast & Dairy</label>
      </div>
        <div className="checkbok">
        <input id='win4' type='checkbox' name="os"/>
        <label htmlFor="win4" className='win'>Frozen Foods</label>
      </div>
        <div className="checkbok">
        <input id='win5' type='checkbox' name="os"/>
        <label htmlFor="win5" className='win'>Fruits & Vegetables</label>
      </div>
        <div className="checkbok">
        <input id='win6' type='checkbox' name="os"/>
        <label htmlFor="win6" className='win'>Grocery & Staples</label>
      </div>
        <div className="checkbok">
        <input id='win7' type='checkbox' name="os"/>
        <label htmlFor="win7" className='win'>Household Needs</label>
      </div>
         <div className="checkbok">
        <input id='win8' type='checkbox' name="os"/>
        <label htmlFor="win8" className='win'>Meats & Seafood</label>
      </div>
     </div>
     <SideBar2/>
    </div>
    </div>
  )
}

export default SideBar