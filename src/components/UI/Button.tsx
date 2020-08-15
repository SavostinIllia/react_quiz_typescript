import React from "react";
import classNames from "classnames";
import styled from "styled-components";

interface ButtonProps {
  buttonClass: "primary" | "success" | "error";
  onClick?(): void;
  disabled?: boolean;
  text: string;
}

const ButtonStyles = styled.button`
  color: var(--whiteTextColor);
  font-size: 20px;
  border: 1.5px solid var(--whiteTextColor);
  border-radius: 5px;
  background: transparent;
  padding: 5px 10px;
  transition: 0.3s ease-in-out;
  margin-right: 15px;
  &:hover,
  &:focus {
    box-shadow: inset -7px -7px 6px -5px rgba(0, 0, 0, 0.75);
    transition: 0.3s ease-in-out;
  }

  &.primary {
    background: #2980b9;
  }
  &.success {
    background: #2ecc71;
    color: #000;
  }
  &.error {
    background: #ff6b6b;
  }
`;

const Button: React.FC<ButtonProps> = ({
  disabled,
  buttonClass,
  onClick,
  text,
}) => {
  const buttonClasses = classNames({
    primary: buttonClass === "primary",
    success: buttonClass === "success",
    error: buttonClass === "error",
  });

  return (
    <ButtonStyles
      disabled={disabled}
      onClick={onClick}
      className={buttonClasses}
    >
      {text}
    </ButtonStyles>
  );
};

export default Button;
