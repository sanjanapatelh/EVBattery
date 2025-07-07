import { useEffect, useState } from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { bannerData2 } from "../../data/Data";
import gsap from "gsap";
import SplitType from "split-type";

const BannerSection2 = () => {
  const [swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    if (swiper) {
      swiper.on("slideChange", () => {
        const currentSlide = swiper.slides[swiper.activeIndex];
        const textsToAnimate = currentSlide.querySelectorAll(".rv-text-anime");
        textsToAnimate.forEach((textToAnimate: HTMLElement) => {
          const animate = new SplitType(textToAnimate, {
            types: "words,chars",
          });
          gsap.from(animate.chars, {
            opacity: 0,
            x: 100,
            duration: 1.1,
            stagger: { amount: 0.9 },
          });
        });
      });
    }
  }, [swiper]);
  return (
    <section className="rv-12-banner">
      <div className="rv-1-socials rv-3-banner__socials">
        <h6>Follow us</h6>
        <ul>
          <li>
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </li>
        </ul>
      </div>

      <Swiper
        className="rv-12-banner__slider"
        autoplay={true}
        spaceBetween={30}
        slidesPerView={1}
        effect="fade"
        loop={true}
        pagination={{
          el: "#rv-12-banner-dots",
          clickable: true,
          renderBullet: function (index, className) {
            return (
              '<span class="' +
              className +
              '"><span class="number">0' +
              (index + 1) +
              "</span></span>"
            );
          },
        }}
        modules={[Autoplay, EffectFade, Pagination]}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {bannerData2.map((item) => (
          <SwiperSlide className={item.slideStyle} key={item.id}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-9 col-md-11">
                  <div className="rv-11-banner__txt">
                    <h6 className="rv-10-section__sub-title rv-12-banner__sub-title rv-text-anime">
                      {item.subTitle}
                    </h6>
                    <h1 className="rv-11-banner__title rv-text-anime">
                      {item.title}
                    </h1>

                    <a href="#" className="rv-3-def-btn rv-12-banner__btn">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="rv-12-banner__dots" id="rv-12-banner-dots"></div>
      </Swiper>
    </section>
  );
};

export default BannerSection2;
