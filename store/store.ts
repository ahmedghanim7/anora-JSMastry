import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import postsReducer from "./features/posts";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
