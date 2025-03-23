import { PropsWithChildren, useState } from "react";
import { QuizModel } from "../models/quiz.models";
import { QuizContext } from "./QuizContext";

export function QuizContextProvider({ children }: PropsWithChildren) {
  const quizHook = useState<QuizModel | null>(null);

  return <QuizContext value={quizHook}>{children}</QuizContext>;
}
