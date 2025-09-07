import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    errorPage: null,
  },
  reducers: {
    setErrorPage: (state, action) => {
      state.errorPage = action.payload;
    },

    clearErrorPage: (state) => {
      state.errorPage = null;
    },
  },
});

export const { setErrorPage, clearErrorPage } = errorSlice.actions;

export default errorSlice.reducer;
