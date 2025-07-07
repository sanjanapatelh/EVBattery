import { Link } from "react-router-dom";
import NewsletterForm2 from "../form/NewsletterForm2";

const FooterSection3 = () => {
  return (
    <footer className="rv-inner-footer">
      <div className="container">
        <div className="rv-8-footer-middle">
          <div className="row g-4 justify-content-xl-between justify-content-center">
            <div className="col-xl-3 col-lg-4 col-md-6 col-8 col-xxs-12">
              <div className="rv-1-footer__about">
                <Link to="/">
                  <img src="/assets/img/logo.png" alt="Logo" className="logo" />
                </Link>
                <p className="rv-1-footer__about-txt">
                  Morbi pharetra, eros sed euismod pellentesque, nulla risus
                  lobortis.
                </p>
                <div className="rv-1-socials rv-inner-socials">
                  <Link to="#">
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                  <Link to="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </Link>
                  <Link to="#">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </Link>
                  <Link to="#">
                    <i className="fa-brands fa-pinterest-p"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-xl-2 col-lg-3 col-md-3 col-6 col-xxs-12">
              <div className="rv-1-footer-widget rv-inner-footer-widget">
                <h5 className="rv-1-footer-widget__title">Useful Links</h5>
                <ul className="rv-8-footer-widget__links">
                  <li>
                    <Link to="#">About Us</Link>
                  </li>
                  <li>
                    <Link to="#">Latest Work</Link>
                  </li>
                  <li>
                    <Link to="#">Team Member</Link>
                  </li>
                  <li>
                    <Link to="#">Latest Blog</Link>
                  </li>
                  <li>
                    <Link to="#">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-2 col-lg-3 col-md-3 col-6 col-xxs-12">
              <div className="rv-1-footer-widget rv-inner-footer-widget">
                <h5 className="rv-1-footer-widget__title">Our Services</h5>
                <ul className="rv-8-footer-widget__links">
                  <li>
                    <Link to="#">SEO Optimization</Link>
                  </li>
                  <li>
                    <Link to="#">Content Marketing</Link>
                  </li>
                  <li>
                    <Link to="#">Data Analysis</Link>
                  </li>
                  <li>
                    <Link to="#">Digital Marketing</Link>
                  </li>
                  <li>
                    <Link to="#">Web Analytics</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-lg-5 col-md-6 col-8 col-xxs-12">
              <div className="rv-1-footer-nwsltr">
                <h5 className="rv-1-footer-widget__title">Newsletter Signup</h5>
                <NewsletterForm2 />
              </div>
            </div>
          </div>
        </div>

        <div className="rv-2-footer rv-8-footer-bottom">
          <div className="row gy-3 align-items-center">
            <div className="col-md-8">
              <p className="rv-2-copyright rv-1-copyright mb-0 text-center text-md-start">
                &copy; {new Date().getFullYear()} Codebasket All Rights Reserved
                by site
              </p>
            </div>
            <div className="col-md-4 text-center text-md-end">
              <div className="rv-2-footer__nav">
                <Link to="#">Privacy Policy</Link>
                <Link to="#">Term of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection3;
