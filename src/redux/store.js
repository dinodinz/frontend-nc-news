import { configureStore } from "@reduxjs/toolkit";
import loggedUserReducer from "./loggedUserSlice";
import articleListReducer from "./articleListSlice";
import topicReducer from "./topicSlice";
import errorReducer from "./errorSlice";
import hasCreatedReducer from "./hasCreatedSlice";

export const store = configureStore({
  reducer: {
    loggedUser: loggedUserReducer,
    articleList: articleListReducer,
    topic: topicReducer,
    error: errorReducer,
    hasCreated: hasCreatedReducer,
  },
});
