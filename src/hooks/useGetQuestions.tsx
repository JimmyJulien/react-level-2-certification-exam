import { useQuery } from "@tanstack/react-query";
import { QuizApi } from "../api/QuizApi";
import { ApiQuizModel } from "../models/api.models";
import { QuizConfigModel, QuizQuestionModel } from "../models/quiz.models";
import { ListUtils } from "../utils/ListUtils";
import { QuizUtils } from "../utils/QuizUtils";

export default function useGetQuestions(quizConfig: QuizConfigModel | null) {
  return useQuery<QuizQuestionModel[]>({
    enabled: !!quizConfig,
    queryKey: ["quiz", quizConfig],
    queryFn: async () => {
      // NOTE: quizConfig is defined because queryFn launch only
      // if quizConfig defined thanks to enabled option
      const apiQuiz: ApiQuizModel = await QuizApi.getQuiz(quizConfig!);

      const unsanitizedQuiz: QuizQuestionModel[] = apiQuiz.results.map(
        (apiQuestion) => {
          const apiAnswers: string[] = [
            ...apiQuestion.incorrect_answers,
            apiQuestion.correct_answer,
          ];

          return {
            answers: ListUtils.shuffle(apiAnswers),
            correctAnswer: apiQuestion.correct_answer,
            question: apiQuestion.question,
          };
        },
      );

      const sanitizedQuiz: QuizQuestionModel[] =
        QuizUtils.sanitizeQuiz(unsanitizedQuiz);

      return sanitizedQuiz;
    },
  });
}
