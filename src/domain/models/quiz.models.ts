import { z } from "zod";

export const QuizCategorySchema = z.object({
  label: z.string(),
  value: z.string(),
});

export type QuizCategoryModel = z.infer<typeof QuizCategorySchema>;

export const QuizDifficultySchema = z.object({
  label: z.string(),
  value: z.union([z.literal("easy"), z.literal("medium"), z.literal("hard")]),
});

export type QuizDifficultyModel = z.infer<typeof QuizDifficultySchema>;

export const QuizConfigSchema = z.object({
  category: QuizCategorySchema,
  difficulty: QuizDifficultySchema,
});

export type QuizConfigModel = z.infer<typeof QuizConfigSchema>;

export const QuizQuestionSchema = z.object({
  answers: z.array(z.string()),
  question: z.string(),
  correctAnswer: z.string(),
  userAnswer: z.string().optional(),
});

export type QuizQuestionModel = z.infer<typeof QuizQuestionSchema>;

export const QuizSchema = z.object({
  config: QuizConfigSchema,
  questions: z.array(QuizQuestionSchema),
});

export type QuizModel = z.infer<typeof QuizSchema>;
