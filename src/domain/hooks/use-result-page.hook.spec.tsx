import { act, renderHook, waitFor } from "@testing-library/react";
import { PropsWithChildren, useReducer } from "react";
import { describe, expect, it, vi } from "vitest";
import { QuizContext } from "../../presentation/contexts/quiz.context";
import ROUTES from "../../presentation/routing/routes";
import { QuizStateModel, QuizStore } from "../stores/quiz.store";
import { useResultPage } from "./use-result-page.hook";

vi.mock(import("react-router"), async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: vi.fn() };
});

async function setup(partialAppState?: Partial<QuizStateModel>) {
  const APP_STATE: QuizStateModel = {
    ...QuizStore.INITIAL_QUIZ_STATE,
    quizQuestions: [
      {
        answers: ["1", "2", "3", "4"],
        correctAnswer: "1",
        question: "q1",
        userAnswer: "2",
      },
      {
        answers: ["1", "2", "3", "4"],
        correctAnswer: "1",
        question: "q2",
        userAnswer: "2",
      },
      {
        answers: ["1", "2", "3", "4"],
        correctAnswer: "1",
        question: "q3",
        userAnswer: "2",
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
    ...partialAppState,
  };

  const navigateSpy = vi.fn();

  vi.spyOn(await import("react-router"), "useNavigate").mockImplementation(
    () => navigateSpy,
  );

  function FakeAppContextProvider({
    initialState,
    children,
  }: { initialState: QuizStateModel } & PropsWithChildren) {
    const reducer = useReducer(QuizStore.quizStateReducer, initialState);
    return (
      <QuizContext.Provider value={reducer}>{children}</QuizContext.Provider>
    );
  }

  function wrapper({ children }: PropsWithChildren) {
    return (
      <FakeAppContextProvider initialState={APP_STATE}>
        {children}
      </FakeAppContextProvider>
    );
  }

  const { result } = renderHook(() => useResultPage(), { wrapper });

  return { navigateSpy, result };
}

describe("useResultPage", () => {
  it("SHOULD have a score of 0 WHEN no correct answer", async () => {
    // GIVEN
    const { result } = await setup();

    // WHEN / THEN
    await waitFor(() => {
      expect(result.current.score).toBe(0);
    });
  });

  it("SHOULD have a score of 5 WHEN all correct answer", async () => {
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
          userAnswer: "1",
        },
        {
          answers: ["1", "2", "3", "4"],
          correctAnswer: "1",
          question: "q5",
          userAnswer: "1",
        },
      ],
    });

    // WHEN / THEN
    await waitFor(() => {
      expect(result.current.score).toBe(5);
    });
  });

  it("SHOULD return lightgreen WHEN 5 correct answers", async () => {
    // GIVEN
    const { result } = await setup();

    const nbOfCorrectAnswers: number = 5;

    // WHEN
    const color = result.current.getQuizScoreColor(nbOfCorrectAnswers);

    // THEN
    expect(color).toBe("lightgreen");
  });

  it("SHOULD return lightgreen WHEN 4 correct answers", async () => {
    // GIVEN
    const { result } = await setup();

    const nbOfCorrectAnswers: number = 4;

    // WHEN
    const color = result.current.getQuizScoreColor(nbOfCorrectAnswers);

    // THEN
    expect(color).toBe("lightgreen");
  });

  it("SHOULD return yellow WHEN 3 correct answers", async () => {
    // GIVEN
    const { result } = await setup();

    const nbOfCorrectAnswers: number = 3;

    // WHEN
    const color = result.current.getQuizScoreColor(nbOfCorrectAnswers);

    // THEN
    expect(color).toBe("yellow");
  });

  it("SHOULD return yellow WHEN 2 correct answers", async () => {
    // GIVEN
    const { result } = await setup();

    const nbOfCorrectAnswers: number = 2;

    // WHEN
    const color = result.current.getQuizScoreColor(nbOfCorrectAnswers);

    // THEN
    expect(color).toBe("yellow");
  });

  it("SHOULD return red WHEN 1 correct answer", async () => {
    // GIVEN
    const { result } = await setup();

    const nbOfCorrectAnswers: number = 1;

    // WHEN
    const color = result.current.getQuizScoreColor(nbOfCorrectAnswers);

    // THEN
    expect(color).toBe("red");
  });

  it("SHOULD return red WHEN 0 correct answer", async () => {
    // GIVEN
    const { result } = await setup();

    const nbOfCorrectAnswers: number = 0;

    // WHEN
    const color = result.current.getQuizScoreColor(nbOfCorrectAnswers);

    // THEN
    expect(color).toBe("red");
  });

  it("SHOULD return transparent WHEN 42 correct answers", async () => {
    // GIVEN
    const { result } = await setup();

    const nbOfCorrectAnswers: number = 42;

    // WHEN
    const color = result.current.getQuizScoreColor(nbOfCorrectAnswers);

    // THEN
    expect(color).toBe("transparent");
  });

  it("SHOULD reset quiz config WHEN quiz is reset", async () => {
    // GIVEN
    const { result } = await setup();

    // WHEN
    act(() => result.current.resetQuiz());

    // THEN
    await waitFor(() => {
      expect(result.current.state.quizConfig).toBe(null);
    });
  });

  it("SHOULD reset quiz WHEN quiz is reset", async () => {
    // GIVEN
    const { result } = await setup();

    // WHEN
    act(() => result.current.resetQuiz());

    // THEN
    await waitFor(() => {
      expect(result.current.state.quizQuestions).toStrictEqual([]);
    });
  });

  it("SHOULD navigate to  confnig page WHEN quiz is reset", async () => {
    // GIVEN
    const { navigateSpy, result } = await setup();

    // WHEN
    act(() => result.current.resetQuiz());

    // THEN
    await waitFor(() => {
      expect(navigateSpy).toHaveBeenCalledExactlyOnceWith(`/${ROUTES.CONFIG}`);
    });
  });
});
