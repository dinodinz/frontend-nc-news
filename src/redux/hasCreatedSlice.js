import { createSlice } from "@reduxjs/toolkit";

const hasCreatedSlice = createSlice({
  name: "hasCreated",
  initialState: {
    hasCreated: false,
  },
  reducers: {
    setHasCreated: (state, action) => {
      state.hasCreated = action.payload;
    },
    toggleHasCreated: (state) => {
      state.hasCreated = !state.hasCreated;
    },
  },
});

export const { setHasCreated, toggleHasCreated } = hasCreatedSlice.actions;

export default hasCreatedSlice.reducer;
