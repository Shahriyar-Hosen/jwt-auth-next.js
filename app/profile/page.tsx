"use client";

import { NextPage } from "next";

import { ProfileSkeleton } from "@/components";
import { useUserData } from "@/hooks";

const Profile: NextPage = () => {
  const { user, loading } = useUserData();

  return loading ? (
    <ProfileSkeleton />
  ) : (
    <div className="max-w-lg mx-auto my-10 bg-slate-800 rounded-lg shadow-md p-5">
      <h2 className="text-center text-2xl font-semibold mt-3">{user?.name}</h2>
      <p className="text-center text-gray-300 mt-1">{user?.email}</p>

      <div className="mt-5">
        <h3 className="text-xl font-semibold">Bio</h3>
        <p className="text-gray-300 mt-2">
          John is a software engineer with over 10 years of experience in
          developing web and mobile applications. He is skilled in JavaScript,
          React, and Node.js.
        </p>
      </div>
    </div>
  );
};

export default Profile;
