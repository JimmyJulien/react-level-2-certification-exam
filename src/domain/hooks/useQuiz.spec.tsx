import { UseQueryResult } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { PropsWithChildren, ReactNode, useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { QuizContext } from "../contexts/QuizContext";
import { QuizModel, QuizQuestionModel } from "../models/quiz.models";
import useQuiz from "./useQuiz";

vi.mock(import("./useGetQuestions"), () => {
  return {
    __esModule: true,
    default: () =>
      ({
        data: [
          {
            answers: ["a1", "a2", "a3", "a4"],
            correctAnswer: "a1",
            question: "q1",
          },
          {
            answers: ["b1", "b2", "b3", "b4"],
            correctAnswer: "b2",
            question: "q2",
          },
          {
            answers: ["c1", "c2", "c3", "c4"],
            correctAnswer: "c3",
            question: "q3",
          },
          {
            answers: ["d1", "d2", "d3", "d4"],
            correctAnswer: "d4",
            question: "q4",
          },
          {
            answers: ["e2", "e3", "e4", "e5"],
            correctAnswer: "e5",
            question: "q5",
          },
        ],
      }) as UseQueryResult<QuizQuestionModel[]>,
  };
});

const MockedQuizProvider = ({
  children,
  initialQuiz = null,
}: {
  children: ReactNode;
  initialQuiz?: QuizModel | null;
}) => {
  const [quiz, setQuiz] = useState<QuizModel | null>(initialQuiz);

  return (
    <QuizContext.Provider value={[quiz, setQuiz]}>
      {children}
    </QuizContext.Provider>
  );
};

describe("useQuiz", () => {
  describe("answerQuizQuestion", () => {
    it("SHOULD do nothing WHEN quiz is not defined", async () => {
      // GIVEN
      const wrapper = ({ children }: PropsWithChildren) => (
        <MockedQuizProvider initialQuiz={null}>{children}</MockedQuizProvider>
      );

      const { result } = renderHook(() => useQuiz(), { wrapper });

      const quizQuestion: QuizQuestionModel = {
        answers: ["a1", "a2", "a3", "a4"],
        correctAnswer: "a1",
        question: "q1",
        userAnswer: "a1",
      };

      const answer: string = "a2";

      // WHEN
      act(() => result.current.answerQuizQuestion(quizQuestion, answer));

      // THEN
      await waitFor(() => {
        expect(result.current.quiz).toBe(null);
      });
    });

    it("SHOULD update quiz with the new answer WHEN quiz is defined", async () => {
      // GIVEN
      const initialQuiz: QuizModel = {
        config: {
          category: { label: "c", value: "v" },
          difficulty: { label: "d", value: "easy" },
        },
        questions: [
          {
            answers: ["a1", "a2", "a3", "a4"],
            correctAnswer: "a1",
            question: "q1",
            userAnswer: "a1",
          },
          {
            answers: ["b1", "b2", "b3", "b4"],
            correctAnswer: "b2",
            question: "q2",
            userAnswer: "b1",
          },
          {
            answers: ["c1", "c2", "c3", "c4"],
            correctAnswer: "c3",
            question: "q3",
            userAnswer: "c3",
          },
          {
            answers: ["d1", "d2", "d3", "d4"],
            correctAnswer: "d4",
            question: "q4",
            userAnswer: "d4",
          },
          {
            answers: ["e2", "e3", "e4", "e5"],
            correctAnswer: "e5",
            question: "q5",
            userAnswer: "e2",
          },
        ],
      };

      const wrapper = ({ children }: PropsWithChildren) => (
        <MockedQuizProvider initialQuiz={initialQuiz}>
          {children}
        </MockedQuizProvider>
      );

      const { result } = renderHook(() => useQuiz(), { wrapper });

      const quizQuestion: QuizQuestionModel = {
        answers: ["a1", "a2", "a3", "a4"],
        correctAnswer: "a1",
        question: "q1",
        userAnswer: "a1",
      };

      const answer: string = "a2";

      // WHEN
      act(() => result.current.answerQuizQuestion(quizQuestion, answer));

      // THEN
      await waitFor(() => {
        const newQuiz: QuizModel | null = result.current.quiz;
        const updatedQuestion: QuizQuestionModel | undefined =
          newQuiz?.questions.find(
            (newQuizQuestion) =>
              newQuizQuestion.question === quizQuestion.question,
          );
        expect(updatedQuestion?.userAnswer).toBe(answer);
      });
    });
  });

  describe("resetQuiz", () => {
    it("SHOULD reset the quiz", async () => {
      // GIVEN
      const initialQuiz: QuizModel = {
        config: {
          category: { label: "c", value: "v" },
          difficulty: { label: "d", value: "easy" },
        },
        questions: [
          {
            answers: ["a1", "a2", "a3", "a4"],
            correctAnswer: "a1",
            question: "q1",
            userAnswer: "a1",
          },
          {
            answers: ["b1", "b2", "b3", "b4"],
            correctAnswer: "b2",
            question: "q2",
            userAnswer: "b1",
          },
          {
            answers: ["c1", "c2", "c3", "c4"],
            correctAnswer: "c3",
            question: "q3",
            userAnswer: "c3",
          },
          {
            answers: ["d1", "d2", "d3", "d4"],
            correctAnswer: "d4",
            question: "q4",
            userAnswer: "d4",
          },
          {
            answers: ["e2", "e3", "e4", "e5"],
            correctAnswer: "e5",
            question: "q5",
            userAnswer: "e2",
          },
        ],
      };

      const wrapper = ({ children }: PropsWithChildren) => (
        <MockedQuizProvider initialQuiz={initialQuiz}>
          {children}
        </MockedQuizProvider>
      );

      const { result } = renderHook(() => useQuiz(), { wrapper });

      // WHEN
      act(() => result.current.resetQuiz());

      // THEN
      await waitFor(() => {
        expect(result.current.quiz).toBe(null);
      });
    });
  });
});
