import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductDetails } from "./productService";

export const ProductDetails = createAsyncThunk(
  "product/details",
  async (product, thunkAPI) => {
    try {
      return await getProductDetails(product);
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  isLoading: false,
  single: {},
};

const singleProduct = createSlice({
  name: "fetch",
  initialState,
  reducers: {},
  reducer: () => initialState,
  extraReducers: {
    // product
    [ProductDetails.pending]: (state) => {
      state.isLoading = true;
    },
    [ProductDetails.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.single = action.payload;
    },
    [ProductDetails.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
  },
});

export const { reset } = singleProduct.actions;
export default singleProduct.reducer;
