import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import Button from "../UI/Button";

interface FinishedQuizProps {
  quiz: Pick<QuizData, "question" | "id">[];
  results: null | { [id: number]: "success" | "error" };
  onRepeatHandler(): void;
}

const FinishedQuizWrapper = styled.div`
  border: 1.5px solid var(--whiteTextColor);
  width: 100%;
  padding: 40px;
  border-radius: 15px;
`;

const ListQuestionWrapper = styled.ul``;

const ListQuestionNumber = styled.strong`
  margin-right: 10px;
`;

const ListQuestion = styled.li`
  font-size: 25px;
  color: var(--whiteTextColor);
  padding-bottom: 15px;
`;

const ListIcon = styled.i`
  &.fa {
    margin-left: 20px;
    font-size: 20px;
    &.fa-times {
      color: #ff6b6b;
    }
    &.fa-check {
      color: #30de87;
    }
  }
`;

const RightAnswer = styled.p`
  color: var(--whiteTextColor);
  font-size: 20px;
  padding-bottom: 10px;
  text-decoration: underline;
  margin-bottom: 10px;
`;

const FinishedQuiz: React.FC<FinishedQuizProps> = ({
  quiz,
  results,
  onRepeatHandler,
}) => {
  const correctAnswersTotal: number = Object.keys(results!).reduce<number>(
    (total: number, key: any) => {
      if (results![key] === "success") {
        total++;
      }
      return total;
    },
    0
  );

  return (
    <FinishedQuizWrapper>
      <ListQuestionWrapper>
        {quiz.map((quizItem, index) => {
          const iconClasses = classNames({
            fa: "fa",
            "fa-times": results![quizItem.id] === "error",
            "fa-check": results![quizItem.id] === "success",
          });
          return (
            <ListQuestion key={index}>
              <ListQuestionNumber>{quizItem.id}.</ListQuestionNumber>
              {quizItem.question}
              <ListIcon className={iconClasses} />
            </ListQuestion>
          );
        })}
      </ListQuestionWrapper>
      <RightAnswer>
        Right answers {correctAnswersTotal} of {quiz.length}
      </RightAnswer>
      <Button
        buttonClass="primary"
        onClick={() => onRepeatHandler()}
        text="Repeat Quiz"
      />
    </FinishedQuizWrapper>
  );
};
export default FinishedQuiz;
