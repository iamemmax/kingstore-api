import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProduct, getProductDetails, TopSelling } from "./productService";

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
export const fetchTopSelling = createAsyncThunk(
  "product/top selling",
  async (thunkAPI) => {
    try {
      return await TopSelling();
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
  topSelling: null,
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
      })
      // top selling
      .addCase(fetchTopSelling.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTopSelling.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.topSelling = action.payload;
      })
      .addCase(fetchTopSelling.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        (state.topSelling = null)((state.message = action.payload));
      });
  },
});

export default fetchProductSlice.reducer;
