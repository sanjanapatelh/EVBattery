import AboutSection from "../component/about/AboutSection";
import BannerSection from "../component/banner/BannerSection";
import BlogSection from "../component/blog/BlogSection";
import ContactSection from "../component/contact/ContactSection";
import FooterSection from "../component/footer/FooterSection";
import HeaderSection from "../component/header/HeaderSection";
import SearchFormModal from "../component/modal/SearchFormModal";
import VideoModal from "../component/modal/VideoModal";
import PortfolioSection from "../component/portfolio/PortfolioSection";
import PricingSection from "../component/pricing/PricingSection";
import ServiceSection from "../component/service/ServiceSection";
import TeamSection from "../component/team/TeamSection";
import TestimonialSection from "../component/testimonial/TestimonialSection";
import VideoSection from "../component/video/VideoSection";

const Home1 = () => {
  return (
    <main>
      <HeaderSection />
      <BannerSection />
      <ServiceSection />
      <AboutSection />
      <VideoSection />
      <TestimonialSection />
      <PricingSection />
      <PortfolioSection />
      <TeamSection />
      <ContactSection />
      <BlogSection />
      <FooterSection
        style="rv-20-footer"
        logo="assets/img/rv-20-logo-light.png"
        footerContactStyle="rv-20-footer__contact-card"
        footerFormStyle="rv-20-footer-nwsltr__form"
      />
      {/* Modals */}
      <SearchFormModal />
      <VideoModal videoUrl="https://www.youtube.com/embed/b-5E5suKIAY?si=KAbRHsNOuo4JeZiV" />
    </main>
  );
};

export default Home1;
