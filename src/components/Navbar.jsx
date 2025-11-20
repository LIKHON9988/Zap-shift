import React from "react";
import { Link, NavLink } from "react-router";
import UseAuth from "../hooks/UseAuth";
import logo from "../assets/Group 3.png";

const Navbar = () => {
  const { user, logOut } = UseAuth();

  const handleLogOut = () => {
    logOut()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>
      <li>
        {" "}
        <NavLink to={"/aboutUs"}>About Us</NavLink>
      </li>
      <li className="text-[#8ebd00] font-bold">
        <NavLink to={"/beArider"}>Be a Rider</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 border-b-2 border-[#CAEB66] py-2 shadow-lg rounded-3xl mt-5 p-2 mb-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to={"/"}>
          <img className="w-[90px] w-[29px]" src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end  ">
        {user ? (
          <a
            onClick={handleLogOut}
            className="btn btn-sm bg-[#CAEB66] shadow-sm rounded-3xl"
          >
            Log Out
          </a>
        ) : (
          <div className="flex gap-3">
            {" "}
            <Link
              className="btn btn-sm bg-[#CAEB66] shadow-sm rounded-3xl"
              to={"/logIn"}
            >
              Log in
            </Link>
            <Link
              className="btn btn-sm bg-[#CAEB66] shadow-sm rounded-3xl"
              to={"/signUp"}
            >
              Sign UP
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
