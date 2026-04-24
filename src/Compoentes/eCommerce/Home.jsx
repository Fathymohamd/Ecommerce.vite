import React from 'react'
import MySlider from "../eCommerce/MySlider";
import Products from './Products';
import Imgas from './Imgas';
import SwiperData from '../eCommerce/SwiperData';
import CheckImgs from './CheckImgs';


function Home() {
  return (
    <div>
  <SwiperData/>
 <MySlider/>
 <Imgas/>
<Products/>
<CheckImgs/>
    </div>
  )
}

export default Home