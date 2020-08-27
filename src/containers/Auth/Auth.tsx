import React, { useState } from "react";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import styled from "styled-components";
import axios from "axios";

const is = require("is_js");

const AuthSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  min-height: 100vh;
  background: linear-gradient(83deg, #0b183c, #067b87 48%, #0f7);
  padding-top: 150px;
  flex-direction: row;
  justify-content: center;
`;
const AuthContainer = styled.div``;
const AuthTitle = styled.h1`
  flex: 0 0 100%;
  text-align: center;
  padding-bottom: 30px;
  font-size: 45px;
  color: var(--whiteTextColor);
  font-weight: 600;
`;
const AuthForm = styled.form`
  border: 1.5px solid var(--whiteTextColor);
  border-radius: 10px;
  padding: 40px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: row;
`;

const initialState: FormControls = {
  formControls: {
    email: {
      value: "",
      type: "email",
      label: "Email",
      errorMessage: "Enter valid email",
      valid: false,
      touched: false,
      logInRegisterError: "",
      validation: {
        required: true,
        email: true,
      },
    },
    password: {
      value: "",
      type: "password",
      label: "Password",
      errorMessage: "Enter valid password",
      valid: false,
      logInRegisterError: "",
      touched: false,
      validation: {
        required: true,
        minLength: 6,
      },
    },
  },
};

const App: React.FC = () => {
  const [formControls, setFormControls] = useState<FormControls>(initialState);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState<boolean>(false);
  const [invalidData, setInvalidData] = useState<boolean>(true);

  const logInHandler = async (e: MouseEvent) => {
    e.preventDefault();
    const formAuth = JSON.parse(JSON.stringify(formControls));
    //@ts-ignore
    const authData = {
      email: formAuth.formControls.email.value,
      password: formAuth.formControls.password.value,
      returnSecureToken: true,
    };
    try {
      setIsRegisterLoading(true);
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBxQlrYg-i-k_7IFNSWK_xHTT0v5tNhOg`,
        authData
      );
      setIsRegisterLoading(false);
    } catch (err) {
      setIsRegisterLoading(false);
      setInvalidData(false);
      setFormControls(initialState);
    }
  };

  const registerHandler = async (e: MouseEvent) => {
    e.preventDefault();
    const formControls = { ...initialState.formControls };
    const authData = {
      email: formControls.email.value,
      password: formControls.password.value,
      returnSecureToken: true,
    };
    try {
      setIsRegisterLoading(true);
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
          AIzaSyDBxQlrYg-i-k_7IFNSWK_xHTT0v5tNhOg`,
        authData
      );
      setIsRegisterLoading(false);
    } catch (err) {
      setIsRegisterLoading(false);
    }
  };

  const onsubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("SUBMITED");
  };

  const validateControl = (value: string, validation: Validation) => {
    let isValid = true;

    if (!validation) return true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    return isValid;
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    controlName: string
  ) => {
    const formState = JSON.parse(JSON.stringify(formControls));

    //@ts-ignore
    const control: FormControlsEmail = formState.formControls[controlName];
    control.value = e.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    let isFormValidChecked = true;
    Object.keys(formState.formControls).forEach((name) => {
      isFormValidChecked =
        //@ts-ignore
        formState.formControls[name].valid && isFormValidChecked;
    });

    setIsFormValid(isFormValidChecked);
    setInvalidData(true);
    setFormControls((prev) => {
      return {
        ...prev,
        ...formState,
      };
    });
  };

  const renderInputs = () => {
    const formControlsRender = JSON.parse(JSON.stringify(formControls));
    return Object.keys(formControlsRender.formControls).map(
      (controlName: string, index: number) => {
        //@ts-ignore
        const control = formControlsRender.formControls[controlName];
        return (
          <Input
            key={index}
            type={control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            errorMessage={control.errorMessage}
            shouldValidate={!!control.validation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChangeHandler(e, controlName)
            }
          />
        );
      }
    );
  };

  return (
    <AuthSection>
      <AuthContainer>
        <AuthTitle>Auth</AuthTitle>
        <AuthForm onSubmit={onsubmitHandler}>
          {invalidData ? null : <p>Invalid password or email</p>}
          {renderInputs()}
          <Button
            buttonClass="success"
            text="Log In"
            onClick={(e: MouseEvent) => logInHandler(e)}
            disabled={!isFormValid}
            isLoading={isRegisterLoading}
          />
          <Button
            buttonClass="primary"
            text="Register"
            onClick={(e: MouseEvent) => registerHandler(e)}
            disabled={!isFormValid}
            isLoading={isRegisterLoading}
          />
        </AuthForm>
      </AuthContainer>
    </AuthSection>
  );
};

export default App;
