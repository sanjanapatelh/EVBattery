import AccordionSection from "../accordion/AccordionSection";
import ImgAnimateLeftToRight from "../utils/ImgAnimateLeftToRight";
import ServiceSearchbar from "./ServiceSearchbar";
import ServiceCategorySection from "./ServiceCategorySection";
import ServiceDetailsQuote from "./ServiceDetailsQuote";
import ServiceDetailCard from "./ServiceDetailCard";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
type Props = {
  img: string;
  title: string;
};
const ServiceDetails = ({ img, title }: Props) => {
  return (
    <section className="rv-service-details rv-section-spacing">
      <div className="container">
        <div className="row rv-service-details__row g-30 justify-content-center">
          <div className="col-lg-8">
            <div className="rv-service-details__left">
              <div className="rv-service-details__img">
                <ImgAnimateLeftToRight src={img} alt="Service Details Cover" />
              </div>
              <h3 className="rv-service-details__title">{title}</h3>
              <DivAnimateYAxis>
                <p className="rv-service-details__descr">
                  It appears that your query is still quite broad. If you're
                  referring to information about an agency, I'd be happy to help
                  if you provide more details or clarify the type of agency
                  you're interested in. For example, are you looking for
                  information about a creative agency, marketing agency, design
                  agency, or another type of agency?
                </p>
                <p className="rv-service-details__descr">
                  It seems like your query is incomplete. If you provide more
                  details or clarify, I'd be happy to help you with information
                  or suggestions related to branding design. Whether you're
                  looking for information on the importance of branding design,
                  tips for effective branding, or specific aspects of branding
                  design, feel free to provide more context.
                </p>
              </DivAnimateYAxis>

              <ServiceDetailsQuote />
              <ServiceDetailCard />

              <AccordionSection />
            </div>
          </div>

          <DivAnimateYAxis className="col-lg-4 col-md-6 col-9 col-xxs-12">
            <ServiceSearchbar />

            <ServiceCategorySection />
          </DivAnimateYAxis>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
