// adminSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  userList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setUsers: (state, { payload }) => {
      state.userList = payload;
    },
  },
});

export const { setUser, setUsers } = userSlice.actions;

export default userSlice.reducer;
