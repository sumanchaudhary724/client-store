import React from "react";
import { Header } from "../../components/layout/Header";
import { UserSignup } from "../../components/user-signup/UserSignup";

const SignUp = () => {
  return (
    <div>
      <Header />
      <mian className="main">
        <UserSignup />
      </mian>
    </div>
  );
};

export default SignUp;
