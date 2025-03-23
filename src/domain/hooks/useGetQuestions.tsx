import { useQuery } from "@tanstack/react-query";
import { QuizFetchApi } from "../../infrastructure/api/QuizFetchApi";
import { QuizConfigModel, QuizQuestionModel } from "../models/quiz.models";
import { ListUtils } from "../utils/ListUtils";

export default function useGetQuestions(quizConfig: QuizConfigModel | null) {
  return useQuery<QuizQuestionModel[]>({
    enabled: !!quizConfig,
    queryKey: ["quiz", quizConfig],
    queryFn: async () => {
      const quizQuestions = await QuizFetchApi.getQuestions(quizConfig!);
      return quizQuestions.map((quizQuestion) => ({
        ...quizQuestion,
        answers: ListUtils.shuffle(quizQuestion.answers),
      }));
    },
  });
}
