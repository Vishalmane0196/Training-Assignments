import {  createSlice } from "@reduxjs/toolkit";
import { fetchPatientsInfo } from "../../asyncThunkFuntions/user";
import {fetchAllPAtients} from "../../asyncThunkFuntions/admin";
import { fetchPatientCardData } from "../../asyncThunkFuntions/admin";

const initialState = {
  loading: false,
  error: null,
  details:[],
  totalPages: 0,
  itemsPerPage : 4,
  patientList: [],
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPatientsInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPatientsInfo.fulfilled, (state, action) => {
      state.loading = false;
    
      state.patientList = action.payload.data;
    });
    builder.addCase(fetchPatientsInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    // Other reducers can be added here
    builder.addCase(fetchAllPAtients.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(fetchAllPAtients.fulfilled, (state, action) => {
      state.loading = false;
      state.patientList = action.payload?.data ;
      state.totalPages = Math.ceil( parseInt(action.payload?.pagination?.totalPatients / state.itemsPerPage ));

    }).addCase(fetchAllPAtients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchPatientCardData.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(fetchPatientCardData.fulfilled,(state,action)=>{
      state.loading = false;
      state.details = action.payload;
    }).addCase(fetchPatientCardData.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.error.message;
    });

  },
});
export const { getSinglePatient } = patientSlice.actions;

export default patientSlice.reducer;
