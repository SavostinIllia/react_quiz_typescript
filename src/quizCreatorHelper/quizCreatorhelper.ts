export function createControl(
  config: { label: string; errorMessage: string; id?: number },
  validation: { required: boolean }
) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: "",
  };
}

export function createAnswerOption(optionId: number) {
  return createControl(
    {
      label: `Answer Option ${optionId}`,
      errorMessage: "Answer Option cannot be empty",
      id: optionId,
    },
    { required: true }
  );
}

export function validate(value: string, validation = null) {
  if (!validation) {
    return true;
  }
  let isValid = true;
  if (validation) {
    isValid = value.trim() !== "" && isValid;
  }
  return isValid;
}

export function validateForm(formControls: any) {
  let isFormValid = true;
  for (let control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid;
    }
  }
  return isFormValid;
}
