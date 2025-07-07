import { testimonialData } from "../../data/Data";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const TestimonialSection = () => {
  return (
    <section className="rv-20-testimonial_section">
      <div className="container">
        <DivAnimateYAxis className="row" visible>
          <div className="col-md-12 position-relative">
            <Swiper
              className="rv-20-testimonial"
              loop={true}
              pagination={{
                el: ".rv-20-custom-pagination",
                bulletClass: "rv-20-custom-pagination-bullet",
                bulletActiveClass: "active",
              }}
              modules={[Pagination]}
            >
              {testimonialData.map((item) => (
                <SwiperSlide className="rv-20-single_testimonial" key={item.id}>
                  <div className="rv-20-single_testimonial_image">
                    <img src={item.mainImg} alt="image" />
                  </div>
                  <div className="rv-20-single_testimonial_content">
                    <div className="rv-20-single_testimonial_rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <p className="rv-20-single_testimonial_text_area">
                      {item.testimony}
                    </p>
                    <div className="rv-20-single_testimonial_bottom">
                      <div className="rv-20-testimonial_author_meta">
                        <h3 className="rv-20-testimonial_author_name">
                          <a href="#">{item.name}</a>
                        </h3>
                        <p className="rv-20-testimonial_author_designation">
                          {item.designation}
                        </p>
                      </div>
                      <div className="rv-20-single_testimonial_icon">
                        <i className="fas fa-quote-right"></i>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="rv-20-custom-pagination"></div>
          </div>
        </DivAnimateYAxis>
      </div>
    </section>
  );
};

export default TestimonialSection;
