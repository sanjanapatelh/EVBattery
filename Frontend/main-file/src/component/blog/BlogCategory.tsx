import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const BlogCategory = () => {
  return (
    <DivAnimateYAxis className="rv-blog-details-right rv-blog-details-categories">
      <h3 className="rv-blog-details-right__title">Categories</h3>
      <ul>
        <li>
          <a href="#" className="rv-blog-details-category">
            <span className="rv-blog-details-category-name">BUSINESS</span>
          </a>
        </li>

        <li>
          <a href="#" className="rv-blog-details-category">
            <span className="rv-blog-details-category-name">INSIGHTS</span>
          </a>
        </li>

        <li>
          <a href="#" className="rv-blog-details-category">
            <span className="rv-blog-details-category-name">LATEST</span>
          </a>
        </li>

        <li>
          <a href="#" className="rv-blog-details-category">
            <span className="rv-blog-details-category-name">PODCASTS</span>
          </a>
        </li>

        <li>
          <a href="#" className="rv-blog-details-category">
            <span className="rv-blog-details-category-name">
              PRESS RELEASES
            </span>
          </a>
        </li>

        <li>
          <a href="#" className="rv-blog-details-category">
            <span className="rv-blog-details-category-name">TRENDING</span>
          </a>
        </li>
      </ul>
    </DivAnimateYAxis>
  );
};

export default BlogCategory;
