import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ value, label, onChange, name, type, placeholder }: Props) => {
  return (
    <>
      <label className={"hidden"} htmlFor={label}>
        {label}
      </label>
      <input
        className={"w-full mb-3 p-2 px-4 border-gray4 border rounded-sm mt-1"}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
