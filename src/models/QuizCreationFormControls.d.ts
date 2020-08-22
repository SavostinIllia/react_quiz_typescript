interface Control {
  errorMessage: string;
  id?: number;
  label: string;
  touched: boolean;
  valid: boolean;
  validation: { required: boolean };
  value: string;
}
