import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authentication/authSlice.js";
import patientReducer from "./slices/patientdata/patientSlice.js";
import formReducer from "./slices/multistepform/formSlice.js";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from 'redux-logger';
import bookReducer from './slices/appointment/bookSlice.js'

const persistConfig = {
  key: "root",
  storage,
  // Specify the reducers you want to persist
  whitelist: ["auth", "form","book"],
  blacklist: ["patient"],

  // In this example, we persist the 'user' reducer
};
const rootReducer  = combineReducers({
  auth: authReducer,
  patient: patientReducer,
  form: formReducer,
  book:bookReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer );
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(logger),
});

let persistor = persistStore(store);

export { store, persistor };
