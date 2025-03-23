import { QuizQuestionModel } from "../../domain/models/quiz.models";
import { ApiQuizModel } from "../models/api.models";

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
