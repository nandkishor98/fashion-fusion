import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [{ id: "1", name: "Kurti", quantity: "1", price: "1000" }],
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Check if existing item is being added
      const itemInCart = state.cart.find((item) => item.id === action.payload);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const removedItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = removedItem;
    },
    increaseQuantity: (state, action) => {},
    decreaseQuantity: (state, action) => {},
  },
});

export const { addToCart, removeItem, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;