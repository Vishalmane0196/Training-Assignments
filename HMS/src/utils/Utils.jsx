// import React from "react";
// import { fetchCountryName } from "../../redux/asyncThunkFuntions/extra";
// import { useCallback } from "react";

// const validateCountry = useCallback(
//   _.debounce(async (value) => {
//     try {
//       const response = await dispatch(fetchCountryName(value)).unwrap();

//       return Array.isArray(response) && response.length > 0
//         ? true
//         : "Invalid Country Name";
//     } catch (e) {
//       return "Invalid Country Name";
//     }
//   }, 2000),
//   []
// );

// export { validateCountry };
