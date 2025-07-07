import { Link } from "react-router-dom";
import BreadcrumbSection from "../breadcrumb/BreadcrumbSection";

const ErrorSection = () => {
  return (
    <>
      <BreadcrumbSection title="Error 404" />
      <div className="rv-404 rv-section-spacing text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <img src="/assets/img/404.png" alt="404 image" />
              <h3 className="rv-404__title">Page Not Found</h3>
              <p className="rv-404__sub-title">
                Sorry, The Page You're Looking For Doesn't Exist.
              </p>
              <Link to="/" className="rv-3-def-btn rv-404__btn">
                Go Back to Homepage{" "}
                <i className="fa-regular fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorSection;
