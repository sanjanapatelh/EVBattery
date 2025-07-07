import { Link } from "react-router-dom";
import { serviceData } from "../../data/Data";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
const ServiceSection3 = () => {
  return (
    <section className="rv-14-services rv-section-spacing">
      <div className="container">
        <div className="row g-0 row-cols-md-3 row-cols-2 row-cols-xxs-1 overflow-hidden">
          {serviceData.slice(0, 9).map((item) => (
            <DivAnimateYAxis
              className="col"
              key={item.id}
              duration={1.2 + 0.05 * item.id}
            >
              <div className="rv-14-service rv-inner-service">
                <div className="rv-14-service__icon">
                  {item.icon && <item.icon />}
                </div>
                <h4 className="rv-14-service__title">
                  <Link to={`/services/${item.slug}`}>{item.title}</Link>
                </h4>
                <p className="rv-3-service__descr">{item.description}</p>
                <Link
                  to={`/services/${item.slug}`}
                  className="rv-14-service__btn"
                >
                  Read More <i className="fa-regular fa-arrow-up-right"></i>
                </Link>
              </div>
            </DivAnimateYAxis>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection3;
