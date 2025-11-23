import React, { useEffect, useRef, useState } from "react";
import UseAuth from "../hooks/UseAuth";
import { useLocation, useNavigate } from "react-router";

const EnterCode = () => {
  const { verifyResetCode } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [fullCode, setFullCode] = useState("");
  const inputsRef = Array.from({ length: 6 }).map(() => useRef(null));

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const oob = params.get("oobCode");
    if (!oob) return;
    verifyResetCode(oob)
      .then(() => navigate(`/resetPassword?oobCode=${oob}`))
      .catch(() => setError("Invalid or expired code"));
  }, [location.search]);

  const handleInput = (e, idx) => {
    const v = e.target.value.replace(/[^0-9A-Za-z]/g, "");
    e.target.value = v.slice(0, 1);
    if (v && idx < 5) inputsRef[idx + 1].current?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !e.currentTarget.value && idx > 0) {
      inputsRef[idx - 1].current?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const codeTyped = inputsRef.map((r) => r.current?.value || "").join("");
    const code = fullCode || codeTyped;
    if (!code) {
      setError("Enter the code from your email");
      return;
    }
    try {
      await verifyResetCode(code);
      navigate(`/resetPassword?oobCode=${code}`);
    } catch (err) {
      setError("Invalid or expired code");
    }
  };

  const handlePaste = (e) => {
    const text = (e.clipboardData || window.clipboardData).getData("text");
    if (!text) return;
    e.preventDefault();
    setFullCode(text.trim());
    const chars = text.trim().slice(0, 6).split("");
    inputsRef.forEach((ref, i) => {
      if (ref.current) ref.current.value = chars[i] || "";
    });
  };

  return (
    <div className="w-5/5 md:w-4/5 mx-auto border-r-0 md:border-r-2 border-[#CAEB66] py-3 pr-3 rounded-2xl">
      <p className="font-bold text-3xl mb-2">Enter Code</p>
      <p className="mb-6 text-gray-600">Enter 6 digit code that we sent in your email address</p>

      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 mb-6">
          {inputsRef.map((ref, idx) => (
            <input
              key={idx}
              ref={ref}
              className="input w-12 text-center"
              inputMode="numeric"
              maxLength={1}
              onInput={(e) => handleInput(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={idx === 0 ? handlePaste : undefined}
            />
          ))}
        </div>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button className="btn bg-[#CAEB66]">Verify Code</button>
      </form>
    </div>
  );
};

export default EnterCode;