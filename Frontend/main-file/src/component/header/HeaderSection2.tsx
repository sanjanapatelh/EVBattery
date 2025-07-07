import { useEffect, useRef, useState } from "react";
import NavSection from "../navigation/NavSection";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleSearchModalOpen } from "../../redux/features/searchModalSlice";
import { toggleCartModalOpen } from "../../redux/features/cartModalSlice";
import { toggleWishlistModalOpen } from "../../redux/features/wishlistModalSlice";
import { Link } from "react-router-dom";

const HeaderSection2 = () => {
  const dispatch = useAppDispatch();

  const [totalCartItems, setTotalCartItems] = useState(0);
  const cartItems = useAppSelector((state) => state.cart.cart);
  const [totalWishlistItems, setTotalWishlistItems] = useState(0);
  const wishlistItems = useAppSelector((state) => state.wishlist.wishlist);

  const openSearchModal = () => {
    dispatch(toggleSearchModalOpen());
  };

  const openCartModal = () => {
    dispatch(toggleCartModalOpen());
  };

  const openWishlistModal = () => {
    dispatch(toggleWishlistModalOpen());
  };

  useEffect(() => {
    // Calculate total quantity of items in the cart
    const total = cartItems.reduce(
      (total, currentItem) => total + currentItem.quantity,
      0
    );
    setTotalCartItems(total);
  }, [cartItems]);
  useEffect(() => {
    // Calculate total quantity of items in the cart
    const total = wishlistItems.reduce(
      (total, currentItem) => total + currentItem.quantity,
      0
    );
    setTotalWishlistItems(total);
  }, [wishlistItems]);

  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const openSidebar = () => {
    setIsSidebarOpen(true);
    setIsHeaderFixed(false);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200 && !isSidebarOpen) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200 && !isSidebarOpen) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeSidebar]);
  return (
    <header
      className={`rv-12-header rv-1-header to-be-fixed ${
        isHeaderFixed ? "fixed" : ""
      }`}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-sm-3 col-5">
            <div className="rv-8-header__logo">
              <Link to="/">
                <img src="assets/img/rv-12-logo.png" alt="Logo" />
              </Link>
            </div>
          </div>

          <div className="col-lg-6 order-lg-1 order-2">
            <div
              className={`rv-1-header-nav__sidebar ${
                isSidebarOpen ? "active" : ""
              }`}
              ref={sidebarRef}
            >
              <div className="sidebar-heading d-lg-none d-flex align-items-center justify-content-between">
                <Link to="/" className="logo-container">
                  <img src="assets/img/rv-12-logo.png" alt="logo" />
                </Link>
                <button
                  className="rv-3-def-btn rv-1-header-mobile-menu-btn rv-12-mobile-menu-btn sidebar-close-btn"
                  onClick={closeSidebar}
                >
                  <i className="fa-regular fa-xmark"></i>
                </button>
              </div>

              <NavSection style="rv-12-header__nav" />
            </div>
          </div>

          <div className="col-lg-3 col-sm-9 col-7 order-lg-2 order-1">
            <div className="rv-5-header__actions rv-12-header__actions">
              <button
                className="rv-12-header__search-btn rv-search-modal-open-btn"
                onClick={openSearchModal}
              >
                <i className="fa-regular fa-magnifying-glass"></i>
              </button>
              <button
                className="rv-5-cart-btn rv-11-wishlist-btn d-block d-xxs-none"
                onClick={openWishlistModal}
              >
                <i className="fa-regular fa-heart"></i>
                <span className="quantity">{totalWishlistItems}</span>
              </button>
              <button
                className="rv-5-cart-btn d-block d-xxs-none"
                onClick={openCartModal}
              >
                <i className="fa-regular fa-bag-shopping"></i>
                <span className="quantity">{totalCartItems}</span>
              </button>
              <Link to="/sign-in" className="rv-12-header-login">
                <i className="rv-5-cart-btn">
                  <i className="fa-regular fa-user"></i>
                </i>
                <span className="rv-12-header-login__txt text-start">
                  <span>Hello</span>
                  <span className="bottom">Sign In</span>
                </span>
              </Link>
              <button
                className="rv-1-header-mobile-menu-btn rv-3-def-btn rv-12-mobile-menu-btn d-inline-block d-lg-none"
                id="rv-1-header-mobile-menu-btn"
                onClick={openSidebar}
              >
                <i className="fa-regular fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection2;
