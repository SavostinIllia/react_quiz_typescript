interface Quiz {
  text: string;
  id: number;
}

interface QuizState {
  activeQuestion: number;
  answerState: null | { [id: number]: "success" | "error" };
  quiz: {
    question: string;
    rightAnswerId: number;
    id: number;
    answers: Quiz[];
  }[];
}
