"use client";

import axios from "axios";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { InputField, Spinner } from "@/components";

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email && !password) {
      setEmailError("Email is required");
      setPasswordError("Password is required");
      return;
    }
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    setEmailError("");

    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    setPasswordError("");

    if (email && password) {
      try {
        setLoading(true);
        await axios.post("/api/auth/login", { email, password });
        setLoading(false);
        router.push("/");
        window.location.reload();
      } catch (error: any) {
        setEmailError(error.response?.data?.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col  justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow p-4 bg-slate-800 rounded-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
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
            <span> Sign in</span> {loading && <Spinner />}
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
