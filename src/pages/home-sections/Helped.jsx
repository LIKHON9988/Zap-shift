import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import brand1 from "../../assets/brands/amazon.png";
import brand2 from "../../assets/brands/amazon_vector.png";
import brand3 from "../../assets/brands/casio.png";
import brand4 from "../../assets/brands/moonstar.png";
import brand5 from "../../assets/brands/randstad.png";
import brand6 from "../../assets/brands/star.png";
import brand7 from "../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";

const brandLogos = [brand1, brand2, brand3, brand4, brand5, brand6, brand7];

const Helped = () => {
  return (
    <>
      <Swiper
        loop={true}
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {brandLogos.map((logo) => (
          <SwiperSlide>
            <img src={logo} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Helped;
