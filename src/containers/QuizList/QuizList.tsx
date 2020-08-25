import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Loader from "../../components/UI/Loader";

// STYLES
const QiuzListWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(90deg, #fd8355, #f0576c 37%, #f79cbd);
  padding-top: 150px;
  flex-direction: row;
  justify-content: center;
`;
const QuizListContainer = styled.div``;
const QuizListTitle = styled.h1`
  flex: 0 0 100%;
  text-align: center;
  padding-bottom: 30px;
  font-size: 45px;
  color: var(--whiteTextColor);
  font-weight: 600;
`;
const QuizListArray = styled.ul``;
const QuizListLinkWrapper = styled.li`
  display: block;
  padding-bottom: 15px;
`;
const QuizListLink = styled(NavLink)`
  color: var(--whiteTextColor);
  font-size: 22px;
  text-decoration: none;
  transition: 0.3s ease-in-out;
  &:hover {
    opacity: 0.7;
    color: #2d3436;
    transition: var(--transitionDelay);
  }
`;
// END STYLES

interface Quizes {
  id: string;
  name: string;
}

const QuizList: React.FC = () => {
  const [quizes, setQuiz] = useState<Quizes[]>([]);
  const [quizesLoading, setQuizesLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuizList = async () => {
      setQuizesLoading(true);
      const quizList = await axios.get(
        `https://reactquizhooks.firebaseio.com/quiz.json`
      );
      const quizes: Quizes[] = [];
      Object.keys(quizList.data).forEach((key: string, index: number) => {
        quizes.push({
          id: key,
          name: `Quiz # ${index + 1}`,
        });
      });
      setQuizesLoading(false);
      setQuiz(quizes);
    };
    fetchQuizList();
  }, []);

  const renderQuizes = () => {
    return quizes.map((quiz: Quizes) => {
      return (
        <QuizListLinkWrapper key={quiz.id}>
          <QuizListLink to={"/quiz/" + quiz.id}>{quiz.name}</QuizListLink>
        </QuizListLinkWrapper>
      );
    });
  };

  return (
    <QiuzListWrapper>
      <QuizListContainer>
        <QuizListTitle>QuizList</QuizListTitle>
        {quizesLoading ? (
          <Loader isBigLoader={true} />
        ) : (
          <QuizListArray>{renderQuizes()}</QuizListArray>
        )}
      </QuizListContainer>
    </QiuzListWrapper>
  );
};
export default QuizList;
