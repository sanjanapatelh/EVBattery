import ProductTable from "../product/ProductTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart, updateQuantity } from "../../redux/features/cartSlice";
import { toast } from "react-toastify";
import {
  moveAllToCart,
  removeFromWishlist,
} from "../../redux/features/wishlistSlice";
import { toggleWishlistModalClose } from "../../redux/features/wishlistModalSlice";
import { Link } from "react-router-dom";

const WishlistModal = () => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.wishlist);
  const cartItems = useAppSelector((state) => state.cart.cart);
  const show = useAppSelector(
    (state) => state.wishlistModal.isWishlistModalOpen
  );

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromWishlist(id));
    toast.warning("Product Removed From Wishlist!");
  };

  const closeModal = () => {
    dispatch(toggleWishlistModalClose());
  };

  const handleAddAllToCart = () => {
    wishlistItems.forEach((wishlistItem) => {
      const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === wishlistItem.id
      );

      if (existingCartItem) {
        // Item already exists in the cart, update quantity
        dispatch(
          updateQuantity({
            id: wishlistItem.id,
            quantity: existingCartItem.quantity + 1,
          })
        );
      } else {
        // Item doesn't exist in the cart, add it
        dispatch(addToCart(wishlistItem));
      }
    });

    // Clear wishlist after moving items to the cart
    dispatch(moveAllToCart());

    toast.success("All Wishlist Items Added to Cart!");
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
          <h3>Wishlist Items</h3>
          <button onClick={closeModal}>
            <i className="fa-regular fa-x fa-fw"></i>
          </button>
        </div>
        <div className="cart-modal-body-container">
          <ProductTable
            items={wishlistItems}
            handleRemoveItem={handleRemoveItem}
          />
          <div className="cart-left-actions d-flex justify-content-between">
            <Link className="rv-1-banner-btn" to="/wishlist">
              View Wishlist
            </Link>
            <a
              className="rv-1-banner-btn"
              role="button"
              onClick={handleAddAllToCart}
            >
              Add All to Cart
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistModal;
