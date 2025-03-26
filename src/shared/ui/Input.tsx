import { ChangeEvent } from "react";

type InputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export default function Input({ value, onChange, placeholder }: InputProps) {
  return (
    <input
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
