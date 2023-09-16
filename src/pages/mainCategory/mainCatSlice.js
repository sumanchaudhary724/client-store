import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  category: [],
};

const catalogueSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCatalogue: (state, { payload }) => {
      state.catalogue = payload;
    },
  },
});
const { reducer, actions } = catalogueSlice;
export const { setCatalogue } = actions;
export default reducer;
