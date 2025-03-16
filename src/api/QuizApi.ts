import { ApiQuizModel } from "../models/api.models";
import { QuizConfigModel } from "../models/quiz.models";

async function getQuiz({
  category,
  difficulty,
}: QuizConfigModel): Promise<ApiQuizModel> {
  const response: Response = await fetch(
    `https://opentdb.com/api.php?amount=5&category=${category.value}&difficulty=${difficulty.value}&type=multiple`,
  );
  return response.json();
}

export const QuizApi = {
  getQuiz,
};
