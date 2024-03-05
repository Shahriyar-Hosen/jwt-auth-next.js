import Link from "next/link";
import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const NavSkeleton: FC = () => (
  <div className="flex items-center">
    <li>
      <Link className="" href="/profile">
        <Skeleton width={100} />
      </Link>
    </li>
    <li className="ml-3">
      <Skeleton width={100} />
    </li>
  </div>
);
