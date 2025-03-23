import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import ConfigPage from "../../presentation/pages/ConfigPage";
import ProtectedRoute from "./ProtectedRoute";
import ROUTES from "./routes";

const NotFoundPage = lazy(
  () => import("../../presentation/pages/NotFoundPage"),
);
const QuizPage = lazy(() => import("../../presentation/pages/QuizPage"));
const ResultPage = lazy(() => import("../../presentation/pages/ResultPage"));

const router = createBrowserRouter([
  { index: true, element: <ConfigPage /> },
  { path: ROUTES.CONFIG, element: <ConfigPage /> },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { path: ROUTES.QUIZ, element: <QuizPage /> },
      { path: ROUTES.RESULT, element: <ResultPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
