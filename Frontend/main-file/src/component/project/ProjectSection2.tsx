import { projectData3 } from "../../data/Data";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DivAnimateXAxis from "../utils/DivAnimateXAxis";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import { Link } from "react-router-dom";

const ProjectSection2 = () => {
  return (
    <section className="rv-9-projects pt-60 pb-60">
      <div className="container">
        <div className="rv-3-section-heading">
          <div className="rv-3-section-heading__left">
            <div>
              <h6 className="rv-9-section__sub-title">Current Projects</h6>
            </div>
            <div>
              <h2 className="rv-9-section__title">Backed Projects.</h2>
            </div>
          </div>

          <DivAnimateXAxis className="rv-9-section-heading__right">
            <div
              className="rv-1-slider-nav rv-9-slider-nav"
              id="rv-9-projects-slider-nav"
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
        <DivAnimateYAxis visible>
          <Swiper
            className="rv-9-projects__slider overflow-visible"
            autoplay={true}
            spaceBetween={20}
            slidesPerView={2.3}
            loop={true}
            centeredSlides={true}
            navigation={{
              prevEl: "#rv-9-projects-slider-nav .prev",
              nextEl: "#rv-9-projects-slider-nav .next",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              480: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
              992: {
                spaceBetween: 30,
                slidesPerView: 2.5,
              },
              1400: {
                centeredSlides: false,
                slidesPerView: 2.3,
              },
            }}
            modules={[Autoplay, Navigation]}
          >
            {projectData3.slice(0, 5).map((item) => (
              <SwiperSlide className="rv-3-project rv-9-project" key={item.id}>
                <div className="rv-3-project__img">
                  <img src={item.img} alt="Project Image" />
                  <div className="rv-3-project__actions">
                    <div className="rv-3-project__actions">
                      <button className="quick-view">
                        <i className="fa-light fa-magnifying-glass"></i>
                      </button>
                      <Link to={`/projects/${item.slug}`}>
                        <i className="fa-light fa-link-simple"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="rv-9-project__txt">
                  <span className="rv-3-project__sub-title">
                    {item.subTitle}
                  </span>
                  <h5 className="rv-9-project__title">
                    <Link to={`/projects/${item.slug}`}>{item.title}</Link>
                  </h5>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </DivAnimateYAxis>
      </div>
    </section>
  );
};

export default ProjectSection2;
