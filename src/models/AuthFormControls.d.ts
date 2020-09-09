interface FormControlsEmail {
  value: string;
  type: string;
  label: string;
  errorMessage: string;
  valid: boolean;
  touched: boolean;
  validation: Validation;
  logInRegisterError: string;
  placeholder: string;
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
  formControls: {
    email: FormControlsEmail;
    password: FormControlsPassword;
  };
}
