import React, { useState } from "react";
import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { PasswordOTP } from "../../components/admin-signup/PasswordOTP";
import { PasswordReset } from "../../components/admin-signup/PasswordReset";
import { requestPassOTP, resetPass } from "../../helper/axios";
import { toast } from "react-toastify";
import { Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState("otp");
  const [email, setEmail] = useState("");

  const [resp, setResp] = useState({});

  const handleOnOtpRequest = async (email) => {
    setEmail(email);
    if (!email.includes("@") && !email.includes(".")) {
      return toast.error("Invalid email");
    }
    const pending = requestPassOTP(email);
    toast.promise(pending, {
      pending: "please wait....",
    });

    const result = await pending;
    setResp(result);
    setForm("reset");
  };

  const processResetPassAPI = async (obj) => {
    const pending = resetPass({ ...obj, email });
    toast.promise(pending, {
      pending: "Please wait...",
    });

    const { status, message } = await pending;
    toast[status](message);

    status === "success" && navigate("/");
  };

  const forms = {
    otp: <PasswordOTP handleOnOtpRequest={handleOnOtpRequest} />,
    reset: (
      <PasswordReset
        setForm={setForm}
        processResetPassAPI={processResetPassAPI}
      />
    ),
  };

  return (
    <>
      <Header />
      <main className="main pt-5">
        {resp.message && (
          <Container>
            <Alert variant={resp.status === "success" ? "success" : "danger"}>
              {resp.message}
            </Alert>
          </Container>
        )}
        <div className="d-flex reset-pass">
          {/* requeset opt form */}
          {forms[form]}

          {/* rest password form  */}
        </div>
      </main>
      <Footer />;
    </>
  );
};

export default ResetPassword;
