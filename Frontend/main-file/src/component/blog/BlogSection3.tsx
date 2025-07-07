import { blogData3 } from "../../data/Data";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DivAnimateXAxis from "../utils/DivAnimateXAxis";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import { Link } from "react-router-dom";

const BlogSection3 = () => {
  return (
    <section className="rv-6-blogs rv-9-blogs rv-section-spacing">
      <div className="container">
        <div className="rv-6-section__heading">
          <div className="rv-6-section-heading__left">
            <div>
              <h6 className="rv-9-section__sub-title">Latest News</h6>
            </div>
            <div>
              <h2 className="rv-9-section__title">Our Latest News.</h2>
            </div>
          </div>

          <DivAnimateXAxis className="rv-9-section-heading__right">
            <div
              className="rv-1-slider-nav rv-9-slider-nav"
              id="rv-6-blogs__slider-nav"
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
        <DivAnimateYAxis>
          <Swiper
            className="rv-6-blogs__slider"
            autoplay={true}
            spaceBetween={30}
            slidesPerView={2}
            navigation={{
              prevEl: "#rv-6-blogs__slider-nav .prev",
              nextEl: "#rv-6-blogs__slider-nav .next",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                centeredSlides: true,
              },
              992: {
                slidesPerView: 1.6,
                centeredSlides: true,
              },
              1200: {
                spaceBetween: 30,
                slidesPerView: 2,
              },
            }}
            modules={[Autoplay, Navigation]}
          >
            {blogData3.slice(-3).map((item) => (
              <SwiperSlide className="rv-6-blog rv-9-blog" key={item.id}>
                <div className="rv-6-blog__img">
                  <img src={item.mainImg} alt="Blog Image" />
                </div>

                <div className="rv-6-blog__txt">
                  <ul className="rv-1-blog__infos">
                    <li>
                      <img src="assets/calender-icon.svg" alt="calender icon" />

                      {item.date}
                    </li>
                    <li>
                      <img src="assets/img/rv-1-icon-5.png" alt="icon" />{" "}
                      {item.comments}
                      Comments
                    </li>
                  </ul>
                  <h4 className="rv-1-blog__title">
                    <Link to={`/blog/${item.slug}`}>{item.title}</Link>
                  </h4>
                  <p className="rv-6-blog__descr">
                    Fusce tincidunt nisi condimentum amet laoreet leo eleifend.
                  </p>
                  <Link
                    to={`/blog/${item.slug}`}
                    className="rv-1-schedule-conf__btn rv-1-blog__btn"
                  >
                    Read More <i className="fa-light fa-arrow-right"></i>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </DivAnimateYAxis>
      </div>
    </section>
  );
};

export default BlogSection3;
