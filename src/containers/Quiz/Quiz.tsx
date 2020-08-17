import React, { Component } from "react";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import styled from "styled-components";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

interface QuizProps {}

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
`;

class Quiz extends Component<QuizProps> {
  state: QuizState = {
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    results: {},
    quiz: [
      {
        question: "2 + 2 * 2?",
        rightAnswerId: 4,
        id: 1,

        answers: [
          { text: "4", id: 1 },
          { text: "5", id: 2 },
          { text: "8", id: 3 },
          { text: "6", id: 4 },
        ],
      },
      {
        question: "What 2?",
        rightAnswerId: 1,

        id: 2,
        answers: [
          { text: "Answer 1", id: 1 },
          { text: "Answer 2", id: 2 },
          { text: "Answer 3", id: 3 },
          { text: "Answer 4", id: 4 },
        ],
      },
    ],
  };

  onAnswerClickHandler = (answerId: number) => {
    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results![question.id]) {
        results![question.id] = "success";
      }
      this.setState({
        answerState: { [answerId]: "success" },
        results,
      });
      const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          } as QuizState);
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          } as QuizState);
        }

        window.clearTimeout(timer);
      }, 800);
    } else {
      results![question.id] = "error";
      this.setState({
        answerState: { [answerId]: "error" },
        results,
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  onRepeatHandler = () => {
    this.setState({
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
      results: {},
    });
  };

  componentDidMount() {
    // console.log("Quiz ID", this.props.match.params.id);
  }

  render() {
    return (
      <QuizContainer>
        <ActiveQuizWrapper>
          <QuizTitle>Quiz</QuizTitle>
          {this.state.isFinished ? (
            <FinishedQuiz
              quiz={this.state.quiz}
              results={this.state.results}
              onRepeatHandler={this.onRepeatHandler}
            />
          ) : (
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              answerNumber={this.state.activeQuestion + 1}
              answerState={this.state.answerState}
              queistionLength={this.state.quiz.length}
            />
          )}
        </ActiveQuizWrapper>
      </QuizContainer>
    );
  }
}
export default Quiz;
