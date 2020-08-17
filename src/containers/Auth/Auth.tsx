import React, { useState } from "react";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";

interface AuthProps {}

const Auth: React.FC<AuthProps> = ({}) => {
  const [formControls, setFormControls] = useState<any>({
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
  });

  const logInHandler = (e: MouseEvent) => {
    e.preventDefault();
    console.log("e", e);
  };

  const registerHandler = (e: MouseEvent) => {
    e.preventDefault();
    console.log("e", e);
  };

  const onsubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  function renderInputs() {
    Object.keys(formControls).map(
      (controlName, index): JSX.Element => {
        const control = formControls[controlName];
        return (
          <Input
            key={controlName + index}
            type={control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            errorMessage={control.errorMessage}
            shouldValidate={!!control.validation}
          />
        );
      }
    );
  }

  return (
    console.log(formControls),
    (
      <div>
        <div>
          <h1>Auth</h1>
          <form
          // onSubmit={(e: React.FormEvent<HTMLFormElement>) => onsubmitHandler(e)}
          >
            {renderInputs()}
            <Button
              buttonClass={"success"}
              text="Log In"
              onClick={(e: MouseEvent) => logInHandler(e)}
            />
            <Button
              buttonClass={"primary"}
              text="Register"
              onClick={(e: MouseEvent) => registerHandler(e)}
            />
          </form>
        </div>
      </div>
    )
  );
};
export default Auth;

//e: React.FormEvent<HTMLFormElement>
