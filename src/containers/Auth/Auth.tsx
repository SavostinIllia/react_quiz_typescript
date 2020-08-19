import React, { useState } from "react";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import styled from "styled-components";
const is = require("is_js");

const AuthSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
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

interface FormControlsEmail {
  value: string;
  type: string;
  label: string;
  errorMessage: string;
  valid: boolean;
  touched: boolean;
  validation: Validation;
}

interface Validation {
  required: boolean;
  email?: true;
  minLength?: number;
}

interface FormControlsPassword extends FormControlsEmail {
  validation: Pick<Validation, "required" | "minLength">;
}

interface FormControls {
  email: FormControlsEmail;
  password: FormControlsPassword;
}

const initialState: FormControls = {
  email: {
    value: "",
    type: "email",
    label: "Email",
    errorMessage: "Enter valid email",
    valid: false,
    touched: false,
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
    touched: false,
    validation: {
      required: true,
      minLength: 6,
    },
  },
};

const App: React.FC = () => {
  const [formControls, setFormControls] = useState<FormControls>(initialState);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const logInHandler = (e: MouseEvent) => {
    e.preventDefault();
    console.log("LOGINED");
  };

  const registerHandler = (e: MouseEvent) => {
    e.preventDefault();
    console.log("REGISTRED");
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
    const formsControlsValidated = { ...formControls };

    const control: FormControlsEmail = {
      //@ts-ignore
      ...formsControlsValidated[controlName],
    };
    control.value = e.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);
    //@ts-ignore
    formsControlsValidated[controlName] = control;

    // console.log("control.valid :>> ", control.valid);
    let isFormValidChecked = true;

    Object.keys(formsControlsValidated).forEach((name) => {
      isFormValidChecked =
        //@ts-ignore
        formsControlsValidated[name].valid && isFormValidChecked;
    });
    setIsFormValid(isFormValidChecked);
    setFormControls(formsControlsValidated);
  };

  const renderInputs = () => {
    return Object.keys(formControls).map(
      (controlName: string, index: number) => {
        //@ts-ignore
        const control = formControls[controlName];

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
          {renderInputs()}

          <Button
            buttonClass="success"
            text="Log In"
            onClick={(e: MouseEvent) => logInHandler(e)}
            disabled={isFormValid}
          />
          <Button
            buttonClass="primary"
            text="Register"
            onClick={(e: MouseEvent) => registerHandler(e)}
            disabled={isFormValid}
          />
        </AuthForm>
      </AuthContainer>
    </AuthSection>
  );
};

export default App;
