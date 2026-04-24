import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
function CheckImgs() {
  return (
    <div id='CheckImgs'>
        <div className="CheckImgs">
           <div id="show">
           <h4>Cookies and Ice Cream Cookies and Ice Cream</h4>
          <Link id='link_show' className='link' to="/ContinueShopping">Show now <FaArrowRight size={12} /></Link>
         </div>
        </div>
            <div className="CheckImgs1">
            <div id="show">
           <h4>Cookies and Ice Cream Cookies and Ice Cream</h4>
          <Link id='link_show' className='link' to="/ContinueShopping">Show now <FaArrowRight size={12}  /></Link>
         </div>
        </div>
    </div>
  )
}

export default CheckImgs