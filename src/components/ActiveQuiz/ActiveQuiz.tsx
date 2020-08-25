import React from "react";
// import AnswersList from "./AnwersList.tsx/AnswersList";
import styled from "styled-components";
import AnswersList from "./AnwersList.tsx/AnswersList";

interface ActiveQuizProps {
  question: string;
  answers: QuizAnswers[];
  onAnswerClick(id: number): void;
  answerNumber: number;
  answerState: null | { [id: number]: "success" | "error" };
  queistionLength: number;
}

const ActiveQuizContainer = styled.div`
  width: 100%;
  border: 1.5px solid var(--whiteTextColor);
  padding: 40px;
  border-radius: 7px;
`;

const ActiveQuizQuestionText = styled.p`
  color: var(--whiteTextColor);
  font-size: 25px;
  display: flex;
  padding-bottom: 15px;
`;

const ActiveQuizQuestionNumber = styled.strong`
  margin-right: 7px;
`;

const ActiveQuestionLength = styled.span`
  margin-left: auto;
`;

const ActiveQuiz: React.FC<ActiveQuizProps> = ({
  answers,
  question,
  onAnswerClick,
  answerNumber,
  answerState,
  queistionLength,
}) => {
  return (
    <ActiveQuizContainer>
      <ActiveQuizQuestionText>
        <ActiveQuizQuestionNumber>{answerNumber}.</ActiveQuizQuestionNumber>
        {question}
        <ActiveQuestionLength>
          {answerNumber} from {queistionLength}
        </ActiveQuestionLength>
      </ActiveQuizQuestionText>
      <AnswersList
        answers={answers}
        onAnswerClick={onAnswerClick}
        answerState={answerState}
      />
    </ActiveQuizContainer>
  );
};
export default ActiveQuiz;
