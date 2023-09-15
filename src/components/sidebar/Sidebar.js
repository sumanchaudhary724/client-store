import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillDashboard,
  AiFillCreditCard,
  AiFillProfile,
} from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { PiVan } from "react-icons/pi";
import { BsFillBoxFill } from "react-icons/bs";

export const Sidebar = () => {
  return (
    <div className="side-bar bg-dark text-light p-3">
      <p className="mt-3 text-center">User Panel</p>

      <hr />
      <nav>
        <ul className="list-unstyled sid-nav">
          <li>
            <Link className="nav-link" to="/dashboard">
              <AiFillDashboard className="fs-4" /> Dashboard
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/category">
              <BiCategoryAlt className="fs-4" /> Category
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/product">
              <BsFillBoxFill className="fs-4" /> Product
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/payment-option">
              <AiFillCreditCard className="fs-4" /> Payment Option
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/order">
              <PiVan className="fs-4" /> Order
            </Link>
          </li>

          <hr />
          <li>
            <Link className="nav-link" to="/profile">
              <AiFillProfile className="fs-4" /> Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
