import React from "react";
import UseAuth from "../hooks/UseAuth";
import { Navigate } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = UseAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    <Navigate to={"/logIn"}></Navigate>;
  }

  return children;
};

export default PrivateRoutes;
