import { QuizCategoryModel } from "../../domain/models/quiz.models";
import { ApiQuizCategoriesModel } from "../models/api.models";

export const QuizCategoryMapper = Object.freeze({
  apiQuizCategoriesToQuizCategoryList: (
    apiQuizCategories: ApiQuizCategoriesModel,
  ): QuizCategoryModel[] => {
    return apiQuizCategories.trivia_categories.map((apiCategory) => ({
      label: apiCategory.name,
      value: String(apiCategory.id),
    }));
  },
});
