import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientId: null,
  selectedDoctor: null,
  appointment_Id: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBookPatientId: (state, action) => {
      state.patientId = action.payload;
    },
    setBookDoctor: (state, action) => {
      state.selectedDoctor = action.payload;
    },
    setAppointmentId: (state, action) => {
      state.appointment_Id = action.payload;
    },
  },
});

export const { setBookDoctor, setBookPatientId, setAppointmentId } =
  bookSlice.actions;

export default bookSlice.reducer;
