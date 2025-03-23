import { useQuery } from "@tanstack/react-query";
import { QuizFetchApi } from "../../infrastructure/api/QuizFetchApi";
import { QuizDifficultyModel } from "../models/quiz.models";

export default function useGetDifficulties() {
  return useQuery<QuizDifficultyModel[]>({
    queryKey: ["difficulties"],
    queryFn: () => QuizFetchApi.getDifficulties(),
    staleTime: Infinity, // Avoid unnecessary refetching
  });
}
