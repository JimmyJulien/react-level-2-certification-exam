import { ActionDispatch, createContext } from "react";
import {
  QuizStateEvent,
  QuizStateModel,
  QuizStore,
} from "../../domain/stores/quiz.store";

export const QuizContext = createContext<
  [QuizStateModel, ActionDispatch<[event: QuizStateEvent]>]
>([QuizStore.INITIAL_QUIZ_STATE, () => {}]);
