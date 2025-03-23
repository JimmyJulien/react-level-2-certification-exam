import { useQuery } from "@tanstack/react-query";
import { QuizFetchApi } from "../../infrastructure/api/QuizFetchApi";
import { QuizCategoryModel } from "../models/quiz.models";

export default function useGetCategories() {
  return useQuery<QuizCategoryModel[]>({
    queryKey: ["categories"],
    queryFn: () => QuizFetchApi.getCategories(),
    staleTime: Infinity, // Avoid unnecessary refetching
  });
}
