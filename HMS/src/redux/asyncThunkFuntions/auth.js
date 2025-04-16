import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios.js";

//  login api

export const loginUser = createAsyncThunk(
  "users/login",
  async (registerData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", registerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

//  register api

export const registerUser = createAsyncThunk(
  "users/register",
  async (registerData, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.post("/user/register", registerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// forget password

export const forgetPassword = createAsyncThunk(
  "/user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.post("/user/forgotPassword", {
        email: email,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
