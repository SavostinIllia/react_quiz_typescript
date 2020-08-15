import React from "react";
import styled from "styled-components";
import classNames from "classnames";

interface FinishedQuizProps {
  quiz: Pick<QuizData, "question" | "id">[];
  results: null | { [id: number]: "success" | "error" };
}

const FinishedQuizWrapper = styled.div`
  border: 1.5px solid var(--whiteTextColor);
  width: 100%;
  padding: 40px;
  border-radius: 15px;
`;

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

const FinishedQuiz: React.FC<FinishedQuizProps> = ({ quiz, results }) => {
  return (
    <FinishedQuizWrapper>
      <ul>
        {quiz.map((quizItem, index) => {
          const iconClasses = classNames({
            fa: "fa",
            ["fa-times"]: results![quizItem.id] === "error",
            ["fa-check"]: results![quizItem.id] === "success",
          });
          return (
            <ListQuestion key={index}>
              <ListQuestionNumber>{quizItem.id}.</ListQuestionNumber>
              {quizItem.question}
              <ListIcon className={iconClasses} />
            </ListQuestion>
          );
        })}
      </ul>
      <p>Lorem</p>
      <button>Repeat</button>
    </FinishedQuizWrapper>
  );
};
export default FinishedQuiz;

// <i className={"fa fa-check"} />
// <i className={"fa fa-times"} />
