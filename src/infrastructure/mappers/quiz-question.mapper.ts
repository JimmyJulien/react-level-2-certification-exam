import { z } from "zod";
import { QuizQuestionModel } from "../../domain/models/quiz.models";

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

export const QuizQuestionMapper = Object.freeze({
  apiQuizToQuizQuestionList: (apiQuiz: ApiQuizModel): QuizQuestionModel[] => {
    return apiQuiz.results.map(
      ({ correct_answer, incorrect_answers, question }) => ({
        answers: [...incorrect_answers, correct_answer],
        correctAnswer: correct_answer,
        question,
      }),
    );
  },
});
