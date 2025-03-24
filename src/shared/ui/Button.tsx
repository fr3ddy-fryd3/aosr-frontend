import { ReactNode } from "react";

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
  variant?: 'primary' | 'danger';
}

export default function Button({ onClick, children, variant = 'primary' }: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-md text-white font-medium transition';
  const variantStyles = {
    primary: 'text-gray-700 border-gray-700 bg-white hover:text-white hover:bg-gray-700',
    danger: 'bg-red-400 hover:bg-red-500',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}
