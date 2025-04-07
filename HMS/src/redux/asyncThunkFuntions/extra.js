import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCountryName = createAsyncThunk("country/fetchCountryName", async (countryName,{rejectWithValue}) => {
    
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Country not found');
        }
        
        return response.json();
    })
    .then(data => {
        return data
    })
    .catch(error => {
        return rejectWithValue(error);
    });
});
