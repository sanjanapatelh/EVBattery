import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ProjectDetailSlider = () => {
  const images = [
    "/assets/img/rv-project-details-img-1.jpg",
    "/assets/img/rv-14-banner-bg.jpg",
    "/assets/img/rv-project-details-img-2.jpg",
  ];
  return (
    <div className="rv-project-details-slider-container">
      <Swiper
        className="rv-project-details__cover-slider"
        slidesPerView={1}
        loop={true}
        effect={"fade"}
        autoplay={true}
        navigation={{
          prevEl: "#rv-project-details__cover-slider-nav .prev",
          nextEl: "#rv-project-details__cover-slider-nav .next",
        }}
        modules={[Autoplay, EffectFade, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide className="rv-project-details__img" key={index}>
            <img src={image} alt="Project Details Cover" />
          </SwiperSlide>
        ))}
        <div
          className="rv-1-slider-nav rv-7-slider-nav"
          id="rv-project-details__cover-slider-nav"
        >
          <button className="prev">
            <i className="fa-regular fa-arrow-left"></i>
          </button>
          <button className="next">
            <i className="fa-regular fa-arrow-right"></i>
          </button>
        </div>
      </Swiper>
    </div>
  );
};

export default ProjectDetailSlider;
