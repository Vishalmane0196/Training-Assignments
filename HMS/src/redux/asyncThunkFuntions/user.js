import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";

export const getUserInfo = createAsyncThunk(
  "user/getUser",
  async (get, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/getUser");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPatientsInfo = createAsyncThunk(
  "user/patient",
  async (get, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/patient/getPatientInfo");

      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// add personal data
export const addPersonalInfo = createAsyncThunk(
  "/patient/addPersonalInfo",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.post("/patient/addPersonalInfo", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update personal data
export const updatePersonalInfo = createAsyncThunk(
  "/user/updatePersonalInfo",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.put(
        "/patient/updatePersonalInfo",
        data
      );
   
      return response.data;
    } catch (error) {
      
      return rejectWithValue(error.response.data);
    }
  }
);

// get personal data

export const getPersonalInfo = createAsyncThunk(
  "user/getPersonalInfo",
  async (id, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.get(`/patient/getPersonalInfo/${id}`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

//  add family information

export const addFamilyInfo = createAsyncThunk(
  "user/addFamilyInfo",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.post("/patient/addFamilyInfo", data);
      toast.success("Family Information Added successfully!");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// update family information

export const updateFamilyInfo = createAsyncThunk(
  "/user/updateFamilyInfo",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.put("/patient/updateFamilyInfo", data);
      toast.success("Family Information Updated successfully!");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// get family information

export const getFamilyInfo = createAsyncThunk(
  "user/getFamilyInfo",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/patient/getFamilyInfo/${id}`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

//  add disease information

export const addDiseaseInfo = createAsyncThunk(
  "user/addDiseaseInfo",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.post("/patient/addDiseaseInfo", data);

      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

//  update disease information

export const updateDiseaseInfo = createAsyncThunk(
  "/user/updateDiseaseInfo",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.put(
        "/patient/updateDiseaseInfo",
        data
      );

      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

//  get disease information

export const getDiseaseInfo = createAsyncThunk(
  "user/getDiseaseInfo",
  async (id, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.get(`/patient/getDiseaseInfo/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// add document

export const addDocument = createAsyncThunk(
  "/patient/upload",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.post("/patient/upload", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update document

export const updateDocument = createAsyncThunk(
  "/patient/updateDocument",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.put("/patient/updateDocument", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update user Info

export const updateUserInfo = createAsyncThunk(
  "/user/updateUser",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.put("/user/updateUser", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update user password

export const updatePassword = createAsyncThunk(
  "/user/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.put("/user/resetPassword", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete Account

export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (del, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/user/deleteUser");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
