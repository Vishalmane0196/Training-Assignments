import { createSlice } from "@reduxjs/toolkit";
import { getPersonalInfo } from "../../asyncThunkFuntions/user";

const initialState = {
  step: 0,
  patientID: null,
  loading: false,
  error: null,
  count: 0,
};

const fromSlice = createSlice({
  name: "from",
  initialState,
  reducers: {
    setCount: (state, action) => ({ ...state, count: action.payload }),
    setStep: (state, action) => ({ ...state, step: action.payload }),
    setPatientID: (state, action) => ({ ...state, patientID: action.payload }),
    setError: (state, action) => ({ ...state, error: action.payload }),
  },
  extraReducers: (builder) => {
    builder.addCase(getPersonalInfo.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export const { setStep, setPatientID, setError, setCount } = fromSlice.actions;
export default fromSlice.reducer;
