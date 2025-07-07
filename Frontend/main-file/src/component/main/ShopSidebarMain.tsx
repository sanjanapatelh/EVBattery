import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  nextPage,
  selectFilteredShopSidebarData,
  selectShopSidebarState,
  setItemsPerPage,
  setSelectedCategories,
  setSelectedColorFilters,
  setSorting,
  setView,
} from "../../redux/features/shopSidebarSlice";
import ShopTopActions from "../shop/ShopTopActions";
import ShopSidebar from "../shop/ShopSidebar";
import ShopSidebarInnerProducts from "../shop/ShopSidebarInnerProducts";
import ShopPagination from "../shop/ShopPagination";
import NotFoundText from "../shop/NotFoundText";

const ShopSidebarMain = () => {
  const dispatch = useAppDispatch();
  const shopState = useAppSelector(selectShopSidebarState);
  const itemsPerPage = useAppSelector(
    (state) => state.shopSidebar.itemsPerPage
  );
  const isGridView = useAppSelector((state) => state.shopSidebar.isGridView);
  const sorting = useAppSelector((state) => state.shopSidebar.sorting);
  const currentPage = useAppSelector((state) => state.shopSidebar.currentPage);

  // Select filtered shop data
  const filteredData = useAppSelector(selectFilteredShopSidebarData);
  const currentItems = filteredData.currentItems;
  const totalItems = filteredData.totalItems; // Total items count should be based on filtered data
  const totalPages = filteredData.totalPages; // Total pages based on filtered data

  // Calculate startIndex and endIndex based on currentPage and itemsPerPage
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const shop = useAppSelector((state) => state.shopSidebar);

  const handleViewChange = () => {
    dispatch(setView());
  };

  const handleItemsPerPageChange = (value: number) => {
    dispatch(setItemsPerPage(value));
  };

  const handleSortingChange = (value: string) => {
    dispatch(setSorting(value));
  };

  const handleNextPage = (pageNumber: number) => {
    dispatch(nextPage(pageNumber));
    setTimeout(() => {
      window.scrollTo(0, 200);
    }, 500);
  };
  // Category Filter
  const selectedCategories = shopState.selectedCategories || [];

  // Extract unique categories from the shop data
  const uniqueCategories = Array.from(
    new Set(shopState.shopData.map((item) => item.category))
  );

  const handleCategoryClick = (category: string) => {
    // Check if the category is already selected
    const isAlreadySelected = selectedCategories.includes(category);

    // If the category is already selected, remove it
    if (isAlreadySelected) {
      const updatedCategories = selectedCategories.filter(
        (c) => c !== category
      );
      dispatch(setSelectedCategories(updatedCategories));
    } else {
      // If the category is not selected, add it
      const updatedCategories = [...selectedCategories, category];
      dispatch(setSelectedCategories(updatedCategories));
    }
  };

  // Color Filter

  const selectedColors = shopState.selectedColorFilters || [];

  // Extract unique Colors from the shop data
  const uniqueColors = Array.from(
    new Set(shopState.shopData.map((item) => item.color))
  );

  const handleColorClick = (color: string) => {
    // Check if the color is already selected
    const isAlreadySelected = selectedColors.includes(color);

    // If the color is already selected, remove it
    if (isAlreadySelected) {
      const updatedColors = selectedColors.filter((c) => c !== color);
      dispatch(setSelectedColorFilters(updatedColors));
    } else {
      // If the color is not selected, add it
      const updatedColors = [...selectedColors, color];
      dispatch(setSelectedColorFilters(updatedColors));
    }
  };
  const colorCounts: Record<string, number> = {};
  shop.shopData.forEach((item) => {
    if (colorCounts[item.color]) {
      colorCounts[item.color]++;
    } else {
      colorCounts[item.color] = 1;
    }
  });

  return (
    <div className="rv-shop-area rv-section-spacing">
      <div className="container">
        <ShopTopActions
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
          handleItemsPerPageChange={handleItemsPerPageChange}
          itemsPerPage={itemsPerPage}
          isGridView={isGridView}
          handleViewChange={handleViewChange}
          handleSortingChange={handleSortingChange}
          sorting={sorting}
        />

        <div className="row gy-5 justify-content-center">
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-8 col-9 col-xxs-12 order-1 order-lg-0">
            <ShopSidebar
              uniqueCategories={uniqueCategories}
              selectedCategories={selectedCategories}
              handleCategoryClick={handleCategoryClick}
              uniqueColors={uniqueColors}
              selectedColors={selectedColors}
              handleColorClick={handleColorClick}
              colorCounts={colorCounts}
            />
          </div>

          <div className="col-xl-9 col-lg-8 order-0 order-lg-1">
            {currentItems.length !== 0 ? (
              <ShopSidebarInnerProducts
                isGridView={isGridView}
                currentItems={currentItems}
              />
            ) : (
              <NotFoundText />
            )}
            {currentItems.length !== 0 && (
              <ShopPagination
                totalPages={totalPages}
                currentPage={currentPage}
                handleNextPage={handleNextPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSidebarMain;
