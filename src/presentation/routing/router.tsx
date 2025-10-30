import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import ConfigPage from "../pages/config-page.component";
import ProtectedRoute from "./protected-route.component";
import ROUTES from "./routes";

const NotFoundPage = lazy(() => import("../pages/not-found-page.component"));
const QuizPage = lazy(() => import("../pages/quiz-page.component"));
const ResultPage = lazy(() => import("../pages/result-page.component"));

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
