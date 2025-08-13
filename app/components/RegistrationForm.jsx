"use client";

import { useState, useEffect } from "react";
import { addRegistration } from "../action";
import Confetti from "react-confetti";

export const RegistrationForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });


  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitError(""); // Clear previous error

    const formData = new FormData(e.target);
    const email = formData.get("email");

    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }

    setIsPending(true);
    const res = await addRegistration(formData);

    if (res.successMessage) {
      setSubmitSuccess(res.successMessage);
    } else {
      setSubmitError(res.errorMessage);
    }

    setIsPending(false);
  };

  return (
    <>

      {submitSuccess && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}

      {submitSuccess && (
         <div className="w-[90%] max-w-[370px] mx-auto px-8 py-6 space-y-4 rounded-lg text-white bg-[#ff8360] ring-2 ring-green-500 font-mono text-center">
          {submitSuccess}
        </div>
      )}
      {submitError && (
        <div className="w-[90%] max-w-[370px] mx-auto px-8 py-6 space-y-4 rounded-lg text-white bg-[#a59072]/80 ring-2 ring-red-500 font-mono text-center">
          {submitError}
        </div>
      )}
      {!submitSuccess && !submitError && (
        <form
          className="w-[90%] max-w-[370px] mx-auto px-8 py-6 space-y-4 rounded-lg text-white bg-[#ff8360] font-mono"
          onSubmit={handleRegister}
        >
          <h2 className="text-center text-2xl font-semibold">
            Join our waiting list Now!
          </h2>

          <div className="flex flex-col">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="first name"
              className="input focus:outline-none w-full bg-white/90 text-[#5b371a] font-semibold"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="last name"
              className="input focus:outline-none w-full bg-white/90 text-[#5b371a] font-semibold"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="phone"
              className="input focus:outline-none w-full bg-white/90 text-[#5b371a] font-semibold"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              className="input focus:outline-none w-full bg-white/90 text-[#5b371a] font-semibold"
              required
            />
          </div>

          <div>
            <button
              className="btn btn-lg w-full mt-3 bg-[#60b8e8] text-white"
              disabled={isPending}
            >
              {isPending ? "Processing..." : "Register"}
            </button>
          </div>
        </form>
      )}
    </>
  );
};
