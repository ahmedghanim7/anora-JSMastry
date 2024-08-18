import { Post } from "@/@types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface MediaViewer {
  mediaType: string;
  post: Post;
}

const initialState: MediaViewer = {
  mediaType: "",
  post: {
    $id: "",
    creator: { avatar: "", username: "" },
    thumbnailUrl: "",
    title: "",
    videoUrl: "",
  },
};

export const mediaViewerSlice = createSlice({
  name: "mediaViewer",
  initialState,
  reducers: {
    setMedia: (state, action: PayloadAction<MediaViewer>) => {
      state.mediaType = action.payload.mediaType;
      state.post = action.payload.post;
    },
    clearMedia: (state) => {
      state = initialState;
    },
  },
});

export const { setMedia, clearMedia } = mediaViewerSlice.actions;

const mediaViewerReducer = mediaViewerSlice.reducer;
export default mediaViewerReducer;
