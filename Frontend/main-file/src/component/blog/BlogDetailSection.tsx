import BlogDetailInfo from "./BlogDetailInfo";
import BlogDetailDesc from "./BlogDetailDesc";
import BlogDetailBottomAction from "./BlogDetailBottomAction";
import BlogDetailCommentArea from "./BlogDetailCommentArea";
import BlogDetailCommentFormArea from "./BlogDetailCommentFormArea";
import BlogSearchbar from "./BlogSearchbar";
import BlogCategory from "./BlogCategory";
import BlogRecentSection from "./BlogRecentSection";
import BlogTagSection from "./BlogTagSection";
import ImgAnimateLeftToRight from "../utils/ImgAnimateLeftToRight";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import { blogData3 } from "../../data/Data";
import { Link } from "react-router-dom";
type Props = {
  img: string;
  title: string;
  id: number;
};
const BlogDetailSection = ({ img, title, id }: Props) => {
  const prevBlog = blogData3.find((item) => item.id === id - 1);
  const nextBlog = blogData3.find((item) => item.id === id + 1);
  return (
    <div className="rv-blog-details pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center rv-blog-details__row">
          <div className="col-lg-8">
            <div className="rv-blog-details-left">
              <div className="rv-blog-details__img">
                <ImgAnimateLeftToRight src={img} alt="blog banner" />
              </div>

              <BlogDetailInfo />
              <div>
                <h2 className="rv-blog-details__title">{title}</h2>
              </div>

              <BlogDetailDesc />

              <BlogDetailBottomAction />

              <DivAnimateYAxis className="rv-blog-details-bottom__navs">
                <div className="row gy-0 gx-0">
                  <div className="col-6 col-xxs-12">
                    <Link
                      to={prevBlog ? `/blog/${prevBlog.slug}` : "#"}
                      className={`rv-blog-details-bottom-nav ${
                        !prevBlog ? "disabled" : ""
                      }`}
                    >
                      <i className="fa-sharp fa-regular fa-arrow-left"></i>Prev
                      Post
                    </Link>
                  </div>
                  <div className="col-6 col-xxs-12 ms-auto">
                    <Link
                      to={nextBlog ? `/blog/${nextBlog.slug}` : "#"}
                      className={`rv-blog-details-bottom-nav justify-content-end ${
                        !nextBlog ? "disabled" : ""
                      }`}
                    >
                      Next Post
                      <i className="fa-sharp fa-regular fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </DivAnimateYAxis>

              <BlogDetailCommentArea />

              <BlogDetailCommentFormArea />
            </div>
          </div>

          <div className="col-lg-4 col-md-8 col-10 col-xxs-12">
            <BlogSearchbar />

            <BlogCategory />

            <BlogRecentSection />

            <BlogTagSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailSection;
