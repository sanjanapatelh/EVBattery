import { testimonialData2 } from "../../data/Data";
import { useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const TestimonialSection2 = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <section
      className="rv-12-testimonial text-center rv-section-spacing"
      data-aos="fade-up"
    >
      <DivAnimateYAxis
        visible
        position={40}
        className="container position-relative"
      >
        <h6 className="rv-7-section__sub-title rv-text-anime">
          Customer Review
        </h6>
        <div className="row justify-content-center">
          <div className="col-xxl-7 col-xl-8 col-md-9">
            <Swiper
              className="rv-12-testimonial__slider"
              loop={true}
              autoplay={true}
              slidesPerView={1}
              pagination={{
                el: "#rv-3-projects-slider-pagination",
                clickable: true,
              }}
              navigation={{
                nextEl: "#rv-12-testimonial-slider-nav .next",
                prevEl: "#rv-12-testimonial-slider-nav .prev",
              }}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Navigation, Thumbs]}
            >
              {testimonialData2.map((item, index) => (
                <SwiperSlide className="rv-12-testimony" key={index}>
                  <div className="rv-3-product__rating rv-3-testimony__rating">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                  </div>

                  <p className="rv-3-testimony__txt">{item.desc}</p>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              className="rv-12-testimony__img-slider"
              spaceBetween={10}
              slidesPerView={"auto"}
              onSwiper={(swiper) => setThumbsSwiper(swiper)}
            >
              {testimonialData2.map((item, index) => (
                <SwiperSlide className="rv-3-testimony-img" key={index}>
                  <img src={item.thumbImg} alt="reviewer image" />
                </SwiperSlide>
              ))}
            </Swiper>

            <div
              className="rv-1-slider-nav rv-12-slider-nav rv-3-slider-nav-2 mt-0"
              id="rv-12-testimonial-slider-nav"
            >
              <button className="prev">
                <i className="fa-regular fa-arrow-left"></i>
              </button>
              <button className="next">
                <i className="fa-regular fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </DivAnimateYAxis>
    </section>
  );
};

export default TestimonialSection2;
