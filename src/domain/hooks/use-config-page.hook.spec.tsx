import { act, renderHook, waitFor } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { QuizFetchApi } from "../../infrastructure/api/quiz-fetch.api";
import { QuizContextProvider } from "../../presentation/contexts/quiz.context-provider";
import ROUTES from "../../presentation/routing/routes";
import {
  QuizCategoryModel,
  QuizConfigModel,
  QuizDifficultyModel,
  QuizQuestionModel,
} from "../models/quiz.models";
import { ConfigPageStateModel, useConfigPage } from "./use-config-page.hook";

vi.mock(import("../../infrastructure/api/quiz-fetch.api"), () => {
  return {
    QuizFetchApi: {
      getCategories: vi.fn(),
      getDifficulties: vi.fn(),
      getQuestions: vi.fn(),
    },
  };
});

const navigateSpy = vi.fn();

vi.mock(import("react-router"), async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => navigateSpy };
});

describe("useConfigPage", () => {
  it("SHOULD define categories and difficulties WHEN hook is initialized", async () => {
    // GIVEN
    const expectedCategories: QuizCategoryModel[] = [{ label: "", value: "" }];

    const expectedDifficulties: QuizDifficultyModel[] = [
      { label: "", value: "easy" },
    ];

    function wrapper({ children }: PropsWithChildren) {
      return (
        <QuizContextProvider>
          <MemoryRouter>{children}</MemoryRouter>
        </QuizContextProvider>
      );
    }

    vi.spyOn(QuizFetchApi, "getCategories").mockResolvedValueOnce(
      expectedCategories,
    );

    vi.spyOn(QuizFetchApi, "getDifficulties").mockResolvedValueOnce(
      expectedDifficulties,
    );

    const { result } = renderHook(() => useConfigPage(), {
      wrapper,
    });

    const expectedState: ConfigPageStateModel = {
      categories: expectedCategories,
      difficulties: expectedDifficulties,
      areCategoriesPending: false,
      categoriesError: null,
      areDifficultiesPending: false,
      difficultiesError: null,
      quizConfig: null,
      quizQuestions: [],
      areQuizQuestionsPending: false,
      quizQuestionsError: null,
    };

    // WHEN/THEN
    await waitFor(() => {
      expect(result.current.state).toStrictEqual(expectedState);
    });
  });

  it("SHOULD define config and questions", async () => {
    // GIVEN
    function wrapper({ children }: PropsWithChildren) {
      return (
        <QuizContextProvider>
          <MemoryRouter>{children}</MemoryRouter>
        </QuizContextProvider>
      );
    }

    const exepectedQuizConfig: QuizConfigModel = {
      category: { label: "", value: "" },
      difficulty: { label: "", value: "easy" },
    };

    const expectedQuizQuestions: QuizQuestionModel[] = [
      {
        answers: [],
        question: "",
        correctAnswer: "",
      },
    ];

    const { result } = renderHook(() => useConfigPage(), {
      wrapper,
    });

    vi.spyOn(QuizFetchApi, "getQuestions").mockResolvedValueOnce(
      expectedQuizQuestions,
    );

    // WHEN
    act(() => result.current.defineConfig(exepectedQuizConfig));

    // WHEN/THEN
    await waitFor(() => {
      expect(result.current.state.quizConfig).toStrictEqual(
        exepectedQuizConfig,
      );
      expect(result.current.state.quizQuestions).toStrictEqual(
        expectedQuizQuestions,
      );
    });
  });

  it("SHOULD navigate to the quiz page WHEN quiz questions are defined", async () => {
    // GIVEN
    function wrapper({ children }: PropsWithChildren) {
      return (
        <QuizContextProvider>
          <MemoryRouter>{children}</MemoryRouter>
        </QuizContextProvider>
      );
    }

    const exepectedQuizConfig: QuizConfigModel = {
      category: { label: "", value: "" },
      difficulty: { label: "", value: "easy" },
    };

    const expectedQuizQuestions: QuizQuestionModel[] = [
      {
        answers: [],
        question: "",
        correctAnswer: "",
      },
    ];

    const { result } = renderHook(() => useConfigPage(), {
      wrapper,
    });

    vi.spyOn(QuizFetchApi, "getQuestions").mockResolvedValueOnce(
      expectedQuizQuestions,
    );

    // WHEN
    act(() => result.current.defineConfig(exepectedQuizConfig));

    // WHEN/THEN
    await waitFor(() => {
      expect(navigateSpy).toHaveBeenCalledExactlyOnceWith(`/${ROUTES.QUIZ}`);
    });
  });
});
