import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./slices/userLoginSlice";

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
  },
});

export default store;
