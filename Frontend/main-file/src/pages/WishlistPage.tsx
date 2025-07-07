import BreadcrumbSection from "../component/breadcrumb/BreadcrumbSection";
import InnerLayout from "../component/layout/InnerLayout";
import WishlistSection from "../component/wishlist/WishlistSection";

const WishlistPage = () => {
  return (
    <main>
      <InnerLayout>
        <BreadcrumbSection title="Wishlist" />
        <WishlistSection />
      </InnerLayout>
    </main>
  );
};

export default WishlistPage;
