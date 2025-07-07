import { projectData } from "../../data/Data";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DivAnimateXAxis from "../utils/DivAnimateXAxis";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const ProjectSection = () => {
  return (
    <section className="rv-12-projects rv-section-spacing">
      <div className="container">
        <div className="rv-3-section-heading">
          <div className="rv-7-section-heading__left">
            <h6 className="rv-7-section__sub-title rv-text-anime">
              Our Tea Emporium
            </h6>

            <h2 className="rv-7-section__title rv-text-anime">
              Rejoice in Your Tea Respite
            </h2>
          </div>

          <DivAnimateXAxis className="rv-3-section-heading__right">
            <div
              className="rv-1-slider-nav rv-12-slider-nav mt-0"
              id="rv-12-projects__slider-nav"
            >
              <button className="prev">
                <i className="fa-regular fa-arrow-left"></i>
              </button>
              <button className="next">
                <i className="fa-regular fa-arrow-right"></i>
              </button>
            </div>
          </DivAnimateXAxis>
        </div>
      </div>
      <DivAnimateYAxis visible position={40}>
        <Swiper
          className="rv-12-projects__slider"
          autoplay={{
            delay: 3000,
          }}
          spaceBetween={20}
          slidesPerView={1.7}
          centeredSlides={true}
          loop={true}
          navigation={{
            prevEl: "#rv-12-projects__slider-nav .prev",
            nextEl: "#rv-12-projects__slider-nav .next",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 1.4,
            },
            768: {
              slidesPerView: 1.8,
            },
            992: {
              slidesPerView: 1.8,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 1.6,
            },
            1400: {
              slidesPerView: 1.6,
              spaceBetween: 40,
            },
            1600: {
              spaceBetween: 50,
            },
          }}
          modules={[Navigation, Autoplay]}
        >
          {projectData.map((project, index) => (
            <SwiperSlide className="rv-12-project" key={index}>
              <div className="rv-12-project__img">
                <img src={project} alt={`rv-12-project-${index + 1}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </DivAnimateYAxis>
    </section>
  );
};

export default ProjectSection;
