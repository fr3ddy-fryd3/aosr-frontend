import { ReactNode } from "react";

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
  variant?: 'primary' | 'danger' | 'modal' | 'disabled';
  isDisabled?: boolean;
}

export function Button({ onClick, children, variant = 'primary', isDisabled }: ButtonProps) {
  variant = isDisabled ? 'disabled' : variant;
  const baseStyles = 'w-fit h-10 px-8 py-2 rounded-md font-medium transition';
  const variantStyles = {
    primary: 'text-gray-700 border border-gray-700 hover:text-white hover:bg-gray-700',
    danger: 'text-red-400 bg-white border border-red-400 hover:text-white hover:bg-red-400 w-full',
    modal: 'text-gray-700 border border-gray-700 w-full hover:text-white hover:bg-gray-700',
    disabled: 'text-gray-400 border border-gray-400 bg-gray-100 w-full'
  };

  return (
    <button disabled={isDisabled} className={`${baseStyles} ${variantStyles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}
