import { z } from "zod";
import { QuizCategoryModel } from "../../domain/models/quiz.models";

export const ApiQuizCategoriesSchema = z.object({
  trivia_categories: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
});

export type ApiQuizCategoriesModel = z.infer<typeof ApiQuizCategoriesSchema>;

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
