import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { QuizContext } from "../contexts/quiz.context";
import ROUTES from "./routes";

export default function ProtectedRoute() {
  const [{ quizConfig, quizQuestions }] = useContext(QuizContext);

  if (!quizConfig || quizQuestions.length === 0) {
    return <Navigate to={`/${ROUTES.CONFIG}`} />;
  }

  return <Outlet />;
}
