import { useEffect, useRef, useState } from "react";
import NavSection from "../navigation/NavSection";
import { Link } from "react-router-dom";

const HeaderSection4 = () => {
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
      className={`rv-1-header rv-inner-header to-be-fixed ${
        isHeaderFixed ? "fixed" : ""
      }`}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-3 col-4 col-xxs-6">
            <div className="rv-1-logo">
              <Link to="/">
                <img
                  src="/assets/img/logo.png"
                  alt="logo"
                  className="rv-1-logo"
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
                  <img src="/assets/img/logo.png" alt="logo" />
                </Link>
                <button
                  className="rv-3-def-btn rv-1-header-mobile-menu-btn rv-inner-mobile-menu-btn sidebar-close-btn"
                  onClick={closeSidebar}
                >
                  <i className="fa-regular fa-xmark"></i>
                </button>
              </div>

              <NavSection style="rv-inner-header__nav" />
            </div>
          </div>

          <div className="col-lg-3 col-8 col-xxs-6 text-end order-1 order-lg-2">
            <div className="d-flex justify-content-end">
              <div className="rv-inner-header-right-btns">
                <Link to="/sign-in">
                  <i className="fa-regular fa-user"></i>Login
                </Link>
                <a href="#" className="d-sm-inline-block d-none">
                  let's talk
                </a>
              </div>
              <button
                className="rv-1-header-mobile-menu-btn rv-3-def-btn rv-inner-mobile-menu-btn d-lg-none d-inline-block"
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

export default HeaderSection4;
