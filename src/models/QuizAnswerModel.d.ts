type QuizData = {
  question: string;
  rightAnswerId: number;

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
  results: null | { [id: number]: "success" | "error" };
  answerState: null | { [id: number]: "success" | "error" };
  quiz: QuizData[];
}
