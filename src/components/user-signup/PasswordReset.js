import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../custom-input/CustomInput";
import { toast } from "react-toastify";
import { resetPass } from "../../helper/axios";

export const PasswordReset = ({ setForm, processResetPassAPI }) => {
  const [formDt, setFormDt] = useState({});
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setError("");
    if (name === "confirmPassword") {
      value !== formDt.password
        ? setError("Password should match")
        : setError("");
    }

    if (name === "password") {
      value.length < 6 && setError("At least 6 characters required");

      !/[0-9]/.test(value) && setError("At least one number is required");
      !/[A-Z]/.test(value) && setError("At least one Uppercase is required");
      !/[a-z]/.test(value) && setError("At least one Lowercase is required");
    }
    setFormDt({
      ...formDt,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = formDt;

    if (confirmPassword !== rest.password) {
      return toast.error("Password should match!");
    }
    //aA12345

    processResetPassAPI(rest);
  };
  return (
    <Form onSubmit={handleOnSubmit}>
      <h3>Reset New Password</h3>
      <hr />

      <CustomInput
        required={true}
        type="number"
        name="otp"
        onChange={handleOnChange}
        label="OTP"
        placeholder="12345"
      />
      <CustomInput
        required={true}
        type="password"
        name="password"
        onChange={handleOnChange}
        label="Password"
        placeholder="****"
      />
      <CustomInput
        required={true}
        type="password"
        name="confirmPassword"
        onChange={handleOnChange}
        label="Confirm Password"
        placeholder="****"
      />
      <div className="py-3 text-danger fw-bolder">{error}</div>
      <div className="d-grid mt-3">
        <Button variant="dark" type="submit" disabled={error}>
          Reset Password
        </Button>
      </div>

      <div className="text-end py-3">
        Didn't receive OTP{" "}
        <a onClick={() => setForm("otp")} href="#!">
          Request again.
        </a>
      </div>
    </Form>
  );
};
