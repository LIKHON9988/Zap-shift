import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import UseAuth from "../hooks/UseAuth";

const ForgotPassword = () => {
  const { requestPasswordReset } = UseAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email) {
      setError("Email address required");
      return;
    }
    try {
      await requestPasswordReset(email);
      setSuccess("Reset link sent to your email");
      navigate("/enterCode");
    } catch (err) {
      setError("Could not send reset email");
    }
  };

  return (
    <div className="w-5/5 md:w-4/5 mx-auto border-r-0 md:border-r-2 border-[#CAEB66] py-3 pr-3 rounded-2xl">
      <p className="font-bold text-3xl mb-2">Forgot Password</p>
      <p className="mb-6 text-gray-600">Enter your email address and we'll send you a reset link.</p>

      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            className="input w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}

          <button className="btn bg-[#CAEB66] mt-4 mb-4">Send</button>
        </fieldset>
      </form>

      <p className="text-sm">Remember your password? <Link to="/logIn" className="underline text-[#80aa04]">Login</Link></p>
    </div>
  );
};

export default ForgotPassword;