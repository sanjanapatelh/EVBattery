import { partnerData } from "../../data/Data";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const PartnerSection = () => {
  return (
    <DivAnimateYAxis className="rv-12-partners rv-section-spacing">
      <div className="container">
        <Swiper
          className="rv-12-partners__slider"
          autoplay={true}
          spaceBetween={37}
          slidesPerView={5}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 3,
            },
            576: {
              slidesPerView: 4,
            },
            768: {
              spaceBetween: 97,
              slidesPerView: 4,
            },
            992: {
              spaceBetween: 97,
              slidesPerView: 5,
            },
            1200: {
              spaceBetween: 147,
              slidesPerView: 5,
            },
            1400: {
              spaceBetween: 170,
              slidesPerView: 5,
            },
          }}
          modules={[Autoplay]}
        >
          {partnerData.map((partner, index) => (
            <SwiperSlide key={index}>
              <img src={partner} alt="Partner Logo" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </DivAnimateYAxis>
  );
};

export default PartnerSection;
