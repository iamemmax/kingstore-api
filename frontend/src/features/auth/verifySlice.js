import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// @desc verify account
export const verifyUser = createAsyncThunk(
  "verify/activate",
  async (data, thunkAPI) => {
    let { id, token } = data;
    console.log(id, token);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/verify/${id}/${token}`
      );
      return response.data;
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
  isError: false,
  message: "",
  verify: null,
};
export const verifySlice = createSlice({
  name: "verify",
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

      // verify account

      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.verify = action.payload;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.verify = null;
      });
  },
});

export const { reset } = verifySlice.actions;
export default verifySlice.reducer;
