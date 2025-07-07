// shopSlice.ts
import { shopData } from "../../data/Data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { createSelector } from "reselect";
import { ShopItem } from "../../types";

interface ShopState {
  isGridView: boolean;
  itemsPerPage: number;
  sorting: string;
  currentPage: number;
  shopData: ShopItem[];
}

const initialState: ShopState = {
  isGridView: true,
  itemsPerPage: 12,
  sorting: "menu_order",
  currentPage: 1,
  shopData: shopData,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setView: (state) => {
      state.isGridView = !state.isGridView;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
    setSorting: (state, action: PayloadAction<string>) => {
      state.sorting = action.payload;
      state.currentPage = 1;
    },
    nextPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setShopData: (state, action: PayloadAction<ShopItem[]>) => {
      state.shopData = action.payload;
    },
  },
});

export const { setView, setItemsPerPage, setSorting, nextPage, setShopData } =
  shopSlice.actions;

// New selector to get the filtered shop data based on the current state
export const selectShopState = (state: RootState) => state.shop;

export const selectFilteredShopData = createSelector(
  [selectShopState],
  (shop) => {
    const { sorting, itemsPerPage, currentPage, shopData } = shop;

    const sortedShopData = [...shopData].sort((a, b) => {
      switch (sorting) {
        case "popularity":
          // Placeholder logic for popularity
          return b.popularity - a.popularity;
        case "rating":
          // Placeholder logic for rating
          return b.rating - a.rating;
        case "price":
          // Placeholder logic for price: low to high
          return a.price - b.price;
        case "price-desc":
          // Placeholder logic for price: high to low
          return b.price - a.price;
        default:
          // Default sorting (menu_order or any other sorting option)
          // Add your logic here if needed
          break;
      }
      // Return 0 for no change in order if none of the cases match
      return 0;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return sortedShopData.slice(startIndex, endIndex);
  }
);

export default shopSlice.reducer;
