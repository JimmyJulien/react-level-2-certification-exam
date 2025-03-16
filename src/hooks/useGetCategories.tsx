import { useQuery } from "@tanstack/react-query";
import { CategoriesApi } from "../api/CategoriesApi";
import { ApiCategoriesModel } from "../models/api.models";
import { SelectOptionModel } from "../models/select.models";

export default function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const apiCategories: ApiCategoriesModel =
        await CategoriesApi.getCategories();

      const categories: SelectOptionModel[] =
        apiCategories.trivia_categories.map((apiCategory) => ({
          label: apiCategory.name,
          value: String(apiCategory.id),
        }));

      return categories;
    },
    staleTime: Infinity, // Avoid unnecessary refetching
  });
}
