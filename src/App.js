import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter as Router

import SignUp from "./pages/signin-signup/SignUp";
import CustomerLayout from "./components/layout/CustomerLayout";
import { PrivateRoute } from "./components/private/PrivateRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <CustomerLayout />
        <Routes>
          <Route path="new-user" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
