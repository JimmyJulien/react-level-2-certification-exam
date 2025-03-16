import { Navigate, Outlet } from "react-router";
import useQuiz from "../hooks/useQuiz";
import ROUTES from "./routes";

export default function ProtectedRoute() {
  const { quiz } = useQuiz();

  if (!quiz) {
    return <Navigate to={`/${ROUTES.CONFIG}`} />;
  }

  return <Outlet />;
}
