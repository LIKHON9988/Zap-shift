import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviews }) => {
  const allReviews = use(reviews);

  return (
    <div className=" mx-3 md:mx-0 mb-5">
      <div className="text-center space-y-3 mb-6">
        <h1 className="font-bold text-2xl sm:text-3xl">
          What our customers are saying
        </h1>
        <h5 className="text-sm sm:text-base text-gray-600 px-4 sm:px-0">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </h5>
      </div>

      <Swiper
        effect={"coverflow"}
        loop={true}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={4} // DESKTOP DEFAULT (unchanged)
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          scale: 0.81,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper py-10"
        breakpoints={{
          /** 📱 UNIQUE MOBILE LOOK */
          0: {
            slidesPerView: 1.1,
            coverflowEffect: {
              rotate: 18, // slight tilt
              stretch: 30, // soft spacing
              depth: 160, // mild 3D
              scale: 0.88, // smaller center card
              slideShadows: true,
            },
          },

          /** 📱 Larger Phones */
          480: {
            slidesPerView: 1.2,
            coverflowEffect: {
              rotate: 20,
              stretch: 40,
              depth: 180,
              scale: 0.86,
              slideShadows: true,
            },
          },

          /** Tablet (same feel as before, not changing desktop) */
          768: {
            slidesPerView: 2,
          },

          /** DESKTOP — DO NOT TOUCH */
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {allReviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="mobile:rounded-3xl mobile:shadow-xl mobile:rotate-[-2deg] mobile:border mobile:border-gray-200 mobile:overflow-hidden">
              <ReviewCard review={review} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
