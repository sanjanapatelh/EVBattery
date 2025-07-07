import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const BlogTagSection = () => {
  return (
    <DivAnimateYAxis className="rv-blog-details-right">
      <h3 className="rv-blog-details-right__title">Related Tags</h3>
      <div className="rv-blog-details-tags flex-wrap">
        <a href="#" className="rv-blog-details-tag">
          Education
        </a>
        <a href="#" className="rv-blog-details-tag">
          Study
        </a>
        <a href="#" className="rv-blog-details-tag">
          Mind Training
        </a>
        <a href="#" className="rv-blog-details-tag">
          Focus
        </a>
        <a href="#" className="rv-blog-details-tag">
          Manifestation
        </a>
        <a href="#" className="rv-blog-details-tag">
          LMS
        </a>
        <a href="#" className="rv-blog-details-tag">
          Art
        </a>
        <a href="#" className="rv-blog-details-tag">
          Time Management
        </a>
        <a href="#" className="rv-blog-details-tag">
          Hard Work
        </a>
      </div>
    </DivAnimateYAxis>
  );
};

export default BlogTagSection;
