import React from "react";
import { Header } from "../../components/layout/Header";
import { UserSignup } from "../../components/user-signup/UserSignup";

const SignUp = () => {
  return (
    <div>
      <Header />
      <main className="main">
        <UserSignup />
      </main>
    </div>
  );
};

export default SignUp;
