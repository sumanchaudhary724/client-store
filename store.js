import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./pages/signin-signup/userSlice";
export default configureStore({
  reducer: {
    userInfo: userReducer,
  },
});
