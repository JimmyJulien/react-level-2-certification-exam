import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";
import { QuizApi } from "../api/QuizApi";
import { ApiQuizModel } from "../models/api.models";
import { QuizConfigModel, QuizQuestionModel } from "../models/quiz.models";
import useGetQuestions from "./useGetQuestions";

describe("useGetQuestions", () => {
  it("SHOULD return a quiz WHEN api responds with success", async () => {
    // GIVEN
    const config: QuizConfigModel = {
      category: { label: "c", value: "c" },
      difficulty: { label: "d", value: "d" },
    };

    const apiQuiz: ApiQuizModel = {
      response_code: 0,
      results: [
        {
          category: "c",
          correct_answer: "a1",
          difficulty: "d",
          incorrect_answers: ["a2", "a3", "a4"],
          question: "q1",
          type: "multiple",
        },
        {
          category: "c",
          correct_answer: "b2",
          difficulty: "d",
          incorrect_answers: ["b1", "b3", "b4"],
          question: "q2",
          type: "multiple",
        },
        {
          category: "c",
          correct_answer: "c3",
          difficulty: "d",
          incorrect_answers: ["c1", "c2", "c4"],
          question: "q3",
          type: "multiple",
        },
        {
          category: "c",
          correct_answer: "d4",
          difficulty: "d",
          incorrect_answers: ["d1", "d2", "d3"],
          question: "q4",
          type: "multiple",
        },
        {
          category: "c",
          correct_answer: "e1",
          difficulty: "d",
          incorrect_answers: ["e2", "e3", "e4"],
          question: "q5",
          type: "multiple",
        },
      ],
    };

    const expectedQuiz: QuizQuestionModel[] = [
      {
        answers: ["a2", "a4", "a1", "a3"],
        correctAnswer: "a1",
        question: "q1",
      },
      {
        answers: ["b1", "b2", "b3", "b4"],
        correctAnswer: "b2",
        question: "q2",
      },
      {
        answers: ["c4", "c2", "c3", "c1"],
        correctAnswer: "c3",
        question: "q3",
      },
      {
        answers: ["d4", "d2", "d3", "d1"],
        correctAnswer: "d4",
        question: "q4",
      },
      {
        answers: ["e4", "e2", "e3", "e1"],
        correctAnswer: "e1",
        question: "q5",
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

    vi.spyOn(QuizApi, "getQuiz").mockReturnValueOnce(Promise.resolve(apiQuiz));

    // WHEN
    const { result } = renderHook(() => useGetQuestions(config), {
      wrapper,
    });

    // THEN
    await waitFor(() => {
      const resultQuiz: QuizQuestionModel[] = result.current.data!;

      for (let i = 0; i < resultQuiz.length; i++) {
        const resultQuizQuestion: QuizQuestionModel = resultQuiz[i];
        const expectedQuizQuestion: QuizQuestionModel = expectedQuiz[i];

        expect(resultQuizQuestion.answers.length).toBe(
          expectedQuizQuestion.answers.length,
        );
        expect(resultQuizQuestion.answers).toEqual(
          expect.arrayContaining(expectedQuizQuestion.answers),
        );
        expect(resultQuizQuestion.correctAnswer).toBe(
          expectedQuizQuestion.correctAnswer,
        );
        expect(resultQuizQuestion.question).toBe(expectedQuizQuestion.question);
        expect(resultQuizQuestion.userAnswer).toBe(
          expectedQuizQuestion.userAnswer,
        );
      }
    });
  });
});
