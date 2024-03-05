import { NextPage } from "next";

const PrivatePage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold text-center mt-10">
        This is Private Page
      </h1>
    </div>
  );
};

export default PrivatePage;
