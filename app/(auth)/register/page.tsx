"use client";

import axios from "axios";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ErrorMassage, InputField, Spinner } from "@/components";

const Register: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear all previous errors
    setEmailError("");
    setPasswordError("");
    setNameError("");
    setError("");

    // Validate inputs
    if (!name) {
      setNameError("Name is required");
      return;
    }

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error: any) {
      if (
        error.response &&
        error.response?.data &&
        error.response?.data?.errors &&
        error.response?.data?.errors?.fieldErrors
      ) {
        const fieldErrors = error.response.data.errors.fieldErrors;
        if (fieldErrors.password && fieldErrors.password.length > 0) {
          setPasswordError(fieldErrors.password[0]);
          return;
        }
      }
      setError(error.response.data.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col  justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Register for an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow p-4 bg-slate-800 rounded-md">
        {error && <ErrorMassage massage={error} />}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <InputField
            type="text"
            id="name"
            label="Enter Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError}
          />
          <InputField
            type="email"
            id="email"
            label="Email Address"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
          <InputField
            type="password"
            id="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
          />

          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center items-center space-x-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span> Create an account</span> {loading && <Spinner />}
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
