type Props = {
  startIndex: number;
  endIndex: number;
  totalItems: number;
  handleItemsPerPageChange: (value: number) => void;
  itemsPerPage: number;
  isGridView: boolean;
  handleViewChange: () => void;
  handleSortingChange: (value: string) => void;
  sorting: string;
};

const ShopTopActions = ({
  startIndex,
  endIndex,
  totalItems,
  handleItemsPerPageChange,
  itemsPerPage,
  isGridView,
  handleViewChange,
  handleSortingChange,
  sorting,
}: Props) => {
  return (
    <div className="rv-shop-area__top-actions">
      <div className="row gy-3 align-items-center">
        <div className="col-xxl-6 col-xl-6 col-lg-5 text-center text-md-start">
          <p className="text-center text-lg-start mb-0">
            Showing {startIndex + 1}-{endIndex} OF {totalItems} results
          </p>
        </div>
        <div className="col-xxl-6 col-xl-6 col-lg-7">
          <div className="rv-shop-area__right-actions">
            <h6 className="showed-products-number mb-0">
              show :
              <button
                onClick={() => handleItemsPerPageChange(9)}
                className={itemsPerPage === 9 ? "active" : ""}
              >
                9
              </button>
              <button
                onClick={() => handleItemsPerPageChange(12)}
                className={itemsPerPage === 12 ? "active" : ""}
              >
                12
              </button>
              <button
                onClick={() => handleItemsPerPageChange(18)}
                className={itemsPerPage === 18 ? "active" : ""}
              >
                18
              </button>
            </h6>

            <div className="rv-shop-area__view-type">
              <button
                className={`grid-view ${isGridView ? "active" : ""}`}
                onClick={handleViewChange}
                disabled={isGridView}
              >
                <i className="fa-sharp fa-solid fa-grid-2"></i>
              </button>
              <button
                className={`list-view ${!isGridView ? "active" : ""}`}
                onClick={handleViewChange}
                disabled={!isGridView}
              >
                <i className="fa-light fa-list"></i>
              </button>
            </div>

            <div className="product-sorting d-inline-block">
              <form action="#">
                <select
                  onChange={(e) => handleSortingChange(e.target.value)}
                  value={sorting}
                >
                  <option value="menu_order">Default sorting</option>
                  <option value="popularity">Sort by Popularity</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="price">Sort by Price: Low to High</option>
                  <option value="price-desc">Sort by Price: High to Low</option>
                </select>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopTopActions;
