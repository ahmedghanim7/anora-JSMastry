import { Post } from "@/@types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  allPosts: Post[];
  latestPosts: Post[];
  userPosts: Post[];
}

const initialState: InitialState = {
  allPosts: [],
  latestPosts: [],
  userPosts: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAllPosts: (state, action: PayloadAction<Post[]>) => {
      state.allPosts = action.payload;
    },
    setLatestPosts: (state, action: PayloadAction<Post[]>) => {
      state.latestPosts = action.payload;
    },
    setUserPosts: (state, action: PayloadAction<Post[]>) => {
      state.userPosts = action.payload;
    },
    clearPosts: (state) => {
      state = initialState;
    },
  },
});

export const { clearPosts, setAllPosts, setLatestPosts, setUserPosts } =
  userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
