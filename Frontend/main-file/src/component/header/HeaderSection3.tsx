import { useEffect, useRef, useState } from "react";
import NavSection from "../navigation/NavSection";
import { Link } from "react-router-dom";

const HeaderSection3 = () => {
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
      className={`rv-7-header rv-9-header rv-9-header--sticky ${
        isHeaderFixed ? "rv-7-header--sticky" : ""
      }`}
    >
      <div className="rv-7-header__top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-6">
              <div className="rv-7-header__top-left">
                <div className="rv-7-header__top-contact">
                  <span>
                    <i className="fa-solid fa-phone"></i>
                    <a href="tel:+1234567890">+1 (234) 567-890</a>
                  </span>
                  <span>
                    <i className="fa-solid fa-envelope"></i>
                    <a href="mailto:info@evbattery.com">info@evbattery.com</a>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-6">
              <div className="rv-7-header__top-right">
                <div className="rv-7-header__top-social">
                  <a href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a href="#">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rv-7-header__bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-6 col-xxs-6 order-1 order-lg-1">
              <div className="rv-7-header__bottom-left">
                <div className="rv-7-header__logo">
                  <Link to="/">
                    <img
                      src="assets/img/rv-9-logo-dark.png"
                      alt="EV Battery Logo"
                      className="rv-9-logo"
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-12 order-3 order-lg-2">
              <div className="rv-7-header__bottom-center">
                <NavSection style="rv-7-header__nav" />
              </div>
            </div>

            <div className="col-lg-3 col-8 col-xxs-6 order-2 order-lg-3">
              <div className="rv-7-header-bottom-right rv-9-header-bottom__right">
                <div className="d-flex justify-content-between align-items-center w-100">
                  {/* Mobile Menu Button */}
                  <div className="d-lg-none">
                    <button
                      type="button"
                      className="rv-7-header__mobile-menu-btn"
                      onClick={openSidebar}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </button>
                  </div>

                  {/* Desktop Authentication Links */}
                  <div className="d-none d-lg-flex header-auth-links">
                    <Link to="/sign-in" className="auth-link">
                      Sign In
                    </Link>
                    <Link to="/sign-up" className="auth-link">
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`rv-7-header__sidebar ${isSidebarOpen ? "active" : ""}`}
        ref={sidebarRef}
      >
        <div className="rv-7-header__sidebar-header">
          <div className="rv-7-header__sidebar-logo">
            <Link to="/">
              <img
                src="assets/img/rv-9-logo-dark.png"
                alt="EV Battery Logo"
              />
            </Link>
          </div>
          <button
            type="button"
            className="rv-7-header__sidebar-close"
            onClick={closeSidebar}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="rv-7-header__sidebar-content">
          <NavSection style="rv-7-header__sidebar-nav" />
          <div className="rv-7-header__sidebar-auth">
            <Link to="/sign-in" className="rv-7-btn rv-7-btn--primary">
              Sign In
            </Link>
            <Link to="/sign-up" className="rv-7-btn rv-7-btn--secondary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection3;
