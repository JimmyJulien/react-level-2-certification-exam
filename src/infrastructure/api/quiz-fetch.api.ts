import {
  QuizCategoryModel,
  QuizConfigModel,
  QuizDifficultyModel,
  QuizQuestionModel,
} from "../../domain/models/quiz.models";
import {
  ApiQuizCategoriesSchema,
  QuizCategoryMapper,
} from "../mappers/quiz-category.mapper";
import {
  ApiQuizSchema,
  QuizQuestionMapper,
} from "../mappers/quiz-question.mapper";
import { SanitizationService } from "../security/sanitization.service";
import { QuizApi } from "./quiz.api";

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

  const categories: QuizCategoryModel[] =
    QuizCategoryMapper.apiQuizCategoriesToQuizCategoryList(data);

  return SanitizationService.sanitize(categories);
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

  const questions: QuizQuestionModel[] =
    QuizQuestionMapper.apiQuizToQuizQuestionList(data);

  return SanitizationService.sanitize(questions);
}

export const QuizFetchApi: QuizApi = Object.freeze({
  getCategories,
  getDifficulties,
  getQuestions,
});
