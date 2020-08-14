import React from "react";
import AnswerItem from "./AnswerItem/AnswerItem";
import styled from "styled-components";

interface AnswersListProps {
  answers: QuizAnswers[];
  onAnswerClick(id: number): void;
  answerState: null | { [id: number]: "success" | "error" };
}

const AnswersListOptions = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const AnswersList: React.FC<AnswersListProps> = ({
  answers,
  onAnswerClick,
  answerState,
}) => {
  return (
    console.log(answerState),
    (
      <AnswersListOptions>
        {answers.map((answer) => {
          return (
            <AnswerItem
              key={answer.id}
              answerText={answer.text}
              onAnswerClick={onAnswerClick}
              answerId={answer.id}
              answerState={answerState ? answerState[answer.id] : null}
            />
          );
        })}
      </AnswersListOptions>
    )
  );
};
export default AnswersList;
