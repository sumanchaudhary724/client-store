import { configureStore } from "@reduxjs/toolkit";
import systemReducer from "./system/systemSlice";
import userReducer from "./pages/signin-signup/userSlice.js";
export default configureStore({
  reducer: {
    system: systemReducer,
    userInfo: userReducer,
  },
});
