import BreadcrumbSection from "../component/breadcrumb/BreadcrumbSection";
import GallerySection2 from "../component/gallery/GallerySection2";
import InnerLayout from "../component/layout/InnerLayout";
import ShopMain from "../component/main/ShopMain";

const ShopPage = () => {
  return (
    <main>
      <InnerLayout>
        <BreadcrumbSection title="Shop" />
        <ShopMain />
        <GallerySection2 />
      </InnerLayout>
    </main>
  );
};

export default ShopPage;
