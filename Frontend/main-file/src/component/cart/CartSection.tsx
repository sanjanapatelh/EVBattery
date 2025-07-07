import { removeFromCart, updateQuantity } from "../../redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
import ProductTable from "../product/ProductTable";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import CouponForm from "../form/CouponForm";
import { Link } from "react-router-dom";

const CartSection = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cart);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
    toast.warning("Product Removed From Cart!");
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <DivAnimateYAxis className="cart-section">
        <div className="row w-100 m-0 justify-content-center g-5">
          <div className="col-xl-9">
            <div className="cart-left inner-cart">
              <div className="cart-area">
                <div className="cart__body">
                  <ProductTable
                    items={cartItems}
                    handleRemoveItem={handleRemoveItem}
                    handleUpdateQuantity={handleUpdateQuantity}
                  />

                  <div className="cart-left-actions d-flex justify-content-end">
                    {cartItems.length === 0 ? (
                      <Link
                        className="rv-1-banner-btn update-cart-btn"
                        to="/shop"
                      >
                        Go to Shop
                      </Link>
                    ) : (
                      <CouponForm />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-sm-8">
            <div className="cart-checkout-area">
              <h4 className="cart-checkout-area__title">Billing Summary</h4>

              <ul className="checkout-summary">
                <li>
                  <span className="checkout-summary__key">Subtotal</span>
                  <span className="checkout-summary__value">
                    <span>$</span>
                    {totalPrice}
                  </span>
                </li>

                <li>
                  <span className="checkout-summary__key">Shipping</span>
                  <span className="checkout-summary__value">
                    <span>$</span>10
                  </span>
                </li>

                <li>
                  <span className="checkout-summary__key">Coupon discount</span>
                  <span className="checkout-summary__value">
                    -<span>$</span>15
                  </span>
                </li>

                <li className="cart-checkout-total">
                  <span className="checkout-summary__key">Total</span>
                  <span className="checkout-summary__value">
                    <span>$</span>
                    {totalPrice - 5}
                  </span>
                </li>
              </ul>

              <Link
                to="/checkout"
                className="rv-1-banner-btn cart-checkout-btn"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      </DivAnimateYAxis>
    </div>
  );
};

export default CartSection;
