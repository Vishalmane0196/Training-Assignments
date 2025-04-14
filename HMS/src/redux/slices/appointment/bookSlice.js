import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientId: null,
  selectedDoctor: null,
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
  },
});

export const { setBookDoctor, setBookPatientId } = bookSlice.actions;

export default bookSlice.reducer;
