import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import CommentForm from "../form/CommentForm";

const BlogDetailCommentFormArea = () => {
  return (
    <DivAnimateYAxis className="rv-comment-form-area">
      <h3 className="rv-comments-area__title">Leave a comment</h3>
      <CommentForm />
    </DivAnimateYAxis>
  );
};

export default BlogDetailCommentFormArea;
