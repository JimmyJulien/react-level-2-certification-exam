import { SelectOptionModel } from "./select.models";

export type QuizConfigModel = {
  category: SelectOptionModel;
  difficulty: SelectOptionModel;
};

export type QuizQuestionModel = {
  answers: string[];
  question: string;
  correctAnswer: string;
  userAnswer?: string;
};

export type QuizModel = {
  config: QuizConfigModel;
  questions: QuizQuestionModel[];
};
