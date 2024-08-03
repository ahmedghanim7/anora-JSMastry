import { Post } from "@/@types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  allPosts: Post[];
  latestPosts: Post[];
  userPosts: Post[];
  searchedPosts: { posts: Post[]; searchedText: string };
}

const initialState: InitialState = {
  allPosts: [],
  latestPosts: [],
  userPosts: [],
  searchedPosts: {
    posts: [],
    searchedText: "",
  },
};

export const postsSlice = createSlice({
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
    searchPosts: (state) => {
      const textToSearch = state.searchedPosts.searchedText;
      if (textToSearch) {
        const data = state.allPosts.filter((post) =>
          post.title.toLowerCase().includes(textToSearch.toLowerCase())
        );
        state.searchedPosts.posts = data;
      } else {
        state.searchedPosts.posts = [];
      }
    },
    setSearchedText: (state, action: PayloadAction<string>) => {
      state.searchedPosts.searchedText = action.payload;
    },
    clearSearchValues: (state) => {
      state.searchedPosts = { posts: [], searchedText: "" };
    },
    clearPosts: (state) => {
      state = initialState;
    },
  },
});

export const {
  clearPosts,
  setAllPosts,
  setLatestPosts,
  setUserPosts,
  searchPosts,
  setSearchedText,
  clearSearchValues,
} = postsSlice.actions;

const postsReducer = postsSlice.reducer;
export default postsReducer;
