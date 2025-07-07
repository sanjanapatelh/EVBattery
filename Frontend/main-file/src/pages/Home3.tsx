import BannerSection3 from "../component/banner/BannerSection3";
import BlogSection3 from "../component/blog/BlogSection3";
import FooterSection from "../component/footer/FooterSection";
import GallerySection2 from "../component/gallery/GallerySection2";
import GuideSection from "../component/guide/GuideSection";
import HeaderSection3 from "../component/header/HeaderSection3";
import ProjectSection2 from "../component/project/ProjectSection2";
import ServiceSection2 from "../component/service/ServiceSection2";
import TeamSection2 from "../component/team/TeamSection2";

const Home3 = () => {
  return (
    <main>
      <HeaderSection3 />
      <BannerSection3 />
      <ServiceSection2 />
      <ProjectSection2 />
      <GuideSection />
      <TeamSection2 />
      <BlogSection3 />
      <GallerySection2 />
      <FooterSection
        logo="assets/img/rv-9-logo-light.png"
        footerFormStyle="rv-9-footer-nwsltr__form"
      />
    </main>
  );
};

export default Home3;
