import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { QuizContextProvider } from "./presentation/contexts/quiz.context-provider.tsx";
import router from "./presentation/routing/router.tsx";
import UiLoader from "./presentation/ui/ui-loader.component.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QuizContextProvider>
      <Suspense fallback={<UiLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </QuizContextProvider>
  </StrictMode>,
);
