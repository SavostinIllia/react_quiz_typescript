interface FormControlsEmail {
  key: number;
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
  email: true;
  minLength?: number;
}

type FormControlsPassword = Pick<FormControlsEmail, Omit<Validation, "email">>;

interface FormControls {
  email: FormControlsEmail;
  password: FormControlsPassword;
}
