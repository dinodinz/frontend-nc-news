import { createSlice } from "@reduxjs/toolkit";

const articleListSlice = createSlice({
  name: "articleList",
  initialState: { articles: [] },
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    clearArticles: (state) => {
      state.articles = [];
    },
  },
});

export const { setArticles, clearArticles } = articleListSlice.actions;

export default articleListSlice.reducer;
