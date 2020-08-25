type QuizData = {
  question: string;
  rightAnswer: number;
  id: number;
  answers: QuizAnswers[];
};

type QuizAnswers = {
  text: string;
  id: number;
};

interface QuizState {
  activeQuestion: number;
  results: null | { [id: number]: "success" | "error" };
  answerState: null | { [id: number]: "success" | "error" };
}
