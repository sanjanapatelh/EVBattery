import BreadcrumbSection from "../component/breadcrumb/BreadcrumbSection";
import CtaSection from "../component/cta/CtaSection";
import InnerLayout from "../component/layout/InnerLayout";
import ServiceSection3 from "../component/service/ServiceSection3";

const Services = () => {
  return (
    <main className="rv-14-body">
      <InnerLayout>
        <BreadcrumbSection title="Services" />
        <ServiceSection3 />
        <CtaSection inner />
      </InnerLayout>
    </main>
  );
};

export default Services;
