import { ApiCategoriesModel } from "../models/api.models";

async function getCategories(): Promise<ApiCategoriesModel> {
  const response: Response = await fetch(
    "https://opentdb.com/api_category.php",
  );
  return response.json();
}

export const CategoriesApi = {
  getCategories,
};
