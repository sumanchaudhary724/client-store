import React, { useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignIn from "./pages/signin-signup/SignIn";
import SignUp from "./pages/signin-signup/SignUp";
import UserVerification from "./pages/signin-signup/UserVerification";
import { PrivateRoute } from "./components/private/PrivateRoute";
import ResetPassword from "./pages/signin-signup/ResetPassword";
import "./App.css";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { ProductPage } from "./pages/product/productPage";
import { useDispatch } from "react-redux";
import { getCatagoriesAction } from "./pages/category/categoryAction";
import { getProductsAction } from "./pages/product/productAction";
import { ProductListing } from "./pages/product/productListing";
import { AutoRedirect } from "./components/AutoRedirect/autoRedirect";
import { Home } from "./pages/Home/Home";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCatagoriesAction());
    dispatch(getProductsAction());
  }, []);

  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
            <AutoRedirect>
              <Home />
            </AutoRedirect>
          }
        />
        {/* public routers */}
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path={"products/:slug/"}
          element={
            <AutoRedirect>
              <ProductPage />
            </AutoRedirect>
          }
        />
        <Route
          path={"items/:slug/:_id"}
          element={
            <AutoRedirect>
              <ProductListing />
            </AutoRedirect>
          }
        />
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
