import React, { useEffect, useState } from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { autoLogin, signInUserAction } from "./userAction";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  email: "",
  password: "",
};
const SignIn = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const { user } = useSelector((state) => state.userInfo);

  const pathTo = location.state?.from?.location?.pathname || "/dashboard";
  useEffect(() => {
    user?._id && navigate(pathTo);
    dispatch(autoLogin());
  }, [user, navigate, dispatch, pathTo]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUserAction(form));
  };

  return (
    <div>
      <Header />
      <main className="main pt-5">
        <Form
          onSubmit={handleOnSubmit}
          className="border p-3 shadow-lg"
          style={{ width: "450px", margin: "auto" }}
        >
          <h1 className="mb-5">
            Welcome Back
            <hr />
          </h1>

          <CustomInput
            label="Email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleOnChange}
          />
          <CustomInput
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleOnChange}
            required
          />

          <div className="d-grid mt-3">
            <Button variant="dark" type="submit">
              Sign In
            </Button>
          </div>
          <p className="mt-2 text-end">
            Forget password? <Link to="password-rest">reset </Link> now.
          </p>
        </Form>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
