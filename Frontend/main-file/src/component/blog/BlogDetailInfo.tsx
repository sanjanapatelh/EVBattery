import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const BlogDetailInfo = () => {
  return (
    <DivAnimateYAxis className="rv-blog-details__infos" position={40}>
      <h6 className="rv-blog-details__info">
        <i className="fa-light fa-calendar-alt"></i>March 24, 2023
      </h6>
      <h6 className="rv-blog-details__info">
        <i className="fa-regular fa-user"></i> By <a href="#">Abu Bakkar</a>
      </h6>
      <h6 className="rv-blog-details__info">
        <i className="fa-regular fa-comment-alt-dots"></i>3 Comments
      </h6>
    </DivAnimateYAxis>
  );
};

export default BlogDetailInfo;
