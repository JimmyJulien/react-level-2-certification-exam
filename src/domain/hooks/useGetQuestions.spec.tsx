import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";
import { QuizFetchApi } from "../../infrastructure/api/QuizFetchApi";
import { QuizConfigModel, QuizQuestionModel } from "../models/quiz.models";
import useGetQuestions from "./useGetQuestions";

describe("useGetQuestions", () => {
  it("SHOULD get questions", async () => {
    // GIVEN
    const config: QuizConfigModel = {
      category: { label: "C", value: "c" },
      difficulty: { label: "D", value: "hard" },
    };

    const expectedQuestions: QuizQuestionModel[] = [
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
    ];

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const wrapper = ({ children }: PropsWithChildren) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    vi.spyOn(QuizFetchApi, "getQuestions").mockReturnValueOnce(
      Promise.resolve(expectedQuestions),
    );

    // WHEN
    const { result } = renderHook(() => useGetQuestions(config), { wrapper });

    // THEN
    await waitFor(() => {
      result.current.data?.forEach((question) => {
        expect(question).toStrictEqual({
          ...question,
          answers: expect.arrayContaining(question.answers),
        });
      });
    });
  });
});
