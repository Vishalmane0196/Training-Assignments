import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCountryName = createAsyncThunk(
  "country/fetchCountryName",
  async (countryName, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      if (!response.ok) {
        throw new Error("Country not found");
      }
      const data = await response.json();
      return data; // ✅ Return the data here
    } catch (error) {
      return rejectWithValue(error.message); // ❗ Only return the message or custom value
    }
  }
);
