import { createSlice } from "@reduxjs/toolkit";

interface CartModalState {
  isCartModalOpen: boolean;
}

const initialState: CartModalState = {
  isCartModalOpen: false,
};

const cartModalSlice = createSlice({
  name: "cartModal",
  initialState,
  reducers: {
    toggleCartModalOpen: (state) => {
      state.isCartModalOpen = true;
    },
    toggleCartModalClose: (state) => {
      state.isCartModalOpen = false;
    },
  },
});

export const { toggleCartModalOpen, toggleCartModalClose } =
  cartModalSlice.actions;
export default cartModalSlice.reducer;
