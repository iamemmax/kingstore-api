import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  message: "",
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const check = state.cart.find((res) => res._id === action.payload._id);
      if (!check) {
        state.cart.push(action.payload);
        state.message = "product added successfully";
      } else {
        state.cart.map((res, key) => {
          if (res._id === action.payload._id) {
            res.qty = res.qty++;
            res.total = parseInt(res.qty + 1) * parseInt(res.price);
            // res.total = res.total * state.cart[key].qty;
            state.message = "product already added";
          }
        });
      }
    },
    removeCart: (state, action) => {
      state.cart = state.cart.filter((res) => res._id !== action.payload);
      // state.message = "product removed successfully";
    },
    increaseQty: (state, action) => {
      state.cart.map((res) => {
        if (res._id === action.payload._id) {
          res.qty++;
          res.total = parseInt(res.qty) * parseInt(res.price);
        }
      });
    },
    DecreaseQty: (state, action) => {
      state.cart.map((res) => {
        if (res._id === action.payload._id) {
          res.qty--;
          res.total = parseInt(res.qty) * parseInt(res.price);
        }
      });
    },

    reset: (state) => {
      state.message = "";
    },
  },
});

export const { addToCart, removeCart, increaseQty, DecreaseQty, reset } =
  cartSlice.actions;
export default cartSlice.reducer;
