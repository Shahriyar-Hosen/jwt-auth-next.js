import { FC } from "react";

export type IErrorMassage = { massage: string };
export const ErrorMassage: FC<IErrorMassage> = ({ massage }) => (
  <p className="mt-1 text-sm text-red-500 ">{massage}</p>
);
