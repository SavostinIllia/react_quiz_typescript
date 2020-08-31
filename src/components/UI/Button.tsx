import React from "react";
import classNames from "classnames";
import styled, { css } from "styled-components";
import Loader from "./Loader";
interface ButtonProps {
  buttonClass: "primary" | "success" | "error";
  onClick?(props: any): any;
  disabled?: boolean;
  text: string;
  type?: string;
  isLoading?: boolean;
}

const ButtonComponent = styled.button<{ disabled?: boolean }>`
  color: var(--whiteTextColor);
  font-size: 20px;
  border: 1.5px solid var(--whiteTextColor);
  border-radius: 5px;
  background: transparent;
  padding: 5px 20px;
  transition: 0.3s ease-in-out;
  margin-right: 15px;
  position: relative;
  min-width: 150px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  ${({ disabled }) =>
    (disabled &&
      css`
        &:hover {
          cursor: not-allowed;
        }
      `) ||
    (!disabled &&
      css`
      &:hover
       {
        box-shadow: inset -7px -7px 6px -5px rgba(0, 0, 0, 0.75);
        transition: 0.3s ease-in-out;
      } :

    `)};

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
  isLoading,
}) => {
  const buttonClasses = classNames({
    primary: buttonClass === "primary",
    success: buttonClass === "success",
    error: buttonClass === "error",
  });

  return (
    <ButtonComponent
      disabled={disabled}
      onClick={onClick}
      className={buttonClasses}
    >
      {isLoading ? <Loader isBigLoader={false} /> : `${text}`}
    </ButtonComponent>
  );
};

export default Button;
