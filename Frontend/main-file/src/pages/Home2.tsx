import BannerSection2 from "../component/banner/BannerSection2";
import BlogSection2 from "../component/blog/BlogSection2";
import CategorySection from "../component/category/CategorySection";
import FeatureSection from "../component/feature/FeatureSection";
import FooterSection2 from "../component/footer/FooterSection2";
import GallerySection from "../component/gallery/GallerySection";
import HeaderSection2 from "../component/header/HeaderSection2";
import InfoSection from "../component/info/InfoSection";
import CartModal from "../component/modal/CartModal";
import SearchFormModal from "../component/modal/SearchFormModal";
import WishlistModal from "../component/modal/WishlistModal";
import PartnerSection from "../component/partner/PartnerSection";
import ProductSection from "../component/product/ProductSection";
import TopProductSection from "../component/product/TopProductSection";
import ProjectSection from "../component/project/ProjectSection";
import TestimonialSection2 from "../component/testimonial/TestimonialSection2";

const Home2 = () => {
  return (
    <main>
      <HeaderSection2 />
      <BannerSection2 />
      <FeatureSection />
      <CategorySection />
      <ProductSection />
      <InfoSection />
      <TopProductSection />
      <ProjectSection />
      <TestimonialSection2 />
      <BlogSection2 />
      <PartnerSection />
      <GallerySection />
      <FooterSection2 />
      {/* Modal */}
      <SearchFormModal />
      <CartModal />
      <WishlistModal />
    </main>
  );
};

export default Home2;
