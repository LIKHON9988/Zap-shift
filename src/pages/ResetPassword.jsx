import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import UseAuth from "../hooks/UseAuth";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { confirmReset } = UseAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const params = new URLSearchParams(location.search);
  const oobCode = params.get("oobCode") || "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");
    if (!oobCode) {
      setError("Missing verification code");
      return;
    }
    try {
      await confirmReset(oobCode, data.password);
      setSuccess("Password has been reset");
      navigate("/logIn");
    } catch (err) {
      setError("Could not reset password. Try again.");
    }
  };

  return (
    <div className="w-5/5 md:w-4/5 mx-auto border-r-0 md:border-r-2 border-[#CAEB66] py-3 pr-3 rounded-2xl">
      <p className="font-bold text-3xl mb-2">Reset Password</p>
      <p className="mb-6 text-gray-600">Reset your password</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <label className="label">New Password</label>
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
            <p role="alert" className="text-red-500">Password required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p role="alert" className="text-red-500">input must be at least 6 characters</p>
          )}
          {errors.password?.type === "pattern" && (
            <p role="alert" className="text-red-500">Password must be ≥6 characters, include uppercase, lowercase, number, and special character.</p>
          )}

          <label className="label">Confirm Password</label>
          <input
            type="password"
            {...register("confirm", {
              required: true,
              validate: (v) => v === watch("password"),
            })}
            className="input w-full"
            placeholder="Password"
          />
          {errors.confirm?.type === "required" && (
            <p role="alert" className="text-red-500">Confirm your password</p>
          )}
          {errors.confirm && (
            <p role="alert" className="text-red-500">Passwords do not match</p>
          )}

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}

          <button className="btn bg-[#CAEB66] mt-4 mb-4">Reset Password</button>
        </fieldset>
      </form>
    </div>
  );
};

export default ResetPassword;