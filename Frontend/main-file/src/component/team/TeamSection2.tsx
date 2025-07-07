import { teamData2 } from "../../data/Data";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const TeamSection2 = () => {
  return (
    <section className="rv-9-team rv-section-spacing">
      <div className="container">
        <div className="rv-9-section__heading">
          <div>
            <h6 className="rv-9-section__sub-title">Our Volunteer</h6>
          </div>
          <div>
            <h2 className="rv-9-section__title">Meet Our Experts</h2>
          </div>
        </div>
        <DivAnimateYAxis>
          <Swiper
            className="rv-9-team__slider"
            autoplay={true}
            slidesPerView={3}
            spaceBetween={15}
            pagination={{
              el: "#rv-9-team-slider-dots",
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              480: {
                slidesPerView: 2,
              },
              576: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              992: {
                spaceBetween: 30,
                slidesPerView: 3,
              },
            }}
            modules={[Autoplay, Pagination]}
          >
            {teamData2.map((item) => (
              <SwiperSlide className="rv-9-member" key={item.id}>
                <div className="rv-9-member__img">
                  <img src={item.mainImg} alt="Project Image" />
                </div>

                <div className="rv-9-member__txt">
                  <div className="rv-9-member-socials">
                    <div className="rv-1-speaker__socials">
                      {item.socials.map((social, index) => (
                        <a href={social.url} key={index}>
                          <i className={social.icon}></i>
                        </a>
                      ))}
                    </div>
                    <div className="rv-9-member-socials__icon">
                      <i className="fa-regular fa-circle-nodes"></i>
                    </div>
                  </div>
                  <span className="rv-3-project__sub-title">
                    {item.designation}
                  </span>
                  <h5 className="rv-3-project__title">
                    <a href="#">{item.name}</a>
                  </h5>
                </div>
              </SwiperSlide>
            ))}

            <div
              className="rv-2-swiper-dots rv-9-slider-dots"
              id="rv-9-team-slider-dots"
            ></div>
          </Swiper>
        </DivAnimateYAxis>
      </div>
    </section>
  );
};

export default TeamSection2;
