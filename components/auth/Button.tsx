import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
}

const Button = ({ children, disabled }: Props) => {
  return (
    <button
      disabled={disabled}
      className={`w-full bg-gray1 border-gray4 border rounded-sm p-2 mt-3 hover:bg-gray4 ${
        disabled && "bg-gray3 cursor-not-allowed hover:bg-gray3"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
