import React from 'react'
import SwiperData from '../eCommerce/SwiperData';
import Features from "../eCommerce/Features";
import Categories from "../eCommerce/Categories";
import FeaturedProducts from "../eCommerce/FeaturedProducts";
import BigDeals from "../eCommerce/BigDeals";
import BestSellers from "../eCommerce/BestSellers";
import NewArrivals from "../eCommerce/NewArrivals";
import Newsletter from "../eCommerce/Newsletter";
function Home() {
  return (
    <div>
  <SwiperData/>
  <Features/>
  <Categories/>
 <FeaturedProducts/>
 <BigDeals/>
<BestSellers/>
<NewArrivals/>
<Newsletter/>
    </div>
  )
}

export default Home