import { User } from "@/@types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  $id: "",
  accountId: "",
  avatar: "",
  email: "",
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.avatar = action.payload.avatar;
      state.accountId = action.payload.accountId;
      state.$id = action.payload.$id;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state = initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
