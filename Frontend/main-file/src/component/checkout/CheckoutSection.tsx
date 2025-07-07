import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import CheckoutForm from "../form/CheckoutForm";

const CheckoutSection = () => {
  return (
    <div className="container">
      <DivAnimateYAxis className="rv-checkout">
        <CheckoutForm />
      </DivAnimateYAxis>
    </div>
  );
};

export default CheckoutSection;
