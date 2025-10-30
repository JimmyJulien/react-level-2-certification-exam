import { useContext } from "react";
import { useNavigate } from "react-router";
import { QuizContext } from "../../presentation/contexts/quiz.context";
import ROUTES from "../../presentation/routing/routes";
import {
  QuizCategoryModel,
  QuizDifficultyModel,
  QuizQuestionModel,
} from "../models/quiz.models";

export function useQuizPage() {
  const navigate = useNavigate();

  const [quizState, dispatch] = useContext(QuizContext);

  const isQuizComplete = quizState.quizQuestions.every(
    (question) => !!question.userAnswer,
  );

  const categories: QuizCategoryModel[] = quizState.quizConfig
    ? [quizState.quizConfig.category]
    : [];

  const difficulties: QuizDifficultyModel[] = quizState.quizConfig
    ? [quizState.quizConfig.difficulty]
    : [];

  function answerQuestion(quizQuestion: QuizQuestionModel, userAnswer: string) {
    dispatch({
      type: "QUIZ_QUESTION_ANSWERED",
      payload: { quizQuestion, userAnswer },
    });
  }

  function showResults() {
    navigate(`/${ROUTES.RESULT}`);
  }

  return {
    answerQuestion,
    categories,
    difficulties,
    dispatch,
    isQuizComplete,
    showResults,
    state: quizState,
  };
}
