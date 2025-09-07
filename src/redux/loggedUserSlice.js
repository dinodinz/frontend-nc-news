import { createSlice } from "@reduxjs/toolkit";

const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState: { loggedUser: null },
  reducers: {
    setLoggedUser: (state, action) => {
      state.loggedUser = action.payload;
    },
    clearLoggedUser: (state) => {
      state.loggedUser = null;
    },
  },
});

export const { setLoggedUser, clearLoggedUser } = loggedUserSlice.actions;
export default loggedUserSlice.reducer;
