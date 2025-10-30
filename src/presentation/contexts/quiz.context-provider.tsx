import { PropsWithChildren, useReducer } from "react";
import { QuizStore } from "../../domain/stores/quiz.store";
import { QuizContext } from "./quiz.context";

export function QuizContextProvider({ children }: PropsWithChildren) {
  const { INITIAL_QUIZ_STATE, quizStateReducer } = QuizStore;
  const reducer = useReducer(quizStateReducer, INITIAL_QUIZ_STATE);
  return <QuizContext value={reducer}>{children}</QuizContext>;
}
