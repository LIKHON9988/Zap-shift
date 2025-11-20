import React from "react";
import logo from "../assets/Group 3.png";

import image from "../assets/authImage.png";
import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="w-11/12 md:w-10/12 mx-auto mt-14">
      <Link to={"/"}>
        <img className="mb-10 w-[90px] w-[29px]" src={logo} alt="" />
      </Link>
      <div className="flex flex-col md:flex-row  justify-between gap-4">
        <div className="flex-1 ">
          <Outlet></Outlet>
        </div>
        <div className="flex-1">
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
