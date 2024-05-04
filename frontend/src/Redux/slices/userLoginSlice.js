import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLoginThunk = createAsyncThunk(
  "userLogin",
  async (userCred, thunkApi) => {
    const res = await axios.post("/user/login", userCred);

    if (res.data.message === "Login successful") {
      sessionStorage.setItem("token", res.data.token);
      return res.data;
    } else {
      return thunkApi.rejectWithValue(res.data.message);
    }
  }
);

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: {
    isPending: false,
    currentUser: {},
    loginStatus: false,
    errorOccured: false,
    errorMessage: "",
  },
  reducers: {
    resetState: (state) => {
      state.currentUser = {};
      state.loginStatus = false;
      state.errorMessage = "";
      state.errorOccured = false;
      state.isPending = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(userLoginThunk.pending, (state, action) => {
        state.isPending = true;
      })
      .addCase(userLoginThunk.fulfilled, (state, action) => {
        state.isPending = false;
        state.currentUser = action.payload.user;
        state.errorOccured = false;
        state.errorMessage = "";
        state.loginStatus = true;
      })
      .addCase(userLoginThunk.rejected, (state, action) => {
        state.isPending = false;
        state.currentUser = {};
        state.errorMessage = action.payload;
        state.errorOccured = true;
        state.loginStatus = false;
      }),
});

export const { resetState } = userLoginSlice.actions;
export default userLoginSlice.reducer;
