import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../asyncThunkFuntions/auth";
import { getUserInfo } from "../../asyncThunkFuntions/user";

const initialState = {
  isLoggedIn: 0,
  token: null,
  isAdmin: 0,
  isDoctor: 0,
  loading: false,
  error: null,
  userInfo: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAdmin = 0;
      state.isDoctor = 0;
      state.userInfo = {};
      state.error = null;
      state.isLoggedIn = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.loading = false;
        state.token = action.payload.token;
        state.isAdmin = action.payload?.admin_message == 1 ? 1 : 0;
        state.isDoctor = action.payload?.doctor_message == 1 ? 1 : 0;
        state.isLoggedIn = 1;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        // state.error = action.error.response.data.message;
      });
    // --------------------------------------
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = { ...action.payload.data[0] };
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.response.data.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
