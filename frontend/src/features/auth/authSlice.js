import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  UpdateUser,
  UpdatePassword,
} from "./authService";
import axios from "axios";

const API_URL = "api/user";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await register(user);
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

export const LoginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      return await login(user);
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

// update profile
export const UPDATE_USER_PROFILE = createAsyncThunk(
  "auth/UPDATE_USER",
  async (data, thunkAPI) => {
    const id = thunkAPI.getState().auth.user.user._id;
    // console.log(userId);
    let { input } = data;
    console.log(data);
    let { country, state, city, posterCode, address, phone, profile } = input;
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/update/${id}`,
        {
          profile,
          country,
          state,
          city,
          posterCode,
          address,
          phone,
        },

        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
          },
          // withCredentials: true,
        }
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
// update profile
export const UPDATE_USER_PASSWORD = createAsyncThunk(
  "auth/UPDATE_PASSWORD",
  async (data, thunkAPI) => {
    // const userId = thunkAPI.getState().auth.user.user._id;
    console.log(data);
    let { id, oldpassword, password1 } = data;
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/change-pass/${id}`,
        {
          oldpassword,
          password1,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
          },
          // withCredentials: true,
        }
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

export const LogoutUser = createAsyncThunk("auth/logout", async () => {
  return await logout();
});

const initialState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};
export const authSlice = createSlice({
  name: "auth",
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
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })

      // login user
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })

      .addCase(UPDATE_USER_PROFILE.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UPDATE_USER_PROFILE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(UPDATE_USER_PROFILE.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;

        state.message = action.payload;
      })

      .addCase(UPDATE_USER_PASSWORD.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UPDATE_USER_PASSWORD.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "password successully changed";
      })
      .addCase(UPDATE_USER_PASSWORD.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      // upadate user
      .addCase(LogoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = null;
      });
  },
});

// login user

export const { reset } = authSlice.actions;
export default authSlice.reducer;
