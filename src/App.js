import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignIn from "./pages/signin-signup/SignIn";
import SignUp from "./pages/signin-signup/SignUp";
import UserVerification from "./pages/signin-signup/UserVerification";
import { PrivateRoute } from "./components/private/PrivateRoute";
import ResetPassword from "./pages/signin-signup/ResetPassword";
import "./App.css";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { productPage } from "./pages/product/productPage";

function App() {
  return (
    <div className="">
      <Routes>
        {/* public routers */}
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path={"product/:slug/"} element={<productPage />} />
        <Route path="/" element={<SignIn />} />
        <Route path="user-verification" element={<UserVerification />} />
        <Route path="password-rest" element={<ResetPassword />} />
        <Route path="new-user" element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
