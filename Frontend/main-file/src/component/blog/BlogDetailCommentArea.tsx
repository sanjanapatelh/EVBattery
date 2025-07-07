import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const BlogDetailCommentArea = () => {
  return (
    <DivAnimateYAxis className="rv-comments-area">
      <h3 className="rv-comments-area__title">3 Comments:</h3>

      <div className="rv-single-comment-area">
        <div className="rv-comment">
          <div className="rv-comment-commenter__img">
            <img src="/assets/img/rv-3-member-2.jpg" alt="commenter image" />
          </div>

          <div className="rv-comment__txt">
            <div className="rv-comment-commenter__txt">
              <h5 className="rv-comment-commenter__name">Manha Islam</h5>
              <h6 className="rv-comment-commenter__date">
                March 24,2023 at 10:47 pm
              </h6>
            </div>

            <p className="rv-comment__descr">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
              officiis repellat temporibus quibusdam quisquam! Illum
              consequatur, ea earum quo explicabo voluptas! Obcaecati ea nobis
              tenetur voluptatum, pariatur eligendi adipisci nam?
            </p>

            <div className="rv-comment-bottom-actions">
              <button className="rv-comment-reply-btn">Reply</button>
            </div>
          </div>
        </div>

        <div className="rv-comment-reply">
          <div className="rv-comment-commenter__img">
            <img src="/assets/img/rv-5-member-1.jpg" alt="commenter image" />
          </div>

          <div className="rv-comment__txt">
            <div className="rv-comment-commenter__txt">
              <h5 className="rv-comment-commenter__name">
                Bristy Anam{" "}
                <span className="rv-comment-commenter-state">
                  Replied to Manha Islam
                </span>
              </h5>
              <h6 className="rv-comment-commenter__date">
                March 25,2023 at 11:47 am
              </h6>
            </div>

            <p className="rv-comment__descr">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
              officiis repellat temporibus quibusdam quisquam! Illum
              consequatur, ea earum quo explicabo voluptas! Obcaecati ea nobis
              tenetur voluptatum, pariatur eligendi adipisci nam?
            </p>

            <div className="rv-comment-bottom-actions">
              <button className="rv-comment-reply-btn">Reply</button>
            </div>
          </div>
        </div>
      </div>
    </DivAnimateYAxis>
  );
};

export default BlogDetailCommentArea;
