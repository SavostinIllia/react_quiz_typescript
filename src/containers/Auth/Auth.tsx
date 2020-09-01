import React, { useState, useEffect } from "react";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import styled from "styled-components";
import { useAuthContext } from "../../context/authcontext/Authcontext";
import RegistartionPopup from "../../components/UI/RegistartionPopup";
const is = require("is_js");

// STYLES
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
  flex-direction: row;
`;
const AuthError = styled.p`
  display: block;
  margin: 0 auto;
  font-size: 30px;
  font-weight: 600;
  color: #ff6b6b;
`;
// END STYLES

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
  const {
    LoggingHandler,
    isLoading,
    validEmail,
    resetEmailValid,
    RegisterHandler,
    registerSuccess,
  } = useAuthContext();

  const [formControls, setFormControls] = useState<FormControls>(initialState);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const logInHandler = (e: MouseEvent) => {
    e.preventDefault();
    const formAuth: FormControls = JSON.parse(JSON.stringify(formControls));
    LoggingHandler(
      formAuth.formControls.email.value,
      formAuth.formControls.password.value,
      true
    );
  };

  const registerHandler = (e: MouseEvent) => {
    e.preventDefault();
    const formAuth: FormControls = JSON.parse(JSON.stringify(formControls));
    RegisterHandler(
      formAuth.formControls.email.value,
      formAuth.formControls.password.value,
      true
    );
  };

  const onsubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("SUBMITED");
  };

  useEffect(() => {
    setFormControls(initialState);
  }, [registerSuccess]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    controlName: string
  ) => {
    resetEmailValid();
    const formState: FormControls = JSON.parse(JSON.stringify(formControls));
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
    setFormControls((prev) => {
      return {
        ...prev,
        ...formState,
      };
    });
  };

  const validateControl = (value: string, validation: Validation): boolean => {
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

  const renderInputs = (): JSX.Element[] => {
    const formControlsRender: FormControls = JSON.parse(
      JSON.stringify(formControls)
    );
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
          {validEmail ? <AuthError>Invalid password or email</AuthError> : null}
          {renderInputs()}
          {registerSuccess ? (
            <RegistartionPopup popupText="Registarion Successfull" />
          ) : null}
          <Button
            buttonClass="success"
            text="Log In"
            onClick={(e: MouseEvent) => logInHandler(e)}
            disabled={!isFormValid}
            isLoading={isLoading}
          />
          <Button
            buttonClass="primary"
            text="Register"
            onClick={(e: MouseEvent) => registerHandler(e)}
            disabled={!isFormValid}
            isLoading={isLoading}
          />
        </AuthForm>
      </AuthContainer>
    </AuthSection>
  );
};

export default App;
