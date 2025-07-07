import BreadcrumbSection from "../component/breadcrumb/BreadcrumbSection";
import GallerySection2 from "../component/gallery/GallerySection2";
import InnerLayout from "../component/layout/InnerLayout";
import ShopSidebarMain from "../component/main/ShopSidebarMain";

const ShopSidebarPage = () => {
  return (
    <main>
      <InnerLayout>
        <BreadcrumbSection title="Shop Sidebar" />
        <ShopSidebarMain />
        <GallerySection2 />
      </InnerLayout>
    </main>
  );
};

export default ShopSidebarPage;
