import {
  QuizCategoryModel,
  QuizConfigModel,
  QuizDifficultyModel,
  QuizQuestionModel,
} from "../../domain/models/quiz.models";

export interface QuizApi {
  getCategories: () => Promise<QuizCategoryModel[]>;
  getDifficulties: () => Promise<QuizDifficultyModel[]>;
  getQuestions: (config: QuizConfigModel) => Promise<QuizQuestionModel[]>;
}
