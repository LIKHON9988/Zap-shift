import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../hooks/UseAuth";
import { Link } from "react-router";
import SocialLogIn from "./SocialLogIn";

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { LogInUser } = UseAuth();

  const handleLogIn = (data) => {
    console.log(data);
    LogInUser(data.email, data.password)
      .then((ressult) => {
        console.log(ressult);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-5/5  md:w-3/5 mx-auto border-r-0 md:border-r-2 border-[#CAEB66] py-3 pr-3 rounded-2xl">
      <p className="font-bold text-3xl text-center mb-3">Welcome back</p>
      <p className="text-center mb-6">Login with ZapShift</p>
      <form onSubmit={handleSubmit(handleLogIn)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p role="alert" className="text-red-500">
              Email address required
            </p>
          )}
          {errors.email?.type === "required" && (
            <p role="alert" className="text-red-500">
              Please enter a valid email address.
            </p>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            })}
            className="input w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p role="alert" className="text-red-500">
              Password required
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p role="alert" className="text-red-500">
              input must be at least 6 characters
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p role="alert" className="text-red-500">
              Password must be ≥6 characters, include uppercase, lowercase,
              number, and special character.
            </p>
          )}
          <div className="flex justify-between ">
            <a className="link link-hover">Forgot password?</a>
            <p>
              New to zap shift?{" "}
              <Link to={"/signUp"} className="underline text-[#80aa04]">
                Sign Up
              </Link>
            </p>
          </div>

          <button className="btn bg-[#CAEB66] mt-4 mb-4">Login</button>
        </fieldset>
      </form>
      <SocialLogIn></SocialLogIn>
    </div>
  );
};

export default LogIn;
