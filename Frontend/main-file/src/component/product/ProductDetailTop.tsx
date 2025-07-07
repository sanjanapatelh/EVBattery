import { addToCart } from "../../redux/features/cartSlice";
import { addToWishlist } from "../../redux/features/wishlistSlice";
import { useAppDispatch } from "../../redux/hooks";
import { ShopItem } from "../../types";
import { useState } from "react";
import { toast } from "react-toastify";
type Props = {
  item: ShopItem;
};
const ProductDetailTop = ({ item }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();

  // Function to add to wishlist
  const handleAddToWishlist = () => {
    dispatch(addToWishlist(item));
    toast.success("Product Added To Wishlist!");
  };
  // Function to handle adding item to cart
  const handleAddToCart = () => {
    // Create a new item object with the updated quantity
    const newItem = { ...item, quantity: quantity };

    // Dispatch addToCart action with the new item object
    dispatch(addToCart(newItem));
    // Reset quantity to 1 after adding to cart
    setQuantity(1);
    toast.success("Product Added To Cart!");
  };

  // Function to handle increasing quantity
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Function to handle decreasing quantity
  const handleDecreaseQuantity = () => {
    // Ensure quantity doesn't go below 1
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="rv-product-details__top-txt">
      <h2 className="rv-product-details__title">{item.name}</h2>

      <div className="rv-product-details__rating">
        <div className="rating">
          <i className="fa-solid fa-sharp fa-star"></i>
          <i className="fa-solid fa-sharp fa-star"></i>
          <i className="fa-solid fa-sharp fa-star"></i>
          <i className="fa-solid fa-sharp fa-star"></i>
          <i className="fa-light fa-star"></i>
        </div>
        <h6 className="mb-0">(3 Customer Reviews)</h6>
      </div>

      <p className="rv-product-details__short-descr">
        Morbi molestie a feugiat sed mauris eu metus vestibulum varius Phasellus
        nisl mauris. Suspendisse tristique, neque blandit egestas, risus orci
        lacinia ante, sit amet pretium enim.
      </p>

      <h4 className="rv-product-details__price">
        <span className="prev-price">${item.prevPrice}.00</span>
        <span className="current-price">${item.price}.00</span>
      </h4>

      <div className="rv-product-details__actions">
        <div className="rv-product-details__quantity cart-product__quantity">
          <input
            type="number"
            name="product-quantity"
            id="product-quantity-input"
            className="cart-product-quantity-input"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <div>
            <button
              className="minus-btn cart-product__minus"
              onClick={handleIncreaseQuantity}
            >
              <i className="fa-light fa-angle-up"></i>
            </button>
            <button
              className="plus-btn cart-product__plus"
              onClick={handleDecreaseQuantity}
            >
              <i className="fa-light fa-angle-down"></i>
            </button>
          </div>
        </div>

        <button
          className="rv-product-details__add-to-wishlist"
          onClick={handleAddToWishlist}
        >
          <i className="fa-regular fa-heart"></i>
        </button>
        <button
          className="rv-product-details__add-to-cart"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>

      <div className="rv-product-details__infos">
        <ul>
          <li>
            <span className="info-property"> Brand:</span>{" "}
            <span className="info-value">Wet n wild</span>
          </li>
          <li>
            <span className="info-property"> Scent: </span>{" "}
            <span className="info-value">Fragranced</span>
          </li>
          <li>
            <span className="info-property"> Item Form: </span>{" "}
            <span className="info-value">Cream</span>
          </li>
          <li>
            <span className="info-property"> Active Ingredients: </span>{" "}
            <span className="info-value">Not Tested On Animals</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailTop;
