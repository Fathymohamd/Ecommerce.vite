import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import imgas from "../../assets/Swiper/1.png"
import imgas1 from "../../assets/Swiper/2.png"
import imgas2 from "../../assets/Swiper/3.png"
import imgas3 from "../../assets/Swiper/4.png"
import imgas4 from "../../assets/Swiper/5.png"
function SwiperData() {
  return (
    <div>
<Swiper className='swiper_Top'
  modules={[Navigation, Autoplay]}
  navigation
  autoplay={{ delay: 2000 }}
>
  <SwiperSlide><img id='Swiper-img' src={imgas}/></SwiperSlide>
  <SwiperSlide><img id='Swiper-img' src={imgas1}/></SwiperSlide>
  <SwiperSlide><img id='Swiper-img' src={imgas2}/></SwiperSlide>
  <SwiperSlide><img id='Swiper-img' src={imgas3}/></SwiperSlide>
  <SwiperSlide><img id='Swiper-img' src={imgas4}/></SwiperSlide>
</Swiper>

    </div>
  )
}

export default SwiperData