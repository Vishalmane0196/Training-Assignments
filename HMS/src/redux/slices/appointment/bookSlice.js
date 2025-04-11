import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   patientId:null,
   doctorId:null,
  };

  const bookSlice = createSlice({
    name:"book",
    initialState,
    reducers:{
        setBookPatientId : (state,action)=>{
            state.patientId  = action.payload;
        }
        ,
        setBookDoctorId : (state,action)=>{
          state.doctorId  = action.payload
        }
    }
   
  })

  export const  {setBookDoctorId,setBookPatientId} = bookSlice.actions

  export default bookSlice.reducer