import { useContext } from "react";
import { useNavigate } from "react-router";
import { QuizContext } from "../../presentation/contexts/quiz.context";
import ROUTES from "../../presentation/routing/routes";

export function useResultPage() {
  const navigate = useNavigate();

  const [quizState, dispatch] = useContext(QuizContext);

  const score = quizState.quizQuestions.filter(
    (question) => question.correctAnswer === question.userAnswer,
  ).length;

  function getQuizScoreColor(
    score: number,
  ): "lightgreen" | "red" | "transparent" | "yellow" {
    if (score === 0 || score === 1) {
      return "red";
    }

    if (score === 2 || score === 3) {
      return "yellow";
    }

    if (score === 4 || score === 5) {
      return "lightgreen";
    }

    return "transparent";
  }

  function resetQuiz() {
    dispatch({ type: "QUIZ_RESET" });
    navigate(`/${ROUTES.CONFIG}`);
  }

  return {
    dispatch,
    getQuizScoreColor,
    resetQuiz,
    score,
    state: quizState,
  };
}
