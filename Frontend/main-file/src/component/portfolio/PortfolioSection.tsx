import { portfolioData } from "../../data/Data";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const PortfolioSection = () => {
  return (
    <section className="rv-20-portfolio_section">
      <DivAnimateYAxis className="row rv-20-ins_gp">
        <Swiper
          className="rv-20-portfolio_slide"
          spaceBetween={30}
          autoplay={{
            disableOnInteraction: true,
            delay: 2000,
          }}
          loop={true}
          slidesPerView={4}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
            },
            980: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          modules={[Autoplay]}
        >
          {portfolioData.map((item) => (
            <SwiperSlide className="rv-20-single_portfolio" key={item.id}>
              <div className="rv-20-single_portfolio_image">
                <img src={item.mainImg} alt="image" />

                <div className="rv-20-portfolio_content">
                  <a className="rv-20-portfolio_content_icon" href="#">
                    <i className="fal fa-plus"></i>
                  </a>
                  <div className="rv-20-portfolio_content_txt">
                    <p>{item.desc}</p>
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </DivAnimateYAxis>
    </section>
  );
};

export default PortfolioSection;
