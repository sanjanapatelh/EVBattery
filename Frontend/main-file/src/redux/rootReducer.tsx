// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import videoModalReducer from "./features/videoModalSlice";
import shopReducer from "./features/shopSlice";
import shopSidebarReducer from "./features/shopSidebarSlice";
import cartReducer from "./features/cartSlice";
import wishlistReducer from "./features/wishlistSlice";
import cartModalReducer from "./features/cartModalSlice";
import searchModalReducer from "./features/searchModalSlice";
import wishlistModalReducer from "./features/wishlistModalSlice";
const rootReducer = combineReducers({
  videoModal: videoModalReducer,
  shop: shopReducer,
  shopSidebar: shopSidebarReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  cartModal: cartModalReducer,
  searchModal: searchModalReducer,
  wishlistModal: wishlistModalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
