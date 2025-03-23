import {
  QuizCategoryModel,
  QuizConfigModel,
  QuizDifficultyModel,
  QuizQuestionModel,
} from "../../domain/models/quiz.models";
import { QuizUtils } from "../../domain/utils/QuizUtils";
import { QuizCategoryMapper } from "../mappers/quiz-category.mapper";
import { QuizQuestionMapper } from "../mappers/quiz-question.mapper";
import { ApiQuizCategoriesSchema, ApiQuizSchema } from "../models/api.models";
import { QuizApi } from "./QuizApi";

async function getCategories(): Promise<QuizCategoryModel[]> {
  const response: Response = await fetch(
    "https://opentdb.com/api_category.php",
  );

  const { data, error } = ApiQuizCategoriesSchema.safeParse(
    await response.json(),
  );

  if (error) {
    console.error("Categories API schema has changed", error);
    throw new Error("Error retrieving categories");
  }

  return QuizCategoryMapper.apiQuizCategoriesToQuizCategoryList(data);
}

async function getDifficulties(): Promise<QuizDifficultyModel[]> {
  return [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
  ];
}

async function getQuestions({
  category,
  difficulty,
}: QuizConfigModel): Promise<QuizQuestionModel[]> {
  const response: Response = await fetch(
    `https://opentdb.com/api.php?amount=5&category=${category.value}&difficulty=${difficulty.value}&type=multiple`,
  );

  const { data, error } = ApiQuizSchema.safeParse(await response.json());

  if (error) {
    console.error("Quiz API schema has changed", error);
    throw new Error("Error retrieving quiz");
  }

  const unsanitizedQuestions =
    QuizQuestionMapper.apiQuizToQuizQuestionList(data);

  return QuizUtils.sanitizeQuestions(unsanitizedQuestions);
}

export const QuizFetchApi: QuizApi = {
  getCategories,
  getDifficulties,
  getQuestions,
};
