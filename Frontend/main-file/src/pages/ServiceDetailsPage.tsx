import { useParams } from "react-router-dom";
import BreadcrumbSection from "../component/breadcrumb/BreadcrumbSection";
import ErrorSection from "../component/error/ErrorSection";
import InnerLayout from "../component/layout/InnerLayout";
import { serviceData } from "../data/Data";
import ServiceDetails from "../component/service/ServiceDetails";

const ServiceDetailsPage = () => {
  const { serviceSlug } = useParams();
  const serviceInfo = serviceData.find((item) => item.slug === serviceSlug);

  return (
    <main className="rv-14-body">
      <InnerLayout>
        {serviceInfo ? (
          <>
            <BreadcrumbSection title="Service Details" />
            <ServiceDetails img={serviceInfo.img} title={serviceInfo.title} />
          </>
        ) : (
          <ErrorSection />
        )}
      </InnerLayout>
    </main>
  );
};

export default ServiceDetailsPage;
