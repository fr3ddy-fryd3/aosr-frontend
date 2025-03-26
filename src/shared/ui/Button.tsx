import { ReactNode } from "react";

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
  variant?: 'primary' | 'danger' | 'modal';
}

export default function Button({ onClick, children, variant = 'primary' }: ButtonProps) {
  const baseStyles = 'w-fit h-fit px-8 py-2 rounded-md font-medium transition';
  const variantStyles = {
    primary: 'text-gray-700 border border-gray-700 hover:text-white hover:bg-gray-700',
    danger: 'text-red-400 bg-white border border-red-400 hover:text-white hover:bg-red-400 w-full',
    modal: 'text-gray-700 border border-gray-700 w-full hover:text-white hover:bg-gray-700',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} `} onClick={onClick}>
      {children}
    </button>
  );
}
