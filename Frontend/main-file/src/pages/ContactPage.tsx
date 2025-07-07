import BreadcrumbSection from "../component/breadcrumb/BreadcrumbSection";
import ContactSection2 from "../component/contact/ContactSection2";
import InnerLayout from "../component/layout/InnerLayout";

const ContactPage = () => {
  return (
    <main>
      <InnerLayout>
        <BreadcrumbSection title="Contact" />
        <ContactSection2 innerPage />
      </InnerLayout>
    </main>
  );
};

export default ContactPage;
