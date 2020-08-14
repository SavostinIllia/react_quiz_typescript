import React from "react";
import styled from "styled-components";

interface FinishedQuizProps {
  quiz: Pick<QuizData, "question" | "id">[];
}

const FinishedQuizWrapper = styled.div`
  border: 1px solid var(--whiteTextColor);
  width: 100%;
  padding: 40px;
`;

const FinishedQuiz: React.FC<FinishedQuizProps> = ({ quiz }) => {
  return (
    <FinishedQuizWrapper>
      <ul>
        {quiz.map((quizItem, index) => {
          return (
            <li key={index}>
              {quizItem.question}
              <i />
            </li>
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
