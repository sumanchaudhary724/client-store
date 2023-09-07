import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../custom-input/CustomInput";
import { toast } from "react-toastify";
import { createNewUserAction } from "../../pages/signin-signup/userAction";

export const UserSignup = () => {
  const [form, setForm] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { confirmPassword, ...rest } = form;

    if (confirmPassword !== rest.password) {
      return toast.error("Password should match");
    }
    createNewUserAction(rest);
  };

  const inputs = [
    {
      label: "First Name",
      name: "fName",
      required: true,
      type: "text",
      placeholder: "First name",
    },
    {
      label: "Last Name",
      name: "lName",
      required: true,
      type: "text",
      placeholder: "Last name",
    },
    {
      label: "Phone",
      name: "phone",
      type: "number",
      placeholder: "Phone",
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      placeholder: "Address",
    },
    {
      label: "Email",
      name: "email",
      required: true,
      type: "text",
      placeholder: "Email",
    },
    {
      label: "Password",
      name: "password",
      required: true,
      type: "password",
      placeholder: "Password",
      minLength: "6",
    },

    {
      label: "Confirm Password",
      name: "confirmPassword",
      required: true,
      type: "password",
      placeholder: "Confirm Password",
    },
  ];

  return (
    <div>
      <Form
        onSubmit={handleOnSubmit}
        style={{ width: "450px" }}
        className="m-auto border p-4 shadow-lg mt-5 rounded"
      >
        <h3>Add New User</h3>
        <hr />
        {inputs.map((itm, i) => (
          <CustomInput key={i} {...itm} onChange={handleOnChange} />
        ))}

        <div className="d-grid mt-5">
          <Button variant="dark" type="submit">
            Submit New User
          </Button>
        </div>
      </Form>
    </div>
  );
};
