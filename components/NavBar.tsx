"use client";

import axios from "axios";
import Link from "next/link";
import { FC } from "react";

import { NavSkeleton } from "@/components";
import { useUserData } from "@/hooks";

export const NavBar: FC = () => {
  const { user, loading } = useUserData();

  const logout = async () => {
    try {
      await axios.get("/api/auth/logout");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="lg:px-16 px-4 bg-slate-900 flex flex-wrap items-center py-4 shadow-2xl shadow-slate-900">
      <div className="flex-1 flex justify-between items-center">
        <Link href="/" className="text-xl">
          Home
        </Link>
      </div>

      <label htmlFor="menu-toggle" className="pointer-cursor md:hidden block">
        <svg
          className="fill-current text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle" />

      <div
        className="hidden md:flex md:items-center md:w-auto w-full"
        id="menu"
      >
        <nav>
          <ul className="md:flex items-center justify-between text-base pt-4 md:pt-0">
            {loading ? (
              <NavSkeleton />
            ) : user ? (
              <div className="flex items-center">
                <li>
                  <Link className="" href="/profile">
                    Profile
                  </Link>
                </li>
                <li className="ml-3">
                  <button className="text-red-600" onClick={logout}>
                    Logout
                  </button>
                </li>
              </div>
            ) : (
              <div className="flex items-center">
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li className="ml-3">
                  <Link href="/register">Register</Link>
                </li>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
