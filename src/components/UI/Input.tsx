import React from "react";
import styled from "styled-components";
import classNames from "classnames";
interface InputProps {
  label: string;
  errorMessage: string;
  value: string | number;
  type: string;
  valid: boolean;
  touched: boolean;
  shouldValidate: boolean;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  logInError?: string;
  placeholder?: string;
}

function isValid(
  valid: boolean,
  touched: boolean,
  shouldValidate: boolean
): boolean {
  return !valid && shouldValidate && touched;
}

// STYLES

const InputComponent = styled.div`
  flex: 0 0 100%;
  padding-bottom: 30px;
`;
const InputLabel = styled.label`
  display: block;
  font-size: 25px;
  color: var(--whiteTextColor);
  padding-bottom: 15px;
  transition: var(--transitionDelay);
  &.errorLabel {
    color: #ff6b6b;
    transition: var(--transitionDelay);
  }
`;
const FormInput = styled.input<{ touched?: boolean }>`
  display: block;
  width: calc(100% - 30px);

  color: var(--whiteTextColor);
  padding: 7px 15px;
  background: transparent;
  font-size: 20px;
  border: 1.5px solid var(--whiteTextColor);
  border-radius: 5px;
  transition: var(--transitionDelay);
  &.errorInput {
    border: 1.5px solid #ff6b6b;
    color: #ff6b6b;
    transition: var(--transitionDelay);
  }
`;
const InputErrorMessage = styled.span`
  font-size: 25px;
  color: #ff6b6b;
  display: block;
  padding: 15px 0 0 0;
`;
const Input: React.FC<InputProps> = ({
  label,
  errorMessage,
  value,
  type,
  valid,
  touched,
  shouldValidate,
  onChange,
  logInError,
  placeholder,
}) => {
  const htmlFor = `${type}-${Math.random()}`;

  const LabelErrorClassName = classNames({
    errorLabel: isValid(valid, touched, shouldValidate),
  });
  const InputErrorClass = classNames({
    errorInput: isValid(valid, touched, shouldValidate),
  });

  return (
    <InputComponent>
      <InputLabel className={LabelErrorClassName} htmlFor={htmlFor}>
        {label}
      </InputLabel>
      <FormInput
        className={InputErrorClass}
        type={type}
        id={htmlFor}
        value={value}
        onChange={onChange}
        touched={touched}
        placeholder={placeholder}
      ></FormInput>
      {isValid(valid, touched, shouldValidate) ? (
        <InputErrorMessage>{errorMessage}</InputErrorMessage>
      ) : logInError ? (
        <InputErrorMessage>{logInError}</InputErrorMessage>
      ) : null}
    </InputComponent>
  );
};
export default Input;
