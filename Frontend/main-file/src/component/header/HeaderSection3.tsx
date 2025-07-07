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
    <header className="rv-9-header rv-1-header p-0">
      <div className="rv-9-header-top">
        <div className="container">
          <div className="row gy-2 gy-sm-3 align-items-center">
            <div className="col-md-5">
              <div className="rv-8-header-socials rv-9-header-socials">
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

            <div className="col-md-7">
              <div className="rv-7-header-top__actions rv-9-header-top__actions">
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
        className={`rv-9-header-bottom to-be-fixed ${
          isHeaderFixed ? "fixed" : ""
        }`}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-4 col-xxs-6">
              <div className="rv-8-header__logo">
                <Link to="/">
                  <img src="assets/img/rv-9-logo.png" alt="Logo" />
                </Link>
              </div>
            </div>

            <div className="col-lg-6 order-3 order-lg-2">
              <div
                className={`rv-1-header-nav__sidebar ${
                  isSidebarOpen ? "active" : ""
                }`}
                ref={sidebarRef}
              >
                <div className="sidebar-heading d-lg-none d-flex align-items-center justify-content-between">
                  <Link to="/" className="logo-container">
                    <img src="assets/img/rv-9-logo.png" alt="logo" />
                  </Link>
                  <button
                    className="rv-3-def-btn rv-1-header-mobile-menu-btn rv-9-mobile-menu-btn sidebar-close-btn"
                    onClick={closeSidebar}
                  >
                    <i className="fa-regular fa-xmark"></i>
                  </button>
                </div>

                <NavSection style="rv-7-header__nav rv-9-header__nav" />
              </div>
            </div>

            <div className="col-lg-3 col-8 col-xxs-6 order-2 order-lg-3">
              <div className="rv-7-header-bottom-right rv-9-header-bottom__right">
                <div className="rv-7-header-search-modal">
                  <button className="rv-7-search-modal-close-btn">
                    <i className="fa-regular fa-xmark"></i>
                  </button>
                  <form
                    action="#"
                    className="rv-7-header-search rv-8-header-search"
                  >
                    <button type="submit">
                      <i className="fa-regular fa-magnifying-glass"></i>
                    </button>
                    <input
                      type="search"
                      name="search"
                      id="rv-7-header-search"
                      placeholder="Search Products..."
                    />
                  </form>
                </div>
                <button className="rv-7-search-modal-open-btn d-xl-none d-inline-block">
                  <i className="fa-regular fa-magnifying-glass"></i>
                </button>
                <button
                  className="rv-1-header-mobile-menu-btn rv-3-def-btn rv-9-mobile-menu-btn d-inline-block d-lg-none"
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

export default HeaderSection3;
