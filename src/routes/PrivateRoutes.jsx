import React from "react";
import UseAuth from "../hooks/UseAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = UseAuth();

  const location = useLocation();
  console.log("location", location);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate state={location.pathname} to={"/logIn"}></Navigate>;
  }

  return children;
};

export default PrivateRoutes;
