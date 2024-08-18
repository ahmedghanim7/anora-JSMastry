import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import postsReducer from "./features/posts";
import mediaViewerReducer from "./features/media-viewer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    mediaViewer: mediaViewerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
