import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { QuizContextProvider } from "./domain/contexts/QuizContextProvider.tsx";
import "./index.css";
import router from "./infrastructure/routing/router.tsx";
import UiLoader from "./presentation/ui/UiLoader.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <QuizContextProvider>
        <Suspense fallback={<UiLoader />}>
          <RouterProvider router={router} />
        </Suspense>
      </QuizContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
