import { act, renderHook, waitFor } from "@testing-library/react";
import { PropsWithChildren, useReducer } from "react";
import { describe, expect, it, vi } from "vitest";
import { QuizContext } from "../../presentation/contexts/quiz.context";
import ROUTES from "../../presentation/routing/routes";
import { QuizQuestionModel } from "../models/quiz.models";
import { QuizStateModel, QuizStore } from "../stores/quiz.store";
import { useQuizPage } from "./use-quiz-page.hook";

vi.mock(import("react-router"), async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: vi.fn() };
});

async function setup(partialInitialState?: Partial<QuizStateModel>) {
  const APP_STATE: QuizStateModel = {
    ...QuizStore.INITIAL_QUIZ_STATE,
    quizQuestions: [
      {
        answers: ["1", "2", "3", "4"],
        correctAnswer: "1",
        question: "q1",
      },
      {
        answers: ["1", "2", "3", "4"],
        correctAnswer: "1",
        question: "q2",
      },
      {
        answers: ["1", "2", "3", "4"],
        correctAnswer: "1",
        question: "q3",
      },
      {
        answers: ["1", "2", "3", "4"],
        correctAnswer: "1",
        question: "q4",
      },
      {
        answers: ["1", "2", "3", "4"],
        correctAnswer: "1",
        question: "q5",
      },
    ],
    ...partialInitialState,
  };

  function FakeAppContextProvider({
    initialAppState,
    children,
  }: { initialAppState: QuizStateModel } & PropsWithChildren) {
    const reducer = useReducer(QuizStore.quizStateReducer, initialAppState);
    return (
      <QuizContext.Provider value={reducer}>{children}</QuizContext.Provider>
    );
  }

  function wrapper({ children }: PropsWithChildren) {
    return (
      <FakeAppContextProvider initialAppState={APP_STATE}>
        {children}
      </FakeAppContextProvider>
    );
  }

  const navigateSpy = vi.fn();

  vi.spyOn(await import("react-router"), "useNavigate").mockImplementation(
    () => navigateSpy,
  );

  const { result } = renderHook(() => useQuizPage(), { wrapper });

  return { navigateSpy, result };
}

describe("useQuizPage", () => {
  it("SHOULD update quiz with user answer", async () => {
    // GIVEN
    const { result } = await setup();

    const quizQuestion: QuizQuestionModel =
      result.current.state.quizQuestions[0];

    const userAnswer: string = quizQuestion.answers[0];

    // WHEN
    act(() => result.current.answerQuestion(quizQuestion, userAnswer));

    // THEN
    const quizQuestionAnswered: QuizQuestionModel =
      result.current.state.quizQuestions.find(
        (stateQuizQuestion) =>
          stateQuizQuestion.question === quizQuestion.question,
      )!;

    await waitFor(() => {
      expect(quizQuestionAnswered.userAnswer).toStrictEqual(userAnswer);
    });
  });

  it("SHOULD navigate to result route", async () => {
    // GIVEN
    const { navigateSpy, result } = await setup();

    // WHEN
    act(() => result.current.showResults());

    // THEN
    await waitFor(() => {
      expect(navigateSpy).toHaveBeenCalledExactlyOnceWith(`/${ROUTES.RESULT}`);
    });
  });

  it("SHOULD have a completed quiz WHEN all questions are answered", async () => {
    // GIVEN
    const { result } = await setup({
      quizQuestions: [
        {
          answers: ["1", "2", "3", "4"],
          correctAnswer: "1",
          question: "q1",
          userAnswer: "1",
        },
        {
          answers: ["1", "2", "3", "4"],
          correctAnswer: "1",
          question: "q2",
          userAnswer: "1",
        },
        {
          answers: ["1", "2", "3", "4"],
          correctAnswer: "1",
          question: "q3",
          userAnswer: "1",
        },
        {
          answers: ["1", "2", "3", "4"],
          correctAnswer: "1",
          question: "q4",
          userAnswer: "2",
        },
        {
          answers: ["1", "2", "3", "4"],
          correctAnswer: "1",
          question: "q5",
          userAnswer: "2",
        },
      ],
    });

    // WHEN / THEN
    await waitFor(() => {
      expect(result.current.isQuizComplete).toBe(true);
    });
  });

  it("SHOULD have an incomplete quiz WHEN at least one question is not answered", async () => {
    // GIVEN
    const { result } = await setup({
      quizQuestions: [
        {
          answers: ["1", "2", "3", "4"],
          correctAnswer: "1",
          question: "q1",
          userAnswer: "1",
        },
        {
          answers: ["1", "2", "3", "4"],
          correctAnswer: "1",
          question: "q2",
          userAnswer: "1",
        },
        {
          answers: ["1", "2", "3", "4"],
          correctAnswer: "1",
          question: "q3",
          userAnswer: "1",
        },
        {
          answers: ["1", "2", "3", "4"],
          correctAnswer: "1",
          question: "q4",
          userAnswer: "2",
        },
        {
          answers: ["1", "2", "3", "4"],
          correctAnswer: "1",
          question: "q5",
        },
      ],
    });

    // WHEN / THEN
    await waitFor(() => {
      expect(result.current.isQuizComplete).toBe(false);
    });
  });

  it("SHOULD have an incomplete quiz WHEN no question is answered", async () => {
    // GIVEN
    const { result } = await setup();

    // WHEN / THEN
    await waitFor(() => {
      expect(result.current.isQuizComplete).toBe(false);
    });
  });

  it("SHOULD expose the quiz config category as categories WHEN a quiz config is defined", async () => {
    // GIVEN
    const { result } = await setup({
      quizConfig: {
        category: { label: "Category", value: "1" },
        difficulty: { label: "Easy", value: "easy" },
      },
    });

    // WHEN / THEN
    await waitFor(() => {
      expect(result.current.categories).toStrictEqual([
        result.current.state.quizConfig!.category,
      ]);
    });
  });

  it("SHOULD expose an empty category list WHEN no quiz config is defined", async () => {
    // GIVEN
    const { result } = await setup();

    // WHEN / THEN
    await waitFor(() => {
      expect(result.current.categories).toStrictEqual([]);
    });
  });

  it("SHOULD expose the quiz config difficulty WHEN a quiz config is defined", async () => {
    // GIVEN
    const { result } = await setup({
      quizConfig: {
        category: { label: "Category", value: "1" },
        difficulty: { label: "Easy", value: "easy" },
      },
    });

    // WHEN / THEN
    await waitFor(() => {
      expect(result.current.difficulties).toStrictEqual([
        result.current.state.quizConfig!.difficulty,
      ]);
    });
  });

  it("SHOULD expose an empty difficulty list WHEN no quiz config is defined", async () => {
    // GIVEN
    const { result } = await setup();

    // WHEN / THEN
    await waitFor(() => {
      expect(result.current.difficulties).toStrictEqual([]);
    });
  });
});
