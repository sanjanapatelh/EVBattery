import ProductTable from "../product/ProductTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeFromCart, updateQuantity } from "../../redux/features/cartSlice";
import { toast } from "react-toastify";
import { toggleCartModalClose } from "../../redux/features/cartModalSlice";
import { Link } from "react-router-dom";

const CartModal = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cart);
  const show = useAppSelector((state) => state.cartModal.isCartModalOpen);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
    toast.warning("Product Removed From Cart!");
  };

  const closeModal = () => {
    dispatch(toggleCartModalClose());
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <>
      <div
        className={`rv-modal-overlay ${show ? "active" : ""}`}
        role="button"
        onClick={closeModal}
      ></div>
      <div className={`rv-modal-container ${show ? "active" : ""}`}>
        <div className="rv-modal-header">
          <h3>Cart Items</h3>
          <button onClick={closeModal}>
            <i className="fa-regular fa-x fa-fw"></i>
          </button>
        </div>
        <div className="cart-modal-body-container">
          <ProductTable
            items={cartItems}
            handleRemoveItem={handleRemoveItem}
            handleUpdateQuantity={handleUpdateQuantity}
          />
          <div className="cart-left-actions d-flex justify-content-between">
            <Link className="rv-1-banner-btn" to="/cart">
              View Full cart
            </Link>
            <Link className="rv-1-banner-btn" to="/checkout">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModal;
