import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Addproduct } from "./productService";

// add new product
export const addNewproduct = createAsyncThunk(
  "product/new product",
  async (products, thunkAPI) => {
    try {
      return await Addproduct(products);
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
  products: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};
// fetch products

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewproduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewproduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newProduct = action.payload;
      })
      .addCase(addNewproduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
