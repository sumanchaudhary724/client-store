// adminSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: {},
  adminList: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, { payload }) => {
      state.admin = payload;
    },
    setAdmins: (state, { payload }) => {
      state.adminList = payload;
    },
  },
});

export const { setAdmin, setAdmins } = adminSlice.actions;

export default adminSlice.reducer;
