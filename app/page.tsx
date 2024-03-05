import { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-5">
      <h1 className="text-5xl font-bold text-center mt-10 max-w-5xl">
        Next JS complete custom authentication system using jwt.
      </h1>
      <Link href="/private">
        <button className="bg-green-700 p-2 px-5 rounded-md font-bold">
          Private Page
        </button>
      </Link>
    </div>
  );
};

export default Home;
