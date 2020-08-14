import React from "react";
import styled from "styled-components";
import classNames from "classnames";

interface AnswerItemProps {
  answerText: string;
  answerId: number;
  onAnswerClick(id: number): void;
  answerState: null | "success" | "error";
}

const Answer = styled.li`
  flex: 0 0 100%;
  border: 1px solid var(--whiteTextColor);
  padding: 10px;
  margin-bottom: 10px;
  color: var(--whiteTextColor);
  font-size: 20px;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    transition: 0.3s ease-in-out;
    background: rgba(255, 255, 255, 0.6);
  }
  &.error {
    background: #ff6b6b;
  }
  &.success {
    background: #30de87;
  }
`;

const AnswerItem: React.FC<AnswerItemProps> = ({
  answerText,
  onAnswerClick,
  answerId,
  answerState,
}) => {
  const AnswerClass = classNames({
    error: answerState === "error",
    success: answerState === "success",
  });

  return (
    <Answer className={AnswerClass} onClick={() => onAnswerClick(answerId)}>
      {answerText}
    </Answer>
  );
};
export default AnswerItem;

// <{ answerState: null | "success" | "error" }>
