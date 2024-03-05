import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ProfileSkeleton: FC = () => (
  <div className="max-w-lg mx-auto my-10 bg-slate-200 rounded-lg shadow-md p-5">
    <h2 className="text-center text-2xl font-semibold mt-3">
      <Skeleton width={200} />
    </h2>
    <p className="text-center text-gray-600 mt-1">
      <Skeleton width={100} />
    </p>

    <div className="mt-5">
      <h3 className="text-xl font-semibold">
        <Skeleton width={100} />
      </h3>
      <p className="text-gray-600 mt-2">
        <Skeleton width="100%" height={100} />
      </p>
    </div>
  </div>
);
