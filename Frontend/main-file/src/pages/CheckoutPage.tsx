import BreadcrumbSection from "../component/breadcrumb/BreadcrumbSection";
import CheckoutSection from "../component/checkout/CheckoutSection";
import InnerLayout from "../component/layout/InnerLayout";

const CheckoutPage = () => {
  return (
    <main>
      <InnerLayout>
        <BreadcrumbSection title="Checkout" />
        <CheckoutSection />
      </InnerLayout>
    </main>
  );
};

export default CheckoutPage;
