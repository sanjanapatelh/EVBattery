import { bannerData } from "../../data/Data";
import { useEffect, useState } from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SplitType from "split-type";
import gsap from "gsap";

const BannerSection3 = () => {
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
    <section className="rv-9-banner">
      <Swiper
        className="rv-9-banner__slider"
        autoplay={true}
        slidesPerView={1}
        loop={true}
        effect="fade"
        pagination={{
          el: "#rv-9-banner-slider-dots",
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Pagination]}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {bannerData.map((item, index) => (
          <SwiperSlide className={item.style} key={index}>
            <div className="container">
              <div className="row">
                <div className="col-xxl-7 col-lg-8 col-md-10 col-11 col-xxs-12">
                  <div className="rv-9-banner__txt">
                    <h6 className="rv-9-section__sub-title rv-9-banner__sub-title rv-text-anime">
                      {item.subTitle}
                    </h6>

                    <h1 className="rv-9-banner__title rv-text-anime">
                      {item.title}
                    </h1>

                    <a href="#" className="rv-3-def-btn rv-9-banner-btn">
                      Get in Touch
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div
          className="rv-2-swiper-dots rv-9-slider-dots"
          id="rv-9-banner-slider-dots"
        ></div>
      </Swiper>
    </section>
  );
};

export default BannerSection3;
