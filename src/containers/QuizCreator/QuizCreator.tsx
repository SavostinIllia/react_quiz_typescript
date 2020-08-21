import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/UI/Button";
import {
  createControl,
  createAnswerOption,
  validate,
  validateForm,
} from "../../quizCreatorHelper/quizCreatorhelper";
import Input from "../../components/UI/Input";
import Select from "../../components/UI/Select";

interface QuizArray {
  question: string;
  id: number;
  rightAnswer: number;
  answers: { text: string; id: number | undefined }[];
}
const QuizCreatorSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(90deg, #5d26c1, #a17fe0, #59c173);
  padding-top: 30px;
  flex-direction: row;
  justify-content: center;
`;
const QuizCreatorContainer = styled.div``;
const QuizCreatorTitle = styled.h1`
  flex: 0 0 100%;
  text-align: center;
  padding-bottom: 30px;
  font-size: 45px;
  color: var(--whiteTextColor);
  font-weight: 600;
`;
const QuizCreatorForm = styled.form`
  display: flex;
  border: 1.5px solid var(--whiteTextColor);
  padding: 20px;
  border-radius: 7px;
  max-width: 800px;
  flex-wrap: wrap;
`;

function createFormFormControls() {
  return {
    question: createControl(
      { label: "Enter the question", errorMessage: "Question cannot be empty" },
      { required: true }
    ),
    option1: createAnswerOption(1),
    option2: createAnswerOption(2),
    option3: createAnswerOption(3),
    option4: createAnswerOption(4),
  };
}

const initialState = {
  isFormValid: false,
  formControls: createFormFormControls(),
};

const QuizCreator: React.FC = () => {
  const [quizState, setQuizState] = useState(initialState);
  const [rightAnswerId, setRightAnswerId] = useState<number>(1);
  const [quizArray, setQuizArray] = useState<QuizArray[]>([]);
  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SUBMITED :>> ");
  };

  const onAddQuestionHandler = (e: MouseEvent) => {
    e.preventDefault();
    const quiz: any = [...quizArray];
    const index = quiz.length + 1;

    const {
      question,
      option1,
      option2,
      option3,
      option4,
    } = quizState.formControls;

    const questionItem: QuizArray = {
      question: question.value,
      id: index,
      rightAnswer: rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };

    quiz.push(questionItem);

    setQuizArray(quiz);
    setRightAnswerId(1);
    setQuizState((prevState) => {
      return {
        ...prevState,
        formControls: createFormFormControls(),
        isFormValid: false,
      };
    });
  };

  const onCreateQuizHandler = (e: MouseEvent) => {
    e.preventDefault();
    console.log("quizArray : >>", quizArray);
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    controlName: string
  ) => {
    const formControls = { ...quizState.formControls };
    //@ts-ignore
    const control = { ...formControls[controlName] };
    control.touched = true;
    control.value = e.target.value;
    control.valid = validate(control.value, control.validation.required);
    //@ts-ignore
    formControls[controlName] = control;

    quizState.formControls = formControls;

    setQuizState((prevState) => {
      return {
        ...prevState,
        formControls,
        isFormValid: validateForm(formControls),
      };
    });
  };

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rightAnswerId = +e.target.value;
    setRightAnswerId(rightAnswerId);
  };
  const renderControls = () => {
    return Object.keys(quizState.formControls).map(
      (controlName: string, index: number) => {
        //@ts-ignore
        const control = quizState.formControls[controlName];
        // console.log("control.validation :>> ", control.validation);
        return (
          <Input
            key={index}
            label={control.label}
            errorMessage={control.errorMessage}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            value={control.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChangeHandler(e, controlName)
            }
            type="text"
          />
        );
      }
    );
  };
  // console.log("object :>> ", quizState);
  const selectComponent: JSX.Element = (
    <Select
      label="Choose correct answer ID"
      value={rightAnswerId}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => selectHandler(e)}
      options={[
        { text: 1, value: 1 },
        { text: 2, value: 2 },
        { text: 3, value: 3 },
        { text: 4, value: 4 },
      ]}
    />
  );

  return (
    <QuizCreatorSection>
      <QuizCreatorContainer>
        <QuizCreatorTitle>Quiz Creator</QuizCreatorTitle>
        <QuizCreatorForm onSubmit={(e: React.FormEvent) => onSubmitHandler(e)}>
          {renderControls()}
          {selectComponent}
          <Button
            buttonClass="primary"
            text="Add question"
            disabled={!quizState.isFormValid}
            onClick={(e: MouseEvent) => onAddQuestionHandler(e)}
            type="primary"
          />
          <Button
            buttonClass="primary"
            text="Create Quiz"
            disabled={quizArray.length === 0}
            onClick={(e: MouseEvent) => onCreateQuizHandler(e)}
            type="primary"
          />
          {!quizArray.length ? null : (
            <span>quiz contains {quizArray.length} items</span>
          )}
        </QuizCreatorForm>
      </QuizCreatorContainer>
    </QuizCreatorSection>
  );
};
export default QuizCreator;
