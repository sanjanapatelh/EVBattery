type Props = {
  uniqueCategories: string[];
  selectedCategories: string[];
  handleCategoryClick: (category: string) => void;
};

const ShopCategory = ({
  uniqueCategories,
  selectedCategories,
  handleCategoryClick,
}: Props) => {
  const isCategorySelected = (category: string) => {
    return selectedCategories.includes(category);
  };

  const handleClick = (category: string) => {
    // Toggle the category selection
    handleCategoryClick(category);
  };

  return (
    <section className="rv-blog-details-right rv-shop-sidebar-single-area rv-inner-product-categories">
      <h3 className="rv-blog-details-right__title">Product categories</h3>
      <ul className="categories">
        {uniqueCategories.map((category, index) => (
          <li
            key={index}
            className={`cat-item ${
              isCategorySelected(category) ? " active" : ""
            }`}
          >
            <a
              onClick={() => handleClick(category)}
              role="button"
              aria-label={`Filter by ${category}`}
            >
              <span className="txt">{category}</span>{" "}
              <span className="icon">
                <i
                  className={`fa-light ${
                    isCategorySelected(category) ? "fa-minus" : "fa-plus"
                  }`}
                ></i>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ShopCategory;
