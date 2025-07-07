import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { ShopItem } from "../../types";

interface WishlistState {
  wishlist: ShopItem[];
}

const initialState: WishlistState = {
  wishlist: [
    {
      id: 7,
      img: "/assets/img/rv-12-pro-7.png",
      name: "Herbal Hair Oil",
      slug: "herbal-hair-oil",
      price: 180,
      prevPrice: 220,
      discount: true,
      popularity: 18,
      rating: 3,
      quantity: 1,
      category: "MUST HAVE",
      color: "DEEP MULBERRY",
    },
    {
      id: 8,
      img: "/assets/img/rv-12-pro-6.png",
      name: "Eco-Friendly Shampoo",
      slug: "eco-friendly-shampoo",
      price: 220,
      prevPrice: 230,
      discount: true,
      popularity: 15,
      rating: 5,
      quantity: 1,
      category: "VAMP",
      color: "GRAPHITE BROWN",
    },
  ],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<ShopItem>) => {
      const existingItemIndex = state.wishlist.findIndex(
        (wishlistItem) => wishlistItem.id === action.payload.id
      );

      if (existingItemIndex === -1) {
        // Item doesn't exist in the wishlist, add it
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      // Remove item from wishlist by id
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },
    moveAllToCart: (state) => {
      // Clear wishlist
      state.wishlist = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, moveAllToCart } =
  wishlistSlice.actions;

export const selectWishlistState = (state: RootState) => state.wishlist;

export default wishlistSlice.reducer;
