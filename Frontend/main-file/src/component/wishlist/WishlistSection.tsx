import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  moveAllToCart,
  removeFromWishlist,
} from "../../redux/features/wishlistSlice";
import { toast } from "react-toastify";
import ProductTable from "../product/ProductTable";
import { addToCart, updateQuantity } from "../../redux/features/cartSlice";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const WishlistSection = () => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.wishlist);
  const cartItems = useAppSelector((state) => state.cart.cart);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromWishlist(id));
    toast.warning("Product Removed From Wishlist!");
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
    <div className="container">
      <DivAnimateYAxis className="cart-section wishlist-section">
        <div className="cart-left wishlist-inner-section">
          <div className="cart-area">
            <div className="cart__body">
              <ProductTable
                handleRemoveItem={handleRemoveItem}
                items={wishlistItems}
              />

              <div className="cart-left-actions d-flex justify-content-end">
                <button
                  type="submit"
                  className="rv-1-banner-btn update-cart-btn"
                  onClick={handleAddAllToCart}
                >
                  Add all product to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </DivAnimateYAxis>
    </div>
  );
};

export default WishlistSection;
