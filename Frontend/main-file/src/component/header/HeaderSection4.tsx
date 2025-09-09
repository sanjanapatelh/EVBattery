import { useEffect, useRef, useState, useCallback } from "react";
import NavSection from "../navigation/NavSection";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./HeaderSection4.css";

const HeaderSection4 = () => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  
  const openSidebar = useCallback(() => {
    setIsSidebarOpen(true);
    setIsHeaderFixed(false);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    closeSidebar();
  }, [logout, closeSidebar]);

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

  // Close sidebar when route changes
  useEffect(() => {
    closeSidebar();
  }, [closeSidebar]);

  return (
    <header
      className={`rv-1-header rv-inner-header to-be-fixed ${
        isHeaderFixed ? "fixed" : ""
      }`}
    >
      {/* Full Width Header Container */}
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Logo Section */}
          <div className="col-lg-3 col-md-4 col-6">
            <div className="rv-1-logo">
              <Link to="/">
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/img/logo.png"
                    alt="EV Battery Logo"
                    className="rv-1-logo__img me-2"
                    style={{ maxHeight: '50px', width: 'auto' }}
                  />
                  <div className="logo-text">
                    <h5 className="mb-0 fw-bold text-dark">EV Battery</h5>
                    <small className="text-muted">Manufacturer Dashboard</small>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Navigation Section - Hidden on mobile */}
          <div className="col-lg-6 col-md-4 d-none d-md-block">
            <div className="rv-1-header-nav">
              <NavSection style="rv-inner-header__nav" />
            </div>
          </div>

          {/* Right Buttons Section */}
          <div className="col-lg-3 col-md-4 col-6">
            <div className="d-flex justify-content-end align-items-center">
              {user ? (
                <div className="rv-inner-header-right-btns d-none d-md-flex align-items-center">
                  <div className="user-info me-3">
                    <span className="text-muted small">Welcome,</span>
                    <div className="fw-bold text-dark">{user.name}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="rv-3-def-btn btn-outline-danger"
                  >
                    <i className="fa-regular fa-sign-out me-2"></i>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="rv-inner-header-right-btns d-none d-md-block">
                  <Link to="/sign-in" className="rv-3-def-btn">
                    <i className="fa-regular fa-user me-2"></i>
                    Login
                  </Link>
                </div>
              )}
              
              {/* Mobile Menu Button */}
              <button
                className="rv-1-header-mobile-menu-btn rv-3-def-btn rv-inner-mobile-menu-btn d-md-none"
                onClick={openSidebar}
                aria-label="Open mobile menu"
              >
                <i className="fa-regular fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`rv-1-header-nav__sidebar ${
          isSidebarOpen ? "active" : ""
        }`}
        ref={sidebarRef}
      >
        <div className="sidebar-heading d-flex align-items-center justify-content-between">
          <Link to="/" className="logo-container" onClick={closeSidebar}>
            <div className="d-flex align-items-center">
              <img 
                src="/assets/img/logo.png" 
                alt="EV Battery Logo" 
                className="me-2"
                style={{ maxHeight: '40px', width: 'auto' }}
              />
              <div className="logo-text">
                <h6 className="mb-0 fw-bold text-dark">EV Battery</h6>
                <small className="text-muted">Dashboard</small>
              </div>
            </div>
          </Link>
          <button
            className="rv-3-def-btn rv-1-header-mobile-menu-btn rv-inner-mobile-menu-btn sidebar-close-btn"
            onClick={closeSidebar}
            aria-label="Close mobile menu"
          >
            <i className="fa-regular fa-xmark"></i>
          </button>
        </div>

        <div className="sidebar-content">
          <NavSection style="rv-inner-header__nav" />
          
          <div className="sidebar-footer mt-4">
            {user ? (
              <div className="text-center">
                <div className="user-info mb-3">
                  <span className="text-muted small d-block">Welcome,</span>
                  <div className="fw-bold text-dark">{user.name}</div>
                  <small className="text-muted">{user.userType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</small>
                </div>
                <button
                  onClick={handleLogout}
                  className="rv-3-def-btn btn-outline-danger w-100"
                >
                  <i className="fa-regular fa-sign-out me-2"></i>
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/sign-in" className="rv-3-def-btn w-100" onClick={closeSidebar}>
                <i className="fa-regular fa-user me-2"></i>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={closeSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
        />
      )}
    </header>
  );
};

export default HeaderSection4;
