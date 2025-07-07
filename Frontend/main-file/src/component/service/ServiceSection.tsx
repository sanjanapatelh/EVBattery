"use client";
import { serviceData } from "../../data/Data";
import { useRef, useState } from "react";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import { Link } from "react-router-dom";

const ServiceSection = () => {
  const serviceRef = useRef<HTMLDivElement>(null);
  const [activeItemId, setActiveItemId] = useState<number>(1); // Default active item ID
  const handleMouseEnter = (id: number) => {
    setActiveItemId(id);
  };

  const handleMouseLeave = () => {
    // Do nothing or add additional logic if needed when mouse leaves
  };
  return (
    <section className="rv-20-service_section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="rv-20-service_section_heading">
              <div>
                <p className="rv-20-service_sub_title rv-text-anime d-flex">
                  <span></span> Gardening Services
                </p>
              </div>
              <div>
                <h2 className="rv-20-service_section_title rv-text-anime">
                  Loving your Garden & Landscape.
                </h2>
              </div>
            </div>
          </div>
        </div>
        <DivAnimateYAxis className="row justify-content-center">
          {serviceData.slice(9, 12).map((item, index) => (
            <div className="col-lg-4 col-sm-10 col-md-6" key={index}>
              <div
                className={`rv-20-single_service ${
                  activeItemId === index ? "active" : ""
                }`}
              >
                <div className="rv-20-single_service_iamge">
                  <img src={item.imgMain} alt="image" />
                </div>
                <div
                  className="rv-20-single_service_content_main"
                  ref={serviceRef}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="visible-part">
                    <div className="rv-20-single_service_content_top">
                      <div className="rv-20-single_service_icon">
                        <img src={item.imgIcon} alt="image" />
                      </div>
                    </div>

                    <div className="rv-20-single_service_content_title">
                      <Link to={`/services/${item.slug}`}>
                        <h4>{item.title}</h4>
                      </Link>
                    </div>
                  </div>
                  <div className="hidden-part">
                    <ul className="rv-20-single_service_list">
                      <li>
                        <i className="fal fa-arrow-to-right"></i>Landscape
                        Design
                      </li>
                      <li>
                        <i className="fas fa-check"></i>Irrigation Management
                      </li>
                      <li>
                        <i className="fas fa-check"></i>Plant Care
                      </li>
                      <li>
                        <i className="fas fa-check"></i>Outdoor Lighting
                      </li>
                    </ul>
                    <Link
                      to={`/services/${item.slug}`}
                      className="rv-20-service_btn"
                    >
                      <span className="rv-20-service_btn_txt">Read More</span>
                      <i className="fal fa-arrow-right"></i>
                    </Link>
                  </div>
                  <h4 className="rv-20-service_drp_txt">{item.dropText}</h4>
                </div>
              </div>
            </div>
          ))}
        </DivAnimateYAxis>
      </div>

      <span className="service-sh-1">
        <img src="assets/img/services/home-6-service-4.png" alt="image" />
      </span>
      <span className="service-sh-2">
        <img src="assets/img/services/home-6-service-5.png" alt="image" />
      </span>
    </section>
  );
};

export default ServiceSection;
