type QuizData = {
  question: string;
  rightAnswerId: number;
  result: null | "success" | "error";
  id: number;
  answers: QuizAnswers[];
};

type QuizAnswers = {
  text: string;
  id: number;
};

interface QuizState {
  isFinished: boolean;
  activeQuestion: number;
  answerState: null | { [id: number]: "success" | "error" };
  quiz: QuizData[];
}
