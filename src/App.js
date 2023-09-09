import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserVerification from "./pages/signin-signup/UserVerification";
import SignUp from "./pages/signin-signup/SignUp";
import { PrivateRoute } from "./components/private/PrivateRoute";
import ResetPassword from "./pages/signin-signup/ResetPassword";
import "./App.css";

function App() {
  return (
    <div className="">
      <Routes>
        {/* public routers */}

        <Route path="user-verification" element={<UserVerification />} />
        <Route path="password-rest" element={<ResetPassword />} />
        <Route path="new-user" element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
