export function createControl(
  config: { label: string; errorMessage: string; id?: number },
  validation: { required: boolean }
) {
  return {
    ...config,
    ...validation,
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
