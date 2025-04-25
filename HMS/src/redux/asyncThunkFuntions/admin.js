import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";

export const fetchAllPAtients = createAsyncThunk(
  "patients/fetchAllPAtients",
  async (currentPage, { rejectWithValue }) => {
    try {
      const patientResponse = await axiosInstance.get(
        `/admin/getAllInfo?page=${currentPage}&limit=8`
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
      let response = await axiosInstance.post("/admin/addAdmin", data);

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
export const getAllAdminEmails = createAsyncThunk(
  "admin/getAllAdminEmails",
  async (rejectWithValue) => {
    try {
      let response = await axiosInstance.get("/admin/getEmailsForAdmin");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getAllDoctorEmails = createAsyncThunk(
  "admin/getAllDoctorEmails",
  async (rejectWithValue) => {
    try {
      let response = await axiosInstance.get("/admin/getEmailsForDoctor");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
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
      let response = await axiosInstance.post(`/admin/addDoctor`, {
        specialization: data.specialization,
        doctorInTime: data.doctorInTime,
        doctorOutTime: data.doctorOutTime,
        email: data.email,

        contact_number: data.contact_number,
        user_password: data.user_password,
        first_name: data.first_name,
        last_name: data.last_name,
      });

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
      let response = await axiosInstance.get("/admin/appointments");
      return response.data;
    } catch (error) {
      return rejectWithValues(error.response.data.message);
    }
  }
);

export const changeAppointmentStatus = createAsyncThunk(
  "admin/changeStatus",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);

      let response = await axiosInstance.put(
        `/admin/changeStatus?status=${data.status}&appointment_id=${data.id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const changeAppointmentStatusToCancel = createAsyncThunk(
  "admin/changeStatusToCancel",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.put(
        `/admin/cancelledAppointment?appointment_id=${data.id}`,
        { reason: data.reason }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
