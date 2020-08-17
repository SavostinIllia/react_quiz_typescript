import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface QuizListProps {}

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

const QuizList: React.FC<QuizListProps> = ({}) => {
  const renderQuizes = () => {
    return [1, 2, 3].map((quiz, i) => {
      return (
        <QuizListLinkWrapper key={i}>
          <QuizListLink to={"/quiz/" + quiz}> Quiz # {quiz}</QuizListLink>
        </QuizListLinkWrapper>
      );
    });
  };

  return (
    <QiuzListWrapper>
      <QuizListContainer>
        <QuizListTitle>QuizList</QuizListTitle>
        <QuizListArray>{renderQuizes()}</QuizListArray>
      </QuizListContainer>
    </QiuzListWrapper>
  );
};
export default QuizList;
