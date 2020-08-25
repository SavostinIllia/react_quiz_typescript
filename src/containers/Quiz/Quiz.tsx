import React, { useState, useEffect } from "react";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import styled from "styled-components";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "axios";
import Loader from "../../components/UI/Loader";
import { RouteComponentProps } from "react-router";

const QuizContainer = styled.section`
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(
    90deg,
    rgba(37, 125, 158, 1) 20%,
    rgba(80, 230, 185, 1) 100%
  );
`;
const QuizTitle = styled.h2`
  font-weight: 600;
  font-size: 30px;
  color: var(--whiteTextColor);
  padding-bottom: 40px;
  flex: 0 0 100%;
`;
const ActiveQuizWrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  padding-top: 150px;
  max-width: 900px;
  margin: 0 auto;
  justify-content: center;
`;

interface MatchParams {
  id: string;
}
interface MatchProps extends RouteComponentProps<MatchParams> {}

const initialState: QuizState = {
  activeQuestion: 0,
  answerState: null,
  results: {},
};
const initialQuiz: QuizData[] = [
  {
    question: "",
    rightAnswer: 1,
    id: 1,
    answers: [
      { text: "", id: 1 },
      { text: "", id: 2 },
      { text: "", id: 3 },
      { text: "", id: 4 },
    ],
  },
];

const Quiz: React.FC<MatchProps> = ({ match }) => {
  const [quizState, setQuizState] = useState<QuizState>(initialState);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<QuizData[]>(initialQuiz);
  const [quizLoaded, setQuizLoaded] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuizes = async () => {
      const response = await axios.get(
        `https://reactquizhooks.firebaseio.com/quiz/${match.params.id}.json`
      );
      const quiz: QuizData[] = response.data;
      setQuizLoaded(false);
      setQuiz(quiz);
    };
    fetchQuizes();
  });

  const onAnswerClickHandler = (answerId: number) => {
    if (quizState.answerState) {
      const key: number = +Object.keys(quizState.answerState)[0];
      if (quizState.answerState[key] === "success") {
        return;
      }
    }
    const question = quiz[quizState.activeQuestion];
    const results = quizState.results;

    if (question.rightAnswer === answerId) {
      if (!results![question.id]) {
        results![question.id] = "success";
      }
      setQuizState((prev) => {
        return {
          ...prev,
          answerState: { [answerId]: "success" },
          results,
        };
      });
      const answerTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
        if (isQuizFinished()) {
          setIsFinished(true);
        } else {
          setQuizState((prev) => {
            return {
              ...prev,
              activeQuestion: prev.activeQuestion + 1,
              answerState: null,
            };
          });
        }
        window.clearTimeout(answerTimer);
      }, 500);
    } else {
      results![question.id] = "error";
      setQuizState((prev) => {
        return {
          ...prev,
          answerState: { [answerId]: "error" },
          results,
        };
      });
    }
  };

  const isQuizFinished = () => {
    return quizState.activeQuestion + 1 === quiz.length;
  };

  const onRepeatHandler = () => {
    setQuizState((prev) => {
      return {
        ...prev,
        activeQuestion: 0,
        answerState: null,
        results: {},
      };
    });
    setIsFinished(false);
  };

  return (
    <QuizContainer>
      <ActiveQuizWrapper>
        <QuizTitle>Quiz</QuizTitle>
        {quizLoaded ? (
          <Loader isBigLoader={true} />
        ) : isFinished ? (
          <FinishedQuiz
            quiz={quiz}
            results={quizState.results}
            onRepeatHandler={onRepeatHandler}
          />
        ) : (
          <ActiveQuiz
            answers={quiz[quizState.activeQuestion].answers}
            question={quiz[quizState.activeQuestion].question}
            onAnswerClick={onAnswerClickHandler}
            answerNumber={quizState.activeQuestion + 1}
            answerState={quizState.answerState}
            queistionLength={quiz.length}
          />
        )}
      </ActiveQuizWrapper>
    </QuizContainer>
  );
};
export default Quiz;
