import { createContext } from "react";
import { QuizModel } from "../models/quiz.models";

export const QuizContext = createContext<
  [QuizModel | null, (quiz: QuizModel | null) => void]
>([null, () => {}]);
