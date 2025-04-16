import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios.js";

export const getDoctorAppointmentsList = createAsyncThunk(
  "doctor/Appointment",
  async (id, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.get(`/doctor/displayAppointments`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateDoctorProfile = createAsyncThunk(
  "doctor/updateDoctor",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);

      let response = await axiosInstance.put("/doctor/updateDoctor", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addPrescription = createAsyncThunk(
  "doctor/addPrescription",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.post("/doctor/addPrescription", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
