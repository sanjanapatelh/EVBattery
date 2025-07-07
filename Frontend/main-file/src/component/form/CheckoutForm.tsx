import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";
type CheckoutInputs = {
  firstName: string;
  lastName: string;
  companyName: string;
  countrySelect: string;
  streetAddress: string;
  houseAddress: string;
  city: string;
  stateSelect: string;
  zipCode: number;
  phone: number;
  email: string;
  createAccount: boolean;
  additionalInfo: string;
  cardNumber: string;
};
const CheckoutForm = () => {
  const { handleSubmit, register, reset } = useForm<CheckoutInputs>();
  const onSubmit: SubmitHandler<CheckoutInputs> = (data) => {
    // Perform any additional actions before or after submitting data
    console.log(data);

    // Show a success toast
    toast.success("Product purchased successfully!");

    // Reset the form to default values
    reset();
  };

  const cartItems = useAppSelector((state) => state.cart.cart);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
      <div className="row g-4 justify-content-center">
        <div className="col-xl-9 col-lg-8">
          <div className="rv-billing-details">
            <div className="row gy-0 gx-3 gx-md-4">
              <h3 className="rv-checkout-title">Billing Details</h3>
              <div className="col-6 col-xxs-12">
                <input
                  type="text"
                  id="checkout-first-name"
                  placeholder="First Name"
                  {...register("firstName")}
                  required
                />
              </div>
              <div className="col-6 col-xxs-12">
                <input
                  type="text"
                  id="checkout-last-name"
                  placeholder="Last Name"
                  {...register("lastName")}
                  required
                />
              </div>
              <div className="col-12">
                <input
                  type="text"
                  id="checkout-company-name"
                  placeholder="Company Name"
                  {...register("companyName")}
                  required
                />
              </div>

              <div className="col-12">
                <select
                  className="country-select"
                  id="checkout-country"
                  {...register("stateSelect")}
                  required
                  defaultValue={""}
                >
                  <option value="" disabled hidden>
                    Select Country
                  </option>
                  <option value="United States">United States (US)</option>
                  <option value="United Kingdom">United Kingdom (UK)</option>
                  <option value="France">France</option>
                  <option value="Russia">Russia</option>
                  <option value="Iran">Iran</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="Nepal">Nepal</option>
                </select>
              </div>

              <div className="col-12">
                <input
                  type="text"
                  id="checkout-house-street-number"
                  placeholder="House Number & Street Name"
                  {...register("streetAddress")}
                  required
                />
              </div>

              <div className="col-12">
                <input
                  type="text"
                  id="checkout-apartment-name"
                  placeholder="Apartment, Suite, Unit, etc. (optional)"
                  {...register("houseAddress")}
                  required
                />
              </div>

              <div className="col-12">
                <input
                  type="text"
                  id="checkout-city-name"
                  placeholder="Town / City"
                  {...register("city")}
                  required
                />
              </div>

              <div className="col-6 col-xxs-12">
                <select
                  className="state-select"
                  {...register("stateSelect")}
                  id="checkout-states"
                  required
                  defaultValue={""}
                >
                  <option value="" disabled hidden>
                    Select State
                  </option>
                  <option value="Alabama">Alabama</option>
                  <option value="Alaska">Alaska</option>
                  <option value="California">California</option>
                  <option value="Delaware">Delaware</option>
                  <option value="Florida">Florida</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Hawaii">Hawaii</option>
                  <option value="Idaho">Idaho</option>
                </select>
              </div>

              <div className="col-6 col-xxs-12">
                <input
                  type="number"
                  {...register("zipCode")}
                  id="checkout-zip-code"
                  placeholder="Zip Code"
                  required
                />
              </div>

              <div className="col-6 col-xxs-12">
                <input
                  type="number"
                  {...register("phone")}
                  id="checkout-phone-number"
                  placeholder="Phone Number"
                  required
                />
              </div>

              <div className="col-6 col-xxs-12">
                <input
                  type="email"
                  id="checkout-email-address"
                  placeholder="Email Address"
                  {...register("email")}
                  required
                />
              </div>

              <div className="col">
                <input
                  type="checkbox"
                  id="checkout-create-account"
                  {...register("createAccount")}
                />
                <label
                  className="create-acc-lebel"
                  htmlFor="checkout-create-account"
                >
                  Create an Account
                </label>
              </div>

              <div className="col-12 additional-info">
                <label
                  htmlFor="checkout-additional-info"
                  className="rv-checkout-title"
                >
                  Additional Information
                </label>
                <textarea
                  {...register("additionalInfo")}
                  id="checkout-additional-info"
                  placeholder="Notes about your order, e.g. special notes for delivery"
                  required
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4">
          <div className="rv-checkout-sidebar">
            <div className="billing-summery">
              <h4 className="rv-checkout-title">Billing Summary</h4>
              <div className="cart-checkout-area">
                <ul className="checkout-summary">
                  <li>
                    <span className="checkout-summary__key">Subtotal</span>
                    <span className="checkout-summary__value">
                      <span>$</span>
                      {subTotal}
                    </span>
                  </li>

                  <li>
                    <span className="checkout-summary__key">Shipping</span>
                    <span className="checkout-summary__value">
                      <span>$</span>
                      10
                    </span>
                  </li>

                  <li>
                    <span className="checkout-summary__key">
                      Coupon discount
                    </span>
                    <span className="checkout-summary__value">
                      -<span>$</span>
                      15
                    </span>
                  </li>

                  <li className="cart-checkout-total">
                    <span className="checkout-summary__key">Total</span>
                    <span className="checkout-summary__value">
                      <span>$</span>
                      {subTotal - 5}
                    </span>
                  </li>
                </ul>

                <Link to="/cart" className="rv-1-banner-btn cart-checkout-btn">
                  Edit Order
                </Link>
              </div>
            </div>

            <div className="payment-info">
              <h4 className="rv-checkout-title">Payment Information</h4>
              <div className="d-flex payment-area align-items-center">
                <input
                  type="number"
                  {...register("cardNumber")}
                  id="checkout-payment-option"
                  placeholder="xxxx xxxx xxxx xxxx"
                  required
                />
                <i className="fa-light fa-credit-card"></i>
              </div>
              <p className="checkout-payment-descr">
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our <a href="#">privacy policy</a>
              </p>
              <button
                type="submit"
                className="rv-1-banner-btn cart-checkout-btn checkout-form-btn"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
