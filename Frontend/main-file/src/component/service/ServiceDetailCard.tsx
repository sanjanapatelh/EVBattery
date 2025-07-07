import DivAnimateYAxis from "../utils/DivAnimateYAxis";

interface ServiceDetail {
  tag: string;
  iconSrc: string;
  description: string;
}

const servicesData: ServiceDetail[] = [
  {
    tag: "Creative Design",
    iconSrc: "/assets/img/rv-service-details-icon-1.png",
    description:
      "Please Provide More Specific Details Creative Design Questions Related To.",
  },
  {
    tag: "Marketing Plan",
    iconSrc: "/assets/img/rv-service-details-icon-2.png",
    description:
      "Create a Timeline Implementing Your For Marketing Strategies and Tactics.",
  },
];

const ServiceDetailCard = () => {
  return (
    <div className="rv-service-details__cards">
      <div className="row g-30">
        {servicesData.map((service, index) => (
          <DivAnimateYAxis
            key={index}
            className="col-sm-6"
            duration={1.2 + 0.2 * index}
          >
            <div className="rv-service-details-card">
              <span className="rv-service-details-card__tag">
                {service.tag}
              </span>
              <div className="rv-service-details-card__icon">
                <img src={service.iconSrc} alt="Icon" />
              </div>
              <p className="rv-service-details-card__descr">
                {service.description}
                <span className="highlight">{service.tag}</span>
              </p>
              <a href="#" className="rv-3-def-btn rv-service-details-card__btn">
                Read More
              </a>
            </div>
          </DivAnimateYAxis>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetailCard;
