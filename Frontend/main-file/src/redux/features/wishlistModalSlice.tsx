import { createSlice } from "@reduxjs/toolkit";

interface WishlistModalState {
  isWishlistModalOpen: boolean;
}

const initialState: WishlistModalState = {
  isWishlistModalOpen: false,
};

const wishlistModalSlice = createSlice({
  name: "wishlistModal",
  initialState,
  reducers: {
    toggleWishlistModalOpen: (state) => {
      state.isWishlistModalOpen = true;
    },
    toggleWishlistModalClose: (state) => {
      state.isWishlistModalOpen = false;
    },
  },
});

export const { toggleWishlistModalOpen, toggleWishlistModalClose } =
  wishlistModalSlice.actions;
export default wishlistModalSlice.reducer;
