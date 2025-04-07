import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authentication/authSlice.js";
import patientReducer from "./slices/patientdata/patientSlice.js";
import formReducer from "./slices/multistepform/formSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  // Specify the reducers you want to persist
  whitelist: ["auth", "form"],
  blacklist: ["patient"],

  // In this example, we persist the 'user' reducer
};
const rootReducer  = combineReducers({
  auth: authReducer,
  patient: patientReducer,
  form: formReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer );
const store = configureStore({
    reducer: persistedReducer,
});

let persistor = persistStore(store);

export { store, persistor };
