export type ApiCategoryModel = {
  id: number;
  name: string;
};

export type ApiCategoriesModel = {
  trivia_categories: ApiCategoryModel[];
};

export type ApiQuizQuestionModel = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type ApiQuizModel = {
  response_code: number;
  results: ApiQuizQuestionModel[];
};
