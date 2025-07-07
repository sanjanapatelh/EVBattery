import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { ShopItem } from "../../types";

interface CartState {
  cart: ShopItem[];
}

const initialState: CartState = {
  cart: [
    {
      id: 14,
      img: "/assets/img/rv-12-pro-1.jpg",
      name: "Organic Eyebrow Gel",
      slug: "organic-eyebrow-gel",
      price: 350,
      prevPrice: 360,
      popularity: 25,
      rating: 3.5,
      quantity: 1,
      category: "MUST HAVE",
      color: "DEEP LILAC",
    },
    {
      id: 15,
      img: "/assets/img/rv-12-pro-8.png",
      name: "Nourishing Hair Mask",
      slug: "nourishing-hair-mask",
      price: 450,
      prevPrice: 460,
      discount: true,
      popularity: 18,
      rating: 5,
      quantity: 1,
      category: "VARIABLE",
      color: "CORAL RED",
    },
    {
      id: 16,
      img: "/assets/img/rv-12-pro-3.jpg",
      name: "Pure Lip Tint 2",
      slug: "pure-lip-tint-2",
      price: 150,
      prevPrice: 180,
      discount: true,
      popularity: 9,
      rating: 4,
      quantity: 1,
      category: "LUMINOUS",
      color: "CORAL RED",
    },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ShopItem>) => {
      const existingItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        // Item already exists in the cart, update quantity
        state.cart[existingItemIndex].quantity += action.payload.quantity; // Update quantity by adding the quantity provided in the action payload
      } else {
        // Item doesn't exist in the cart, add it
        state.cart.push(action.payload);
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      // Remove item from cart by id
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const cartItem = state.cart.find((item) => item.id === id);

      if (cartItem) {
        // Ensure the quantity is greater than 1 before updating
        cartItem.quantity = Math.max(1, quantity);
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export const selectCartState = (state: RootState) => state.cart;

export default cartSlice.reducer;
