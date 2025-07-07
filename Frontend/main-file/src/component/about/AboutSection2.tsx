import DivAnimateXAxis from "../utils/DivAnimateXAxis";
type Props = {
  btnStyle?: string;
};
const AboutSection2 = ({ btnStyle }: Props) => {
  return (
    <section className="rv-1-about rv-section-spacing">
      <div className="container position-relative">
        <div className="row rv-1-about-row g-0 justify-content-between align-items-end">
          <DivAnimateXAxis className="col-xl-5 col-lg-6" position={-80}>
            <div className="rv-1-about__img reveal">
              <img src="assets/img/about-img-1.jpg" alt="Image" />
            </div>
          </DivAnimateXAxis>

          <DivAnimateXAxis
            className="col-xxl-6 col-xl-7 col-lg-6"
            position={80}
          >
            <div className="rv-1-about__txt">
              <div className="rv-1-section__heading">
                <div>
                  <h6 className="rv-1-section__sub-title rv-text-anime">
                    Business Conference
                  </h6>
                </div>
                <div>
                  <h2 className="rv-1-section__title rv-text-anime">
                    Problem-Solving Business Conference.
                  </h2>
                </div>
              </div>

              <ul className="rv-1-about__pills">
                <li className="rv-1-about__pill">Future Business</li>
                <li className="rv-1-about__pill">Collaborate</li>
                <li className="rv-1-about__pill">Building Bridges</li>
                <li className="rv-1-about__pill">Opportunities</li>
              </ul>

              <p className="rv-1-about__descr">
                It seems like you would like information a business conference
                but haven't specified the topic theme of the conference. provide
                relevant information or assistance, please provide more details
                about the specific.
              </p>

              <a
                href="#"
                className={`rv-1-def-btn ${btnStyle ? btnStyle : ""}`}
              >
                <span className="txt">Get Tickets</span>
                <span className="icon">
                  <img src="assets/img/rv-1-icon-1.png" alt="icon" />
                </span>
              </a>

              <div className="rv-1-about__right-img">
                <img src="assets/img/about-img-2.jpg" alt="image" />
              </div>
            </div>
          </DivAnimateXAxis>
        </div>

        <div className="rv-1-about__vectors">
          <img
            src="assets/img/rv-1-vector-6.png"
            alt="vector"
            className="rv-1-about__vector rv-1-about__vector-1"
          />
          <img
            src="assets/img/rv-1-vector-7.png"
            alt="vector"
            className="rv-1-about__vector rv-1-about__vector-2"
          />
          <img
            src="assets/img/rv-1-vector-8.png"
            alt="vector"
            className="rv-1-about__vector rv-1-about__vector-3"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection2;
