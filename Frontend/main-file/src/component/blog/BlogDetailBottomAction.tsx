import { Link } from "react-router-dom";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const BlogDetailBottomAction = () => {
  return (
    <DivAnimateYAxis className="rv-blog-details-bottom-actions" position={40}>
      <div className="rv-blog-details-tags">
        <h6 className="rv-blog-details-bottom-actions__title">Post Tags:</h6>
        <Link to="#" className="rv-blog-details-tag">
          Education
        </Link>
        <Link to="#" className="rv-blog-details-tag">
          Study
        </Link>
        <Link to="#" className="rv-blog-details-tag">
          LMS
        </Link>
      </div>

      <div className="rv-blog-details-shares">
        <h6 className="rv-blog-details-bottom-actions__title">Share:</h6>
        <div className="rv-1-socials rv-inner-socials">
          <Link to="#">
            <i className="fa-brands fa-facebook-f"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-twitter"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-discord"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-pinterest"></i>
          </Link>
        </div>
      </div>
    </DivAnimateYAxis>
  );
};

export default BlogDetailBottomAction;
