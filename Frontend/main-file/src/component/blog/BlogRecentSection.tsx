import { Link } from "react-router-dom";
import { blogData3 } from "../../data/Data";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const BlogRecentSection = () => {
  return (
    <DivAnimateYAxis className="rv-blog-details-right rv-blog-details-recents">
      <h3 className="rv-blog-details-right__title">Recent Posts</h3>
      {blogData3.slice(0, 3).map((item) => (
        <div className="rv-recent-blog" key={item.id}>
          <img
            className="rv-recent-blog__img"
            src={item.img}
            alt="blog image"
          />
          <div className="rv-recent-blog__txt">
            <span className="rv-recent-blog__date">
              <i className="fa-light fa-calendar-alt"></i> {item.date}
            </span>
            <h4 className="rv-recent-blog__title">
              <Link to={`/blog/${item.slug}`}>{item.title}</Link>
            </h4>
          </div>
        </div>
      ))}
    </DivAnimateYAxis>
  );
};

export default BlogRecentSection;
