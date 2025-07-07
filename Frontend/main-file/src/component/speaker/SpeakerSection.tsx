import { speakersData } from "../../data/Data";
import { useEffect, useRef } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const SpeakerSection = () => {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>(
    Array(speakersData.length).fill(null)
  );

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.addEventListener("mouseenter", () => {
          video.play();
        });

        video.addEventListener("mouseleave", () => {
          video.pause();
          video.currentTime = 0;
        });

        return () => {
          video.removeEventListener("mouseenter", () => {
            video.play();
          });

          video.removeEventListener("mouseleave", () => {
            video.pause();
            video.currentTime = 0;
          });
        };
      }
    });
  }, [videoRefs]);

  return (
    <div className="rv-1-container" data-aos="fade-up">
      <section className="rv-1-speakers rv-section-spacing">
        <div className="container">
          <div className="rv-1-section-heading rv-1-section-heading-2">
            <div className="rv-1-section-heading-left">
              <div>
                <h6 className="rv-1-section__sub-title rv-text-anime">
                  Event Speakers
                </h6>
              </div>
              <div>
                <h2 className="rv-1-section__title rv-text-anime">
                  Featured Conference Speakers.
                </h2>
              </div>
            </div>

            <DivAnimateYAxis className="rv-1-section-heading__right">
              <a href="#" className="rv-1-def-btn">
                <span className="txt">View All Members</span>
              </a>
              <div className="rv-1-slider-nav" id="rv-1-speakers__slider-nav">
                <button className="prev">
                  <i className="fa-regular fa-arrow-left"></i>
                </button>
                <button className="next">
                  <i className="fa-regular fa-arrow-right"></i>
                </button>
              </div>
            </DivAnimateYAxis>
          </div>

          <DivAnimateYAxis
            className="rv-1-speakers-slider-container"
            position={80}
          >
            <Swiper
              className="rv-1-speakers__slider"
              slidesPerView={4}
              spaceBetween={30}
              autoplay={true}
              navigation={{
                nextEl: "#rv-1-speakers__slider-nav .next",
                prevEl: "#rv-1-speakers__slider-nav .prev",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                480: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                992: {
                  spaceBetween: 20,
                  slidesPerView: 4,
                },
                1200: {
                  spaceBetween: 30,
                },
              }}
              modules={[Autoplay, Navigation]}
            >
              {speakersData.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <div className="rv-1-speaker">
                    <video
                      src={item.videoSrc}
                      loop
                      muted={true}
                      ref={(el) => (videoRefs.current[index] = el)}
                    ></video>
                    <div className="rv-1-speaker__txt">
                      <h6 className="rv-1-speaker__role">{item.role}</h6>
                      <h4 className="rv-1-speaker__name">{item.name}</h4>
                    </div>
                    <div className="rv-1-speaker__socials">
                      <a href="#">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                      <a href="#">
                        <i className="fa-brands fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i className="fa-brands fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </DivAnimateYAxis>
        </div>
      </section>
    </div>
  );
};

export default SpeakerSection;
