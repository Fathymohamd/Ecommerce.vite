import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import SideBar from './SideBar'
import { Link } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import {fetchAllProducts    , addToCart} from  "../../Redux/createSlice"
import Pagination from "./Pagination"
function ContinueShopping() {

  return (
<div>

<div className="continus">
<SideBar/>

<div className="pagination">
<Pagination />
</div>
 
</div> 

</div>
  )
}

export default ContinueShopping