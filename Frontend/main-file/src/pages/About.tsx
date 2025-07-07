import AboutSection2 from "../component/about/AboutSection2";
import BreadcrumbSection from "../component/breadcrumb/BreadcrumbSection";
import CtaSection from "../component/cta/CtaSection";
import InnerLayout from "../component/layout/InnerLayout";
import SpeakerSection from "../component/speaker/SpeakerSection";

const About = () => {
  return (
    <main>
      <InnerLayout>
        <BreadcrumbSection title="About" currentPage="About Us" />
        <AboutSection2 btnStyle="rv-inner-about-btn" />
        <SpeakerSection />
        <CtaSection />
      </InnerLayout>
    </main>
  );
};

export default About;
