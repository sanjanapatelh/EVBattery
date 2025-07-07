import BreadcrumbSection from "../component/breadcrumb/BreadcrumbSection";
import CartSection from "../component/cart/CartSection";
import InnerLayout from "../component/layout/InnerLayout";

const CartPage = () => {
  return (
    <main>
      <InnerLayout>
        <BreadcrumbSection title="Cart" />
        <CartSection />
      </InnerLayout>
    </main>
  );
};

export default CartPage;
