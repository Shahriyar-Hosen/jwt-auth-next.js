import { ChangeEvent, FC } from "react";
import { ErrorMassage } from ".";

interface InputField {
  type: string;
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: FC<InputField> = ({
  type,
  id,
  label,
  placeholder,
  value,
  error,
  onChange,
}) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium leading-6 text-gray-300"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {error && <ErrorMassage massage={error} />}
  </div>
);
