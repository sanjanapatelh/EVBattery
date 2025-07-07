import { useAppDispatch } from "../../redux/hooks";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/features/cartSlice";
import { addToWishlist } from "../../redux/features/wishlistSlice";
import { ShopItem } from "../../types";
import { Link } from "react-router-dom";
type Props = {
  img: string;
  name: string;
  prevPrice: number;
  price: number;
  discount?: boolean;
  slug: string;
  product: ShopItem;
  style?: string;
};

const ShopCard = ({
  img,
  name,
  prevPrice,
  price,
  discount,
  slug,
  product,
  style,
}: Props) => {
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Item added to cart!");
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
    toast.success("Item added to wishlist!");
  };

  return (
    <div className={`rv-3-product rv-12-product ${style ? style : ""}`}>
      <div className="rv-3-product__img rv-12-product__img">
        <img src={img} alt="Product Image" />
        {discount && <span className="rv-3-product__tag">-20%</span>}
        <div className="rv-3-product__actions">
          <button className="quick-view">
            <i className="fa-regular fa-eye"></i>
          </button>
          <button className="add-to-wishlist" onClick={handleAddToWishlist}>
            <i className="fa-regular fa-heart"></i>
          </button>
          <button className="compare">
            <i className="fa-regular fa-arrow-right-arrow-left"></i>
          </button>
        </div>
      </div>

      <div className="rv-3-product__txt">
        <div className="rv-3-product__rating">
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-regular fa-star"></i>
        </div>
        <h5 className="rv-3-product__title">
          <Link to={`/shop/${slug}`}>{name}</Link>
        </h5>

        <p className="rv-inner-product__descr">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint tempore
          iste nam voluptatum cupiditate ullam consectetur veniam dicta magnam
          architecto!
        </p>

        <div className="rv-3-product__bottom">
          <span className="rv-3-product__price">
            <span className="prev-price">${prevPrice}.00</span>
            <span className="current-price">${price}.00</span>
          </span>

          <button className="rv-3-product__cart-btn" onClick={handleAddToCart}>
            <img src="/assets/add-to-cart.svg" alt="add to cart" />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
