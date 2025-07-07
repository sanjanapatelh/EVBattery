import { Link } from "react-router-dom";
import { serviceData } from "../../data/Data";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const ServiceSection2 = () => {
  return (
    <section className="rv-9-services pt-120 pb-60">
      <div className="container">
        <div className="rv-9-section__heading">
          <div>
            <h6 className="rv-9-section__sub-title rv-text-anime">
              Our Services
            </h6>
          </div>
          <div>
            <h2 className="rv-9-section__title rv-text-anime">
              Let's Ensure The Well-Being of Earth.
            </h2>
          </div>
        </div>

        <DivAnimateYAxis className="row justify-content-center g-30">
          {serviceData.slice(-3).map((item) => (
            <div className="col-lg-4 col-6 col-xxs-12" key={item.id}>
              <div className="rv-8-service rv-9-service">
                <div className="rv-9-service__icon">
                  <img src={item.iconImg} alt="Icon" />
                </div>

                <div className="rv-8-service__txt">
                  <h4 className="rv-3-service__title">
                    <Link to={`/services/${item.slug}`}>{item.title}</Link>
                  </h4>
                  <p className="rv-3-service__descr">{item.desc}</p>
                  <Link
                    to={`/services/${item.slug}`}
                    className="rv-1-schedule-conf__btn"
                  >
                    Read More <i className="fa-regular fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </DivAnimateYAxis>
      </div>
    </section>
  );
};

export default ServiceSection2;
