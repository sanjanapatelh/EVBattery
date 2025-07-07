import { useEffect, useRef, useState } from "react";
import NavSection from "../navigation/NavSection";
import { useAppDispatch } from "../../redux/hooks";
import { toggleSearchModalOpen } from "../../redux/features/searchModalSlice";
import { Link } from "react-router-dom";

const HeaderSection = () => {
  const dispatch = useAppDispatch();

  const openSearchModal = () => {
    dispatch(toggleSearchModalOpen());
  };
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
    <header className="rv-1-header rv-inner-header p-0">
      <div className="rv-20-header-top">
        <div className="container">
          <div className="row gy-2 align-items-center">
            <div className="col-lg-6">
              <div className="rv-8-header-top__txt rv-7-header-top__actions mb-0">
                <div className="rv-8-header-socials rv-10-header-socials">
                  <h6>Follow Us:</h6>
                  <a href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="rv-7-header-top__actions rv-20-header-top__actions justify-content-center justify-content-lg-end">
                <button
                  className="rv-search-modal-open-btn"
                  onClick={openSearchModal}
                >
                  <i className="fa-regular fa-magnifying-glass"></i> Search...
                </button>
                <h6 className="rv-8-header-contact-info rv-8-header-contact-numb">
                  <i className="fa-solid fa-sharp fa-phone"></i>{" "}
                  <a href="tel:1237775643">(123) 777 - 5643</a>
                </h6>
                <h6 className="rv-8-header-contact-info rv-8-header-contact-email">
                  <i className="fa-solid fa-envelope"></i>
                  <a href="mailto:example@gmail.com">example@gmail.com</a>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`rv-20-header-bottom to-be-fixed ${
          isHeaderFixed ? "fixed" : ""
        }`}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-4 col-xxs-6">
              <div className="rv-1-logo">
                <Link to="/">
                  <img
                    src="assets/img/rv-20-logo.png"
                    alt="logo"
                    className="logo"
                  />
                </Link>
              </div>
            </div>

            <div className="col-md-6 order-2 order-lg-1">
              <div
                className={`rv-1-header-nav__sidebar ${
                  isSidebarOpen ? "active" : ""
                }`}
                ref={sidebarRef}
              >
                <div className="sidebar-heading d-lg-none d-flex align-items-center justify-content-between">
                  <Link to="/" className="logo-container">
                    <img src="assets/img/rv-20-logo.png" alt="logo" />
                  </Link>
                  <button
                    className="rv-3-def-btn rv-1-header-mobile-menu-btn rv-20-mobile-menu-btn sidebar-close-btn"
                    onClick={closeSidebar}
                  >
                    <i className="fa-regular fa-xmark"></i>
                  </button>
                </div>

                <NavSection style="rv-20-header__nav" />
              </div>
            </div>

            <div className="col-lg-3 col-8 col-xxs-6 text-end order-1 order-lg-2">
              <div className="d-flex justify-content-end">
                <div className="rv-inner-header-right-btns rv-15-header-right-btns rv-20-header-bottom-right-btns">
                  <a href="#" className="d-sm-inline-block d-none">
                    Get a Quote
                  </a>
                </div>
                <button
                  className="rv-1-header-mobile-menu-btn rv-3-def-btn rv-20-mobile-menu-btn d-lg-none d-inline-block"
                  id="rv-1-header-mobile-menu-btn"
                  onClick={openSidebar}
                >
                  <i className="fa-regular fa-bars"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
