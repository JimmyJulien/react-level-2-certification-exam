import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import ConfigPage from "../pages/ConfigPage";
import ProtectedRoute from "./ProtectedRoute";
import ROUTES from "./routes";

const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const QuizPage = lazy(() => import("../pages/QuizPage"));
const ResultPage = lazy(() => import("../pages/ResultPage"));

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
