import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";

export const fetchAllPAtients = createAsyncThunk(
  "patients/fetchAllPAtients",
  async (currentPage, { rejectWithValue }) => {
    try {
      const patientResponse = await axiosInstance.get(
        `/admin/getAllInfo?page=${currentPage}&limit=4&documentSize=4`
      );

      return patientResponse.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      rejectWithValue(error.data.message);
    }
  }
);

export const fetchPatientCardData = createAsyncThunk(
  "admin/getPatientCardData",
  async (get, { rejectWithValue }) => {
    try {
      const summaryResponse = await axiosInstance.get("/admin/getAgeGroup");

      return summaryResponse.data.data;
    } catch (error) {
      return rejectWithValue(error.data.message);
    }
  }
);
// delete the patient

export const deletePatient = createAsyncThunk(
  "admin/deletePatient",
  async (id, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.delete(
        `/admin/adminDeletePatientData?patient_id=${id}`
      );

      return response.data;
    } catch (error) {
      console.error("Error deleting patient:", error);
      rejectWithValue(error.data.message);
    }
  }
);

// Add Admin Api

export const addAdmin = createAsyncThunk(
  "admin/addAdmin",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.put("/admin/addAdmin", {
        email: data,
      });

      return response;
    } catch (error) {
      console.error("Error adding admin:", error);
      rejectWithValue(error.data.message);
    }
  }
);

// Delete Admin Api

export const deleteAdmin = createAsyncThunk(
  "admin/deleteAdmin",
  async (id, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.put("/admin/removeAdmin", {
        email: id,
      });

      return response.data;
    } catch (error) {
      toast.error(error);
      console.error("Error deleting admin:", error);
      rejectWithValue(error.data.message);
    }
  }
);

export const fetchAllAdmins = createAsyncThunk(
  "admin/getAllAdmins",
  async (rejectWithValue) => {
    try {
      let response = await axiosInstance.get("/admin/getAdmin");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteDoctor = createAsyncThunk(
  "admin/deleteDoctor",
  async (id, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.delete(
        `/admin/deleteDoctor?doctor_id=${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addDoctor = createAsyncThunk(
  "admin/addDoctor",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.post("/admin/addDoctor", data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAppointments = createAsyncThunk(
  "admin/getAppointments",
  async (rejectWithValues) => {
    try {
      let response = await axiosInstance.get(
        "/admin/displayAppointmentRequest"
      );
      return response.data;
    } catch (error) {
      return rejectWithValues(error.response.data.message);
    }
  }
);
