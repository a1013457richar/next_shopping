"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button:React.FC<ButtonProps> =({ type, children, onClick, disabled }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={pending}
      className={`bg-gray-700 text-white py-1 px-3 shadow rounded-md ${
        disabled || pending ? "opacity-50" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;

