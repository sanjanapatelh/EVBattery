import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Make sure to register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
const InfoSection = () => {
  useEffect(() => {
    // GSAP animation for rv-12-infos-vectors
    gsap.to("#rv-12-infos-vectors", {
      x: -400,
      duration: 0.1,
      ease: "Linear.easeNone",
      scrollTrigger: {
        trigger: "#rv-12-infos-vectors",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // GSAP animation for rv-12-infos-vectors-2
    gsap.to("#rv-12-infos-vectors-2", {
      x: 250,
      duration: 0.1,
      ease: "Linear.easeNone",
      scrollTrigger: {
        trigger: "#rv-12-infos-vectors-2",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);
  return (
    <section className="rv-12-infos pt-160 pb-160">
      <div className="container">
        <div className="row align-items-center rv-12-infos__row rv-9-guides__row justify-content-evenly">
          <div className="col-xl-4 col-lg-5 col-6 col-xxs-12">
            <div className="rv-8-service rv-9-guide rv-12-info">
              <div className="rv-9-service__icon">
                <img src="assets/img/rv-12-info-1.png" alt="Icon" />
              </div>

              <div className="rv-9-guide__txt">
                <h4 className="rv-3-service__title">
                  <a href="#">Plant More Trees</a>
                </h4>
                <p className="rv-3-service__descr">
                  Fusce egestas viverra libero elementum maecenas sit lorem nec
                  eros.
                </p>
              </div>
            </div>

            <div className="rv-8-service rv-9-guide rv-12-info">
              <div className="rv-9-service__icon">
                <img src="assets/img/rv-12-info-2.png" alt="Icon" />
              </div>

              <div className="rv-9-guide__txt">
                <h4 className="rv-3-service__title">
                  <a href="#">Recycling Rubbish</a>
                </h4>
                <p className="rv-3-service__descr">
                  Fusce egestas viverra libero elementum maecenas sit lorem nec
                  eros.
                </p>
              </div>
            </div>

            <div className="rv-8-service rv-9-guide rv-12-info">
              <div className="rv-9-service__icon">
                <img src="assets/img/rv-12-info-3.png" alt="Icon" />
              </div>

              <div className="rv-9-guide__txt">
                <h4 className="rv-3-service__title">
                  <a href="#">Change a Light</a>
                </h4>
                <p className="rv-3-service__descr">
                  Fusce egestas viverra libero elementum maecenas sit lorem nec
                  eros.
                </p>
              </div>
            </div>
          </div>

          <div className="col-xl-4 d-none d-xl-block">
            <div className="rv-9-guides__img text-center">
              <img src="assets/img/rv-12-info-img.png" alt="" />
            </div>
          </div>

          <div className="col-xl-4 col-lg-5 col-6 col-xxs-12">
            <div className="rv-8-service rv-9-guide rv-12-info">
              <div className="rv-9-service__icon">
                <img src="assets/img/rv-12-info-4.png" alt="Icon" />
              </div>

              <div className="rv-9-guide__txt">
                <h4 className="rv-3-service__title">
                  <a href="#">Use Green Products</a>
                </h4>
                <p className="rv-3-service__descr">
                  Fusce egestas viverra libero elementum maecenas sit lorem nec
                  eros.
                </p>
              </div>
            </div>

            <div className="rv-8-service rv-9-guide rv-12-info">
              <div className="rv-9-service__icon">
                <img src="assets/img/rv-12-info-5.png" alt="Icon" />
              </div>

              <div className="rv-9-guide__txt">
                <h4 className="rv-3-service__title">
                  <a href="#">Use Wind Turbines</a>
                </h4>
                <p className="rv-3-service__descr">
                  Fusce egestas viverra libero elementum maecenas sit lorem nec
                  eros.
                </p>
              </div>
            </div>

            <div className="rv-8-service rv-9-guide rv-12-info">
              <div className="rv-9-service__icon">
                <img src="assets/img/rv-12-info-6.png" alt="Icon" />
              </div>

              <div className="rv-9-guide__txt">
                <h4 className="rv-3-service__title">
                  <a href="#">Save Rain Water</a>
                </h4>
                <p className="rv-3-service__descr">
                  Fusce egestas viverra libero elementum maecenas sit lorem nec
                  eros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rv-12-infos__vectors" id="rv-12-infos-vectors">
        <img
          src="assets/img/rv-12-infos-vector.png"
          alt="vector"
          className="rv-12-infos-vector"
        />
        <img
          src="assets/img/rv-12-infos-vector.png"
          alt="vector"
          className="rv-12-infos-vector"
        />
      </div>
      <div
        className="rv-12-infos__vectors rv-12-infos__vectors--2"
        id="rv-12-infos-vectors-2"
      >
        <img
          src="assets/img/rv-12-infos-vector.png"
          alt="vector"
          className="rv-12-infos-vector"
        />
        <img
          src="assets/img/rv-12-infos-vector.png"
          alt="vector"
          className="rv-12-infos-vector"
        />
      </div>
    </section>
  );
};

export default InfoSection;
