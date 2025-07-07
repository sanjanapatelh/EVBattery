import NumberCounter from "../utils/NumberCounter";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const AboutSection = () => {
  return (
    <section className="rv-20-about_section">
      <div className="container">
        <DivAnimateYAxis className="row">
          <div className="col-md-12  col-lg-6 col-xl-5">
            <div className="rv-20-about_image">
              <img src="assets/img/about/home-6-about-1.png" alt="image" />

              <img src="assets/img/about/home-6-about-2.png" alt="image" />
              <div className="rv-20-about_experience_txt">
                <NumberCounter
                  number={23}
                  initialNumber={10}
                  durationToComplete={2}
                  icon="+"
                />
                <p>Year of Experience</p>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-6 col-xl-7">
            <div className="rv-20-about_section_content">
              <div className="rv-20-about_section_heading">
                <div>
                  <p className="rv-20-about_sub_title rv-text-anime d-flex">
                    <span></span> About Gardening
                  </p>
                </div>
                <div>
                  <h2 className="rv-20-about_section_title rv-text-anime">
                    Flawless Garden Nature's Handiwork.
                  </h2>
                </div>
              </div>
              <div className="rv-20-about_content_top_actions">
                <div className="rv-20-about_content_single_top_actions">
                  <div className="rv-20-about_content_single_top_actions_left">
                    <h3>Our Goals</h3>
                    <p>Denim aliquot poseurs locus..!</p>
                  </div>
                  <div className="rv-20-about_content_single_top_actions_icon">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                </div>
                <div className="rv-20-about_content_single_top_actions">
                  <div className="rv-20-about_content_single_top_actions_left">
                    <h3>Our Goals</h3>
                    <p>Denim aliquot poseurs locus..!</p>
                  </div>
                  <div className="rv-20-about_content_single_top_actions_icon">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                </div>
              </div>
              <div className="rv-20-about_list">
                <ul>
                  <li>
                    <h4>
                      <i className="far fa-chevron-double-right"></i>Gardens
                    </h4>
                    <p>
                      Suspends potent Cu abitur vestibulum poseurs sagittal
                      trips.
                    </p>
                  </li>

                  <li>
                    <h4>
                      <i className="far fa-chevron-double-right"></i>Gardens
                    </h4>
                    <p>
                      Suspends potent Cu abitur vestibulum poseurs sagittal
                      trips.
                    </p>
                  </li>
                  <li>
                    <h4>
                      <i className="far fa-chevron-double-right"></i>Gardens
                    </h4>
                    <p>
                      Suspends potent Cu abitur vestibulum poseurs sagittal
                      trips.
                    </p>
                  </li>
                  <li>
                    <h4>
                      <i className="far fa-chevron-double-right"></i>Gardens
                    </h4>
                    <p>
                      Suspends potent Cu abitur vestibulum poseurs sagittal
                      trips.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </DivAnimateYAxis>
      </div>
      <span className="about-sh-6">
        <img src="assets/img/about/home-6-about-3.png" alt="image" />
      </span>
    </section>
  );
};

export default AboutSection;
