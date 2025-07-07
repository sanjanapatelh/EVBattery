import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  nextPage,
  selectFilteredShopData,
  setItemsPerPage,
  setSorting,
  setView,
} from "../../redux/features/shopSlice";
import ShopTopActions from "../shop/ShopTopActions";
import ShopGridInnerProduct from "../shop/ShopGridInnerProduct";
import ShopPagination from "../shop/ShopPagination";

const ShopMain: React.FC = () => {
  const dispatch = useAppDispatch();
  const shop = useAppSelector((state) => state.shop);
  const itemsPerPage = useAppSelector((state) => state.shop.itemsPerPage);
  const isGridView = useAppSelector((state) => state.shop.isGridView);
  const sorting = useAppSelector((state) => state.shop.sorting);
  const currentPage = useAppSelector((state) => state.shop.currentPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, shop.shopData.length);
  const currentItems = useAppSelector(selectFilteredShopData);
  const totalItems = shop.shopData.length;
  // Replace local state calls with Redux actions
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

  const totalPages = Math.ceil(shop.shopData.length / itemsPerPage);
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
          <div className="col-12">
            <ShopGridInnerProduct
              currentItems={currentItems}
              isGridView={isGridView}
            />
          </div>
          <ShopPagination
            totalPages={totalPages}
            currentPage={currentPage}
            handleNextPage={handleNextPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopMain;
