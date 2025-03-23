import { z } from "zod";

export const ApiQuizCategoriesSchema = z.object({
  trivia_categories: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
});

export type ApiQuizCategoriesModel = z.infer<typeof ApiQuizCategoriesSchema>;

export const ApiQuizQuestionSchema = z.object({
  category: z.string(),
  correct_answer: z.string(),
  difficulty: z.string(),
  incorrect_answers: z.array(z.string()),
  question: z.string(),
  type: z.string(),
});

export type ApiQuizQuestionModel = z.infer<typeof ApiQuizQuestionSchema>;

export const ApiQuizSchema = z.object({
  response_code: z.number(),
  results: z.array(ApiQuizQuestionSchema),
});

export type ApiQuizModel = z.infer<typeof ApiQuizSchema>;
