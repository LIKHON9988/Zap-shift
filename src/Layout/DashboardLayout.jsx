import React from "react";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="space-y-6 shadow-lg rounded-2xl md:rounded-3xl p-2 md:p-7 bg-[#f8faf2]">
      <h1 className="font-bold text-3xl text-[#063F30]">Dashboard</h1>
      <Outlet></Outlet>
    </div>
  );
};

export default DashboardLayout;

