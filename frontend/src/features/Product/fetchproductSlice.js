import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProduct } from "./productService";

export const fetchProducts = createAsyncThunk(
  "product/fetch",
  async (thunkAPI) => {
    try {
      return await getProduct();
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
  isSuccess: false,
  products: null,
  message: "",
  isError: false,
};

const fetchProductSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        (state.products = null)((state.message = action.payload));
      });
  },
});

export default fetchProductSlice.reducer;
