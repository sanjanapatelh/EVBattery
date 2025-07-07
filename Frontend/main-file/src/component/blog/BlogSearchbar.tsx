import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const BlogSearchbar = () => {
  return (
    <DivAnimateYAxis className="rv-blog-details-right rv-blog-details-search">
      <h3 className="rv-blog-details-right__title">Search</h3>
      <form>
        <input
          type="text"
          name="rv-search"
          id="rv-blog-details-search-input"
          placeholder="Search Here..."
        />
        <button type="submit">
          <i className="fa-regular fa-magnifying-glass"></i>
        </button>
      </form>
    </DivAnimateYAxis>
  );
};

export default BlogSearchbar;
