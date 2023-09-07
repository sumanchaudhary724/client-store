import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../pages/helper/axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../pages/signin-signup/userSlice";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);
  const handleOnLogout = () => {
    // log out from server by removing the access and refresh JWTs

    logoutUser(user._id);

    //clear storages
    localStorage.removeItem("refreshJWT");
    sessionStorage.removeItem("accessJWT");

    // reset store
    dispatch(setUser({}));
    navigate("/");
  };
  return (
    <div>
      <Navbar expand="md" variant="dark" className="bg-dark">
        <Container>
          <Link to="/" className="navbar-brand">
            E-Store
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user?._id ? (
                <>
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                  <Link to="#!" className="nav-link" onClick={handleOnLogout}>
                    Sign Out
                  </Link>
                </>
              ) : (
                <Link to="/" className="nav-link">
                  Sign In
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
