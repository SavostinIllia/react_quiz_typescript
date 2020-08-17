import React from "react";

interface InputProps {
  label: string;
  errorMessage: string;
  value: string | number;
  onChange?(): void;
  type: string;
  valid: boolean;
  touched: boolean;
  shouldValidate: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  errorMessage,
  value,
  type,
  valid,
  touched,
  shouldValidate,
}) => {
  const htmlFor = `${type}-${Math.random()}`;
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      <input type={type} id={htmlFor} value={value}></input>
      <span>{errorMessage}</span>
    </div>
  );
};
export default Input;
