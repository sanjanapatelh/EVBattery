import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import ImgAnimateLeftToRight from "../utils/ImgAnimateLeftToRight";

const BlogDetailDesc = () => {
  return (
    <DivAnimateYAxis className="rv-blog-details-descr">
      <p className="rv-blog-details-descr__txt">
        Morbi molestie eu nisl a feugiat. Maecenas sed mauris eu metus
        vestibulum varius. Phasellus in nisl mauris. Suspendisse tristique,
        neque at blandit egestas, risus orci lacinia ante, sit amet pretium enim
        lacus non ex. Cras vitae augue nec arcu luctus luctus.
      </p>

      <p className="rv-blog-details-descr__txt">
        Cras vel tempus urna. Integer eu venenatis dolor. Vivamus rutrum, mauris
        eget semper semper, diam sem suscipit mauris, a lacinia ipsum elit quis
        diam. In sapien ante, fermentum a nisi.
      </p>

      <blockquote className="rv-blog-details-descr__txt blockquote">
        <p>
          Lorem ipsum dolor sit abet connecters dehiscing alit sed aliquot ex
          supine maximus sit ramet mi laurate untraces.
        </p>

        <h6 className="blockquote__author-name">Norman Gordon</h6>
      </blockquote>

      <div className="rv-blog-details__inner-img">
        <div className="row g-4">
          <div className="col-sm-6">
            <ImgAnimateLeftToRight src="/assets/img/org-blog-1.jpg" alt="" />
          </div>
          <div className="col-sm-6">
            <ImgAnimateLeftToRight src="/assets/img/org-blog-2.jpg" alt="" />
          </div>
        </div>
      </div>
      <div>
        <h3 className="rv-blog-details__title">
          How Developers are Removing The Speculation.
        </h3>
      </div>

      <p className="rv-blog-details-descr__txt">
        Morbi molestie eu nisl a feugiat. Maecenas sed mauris eu metus
        vestibulum varius. Phasellus in nisl mauris. Suspendisse tristique,
        neque at blandit egestas, risus orci lacinia ante, sit amet pretium enim
        lacus non ex. Cras vitae augue nec arcu luctus luctus.
      </p>
    </DivAnimateYAxis>
  );
};

export default BlogDetailDesc;
