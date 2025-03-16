import { UseQueryResult } from "@tanstack/react-query";
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { QuizModel, QuizQuestionModel } from "../models/quiz.models";
import { SelectOptionModel } from "../models/select.models";
import ROUTES from "../routing/routes";
import QuizPage from "./QuizPage";

const mockedNavigate = vi.fn();

vi.mock(import("react-router"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useSearchParams: () => {
      const params = new URLSearchParams({
        category: "c",
        difficulty: "d",
      });
      return [params, () => {}];
    },
  };
});

vi.mock(import("./../hooks/useGetCategories"), () => {
  return {
    __esModule: true,
    default: () =>
      ({
        data: [
          { label: "category 1", value: "value1" },
          { label: "category 2", value: "value2" },
          { label: "category 3", value: "value3" },
        ],
      }) as UseQueryResult<SelectOptionModel[]>,
  };
});

vi.mock(import("./../hooks/useGetDifficulties"), () => {
  return {
    __esModule: true,
    default: () => ({
      data: [
        { label: "difficulty1", value: "value1" },
        { label: "difficulty2", value: "value2" },
        { label: "difficulty3", value: "value3" },
      ] as SelectOptionModel[],
    }),
  };
});

const mockedAnswerQuizQuestion = vi.fn();

vi.mock(import("../hooks/useQuiz"), () => {
  return {
    __esModule: true,
    default: () => ({
      answerQuizQuestion: mockedAnswerQuizQuestion,
      isQuizError: false,
      isQuizLoading: false,
      quiz: {
        config: {
          category: { label: "c", value: "v" },
          difficulty: { label: "d", value: "v" },
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
      } satisfies QuizModel,
      setQuizConfig: vi.fn(),
      resetQuiz: vi.fn(),
    }),
  };
});

function setup() {
  const { findAllByTestId, findByRole } = render(<QuizPage />);

  async function getSubmitButton() {
    return findByRole("button", { name: "Submit" });
  }

  async function clickSubmitButton() {
    const submitButton = await getSubmitButton();
    return userEvent.click(submitButton);
  }

  async function getQuestions() {
    return findAllByTestId("question");
  }

  async function getQuestionAnswerButtons(question: HTMLElement) {
    const questionContainer = within(question);
    return questionContainer.findAllByRole("button");
  }

  async function clickFirstButtonOfTheFirstQuestion() {
    const questions = await getQuestions();
    const firstQuestionButtons = await getQuestionAnswerButtons(questions[0]);
    return userEvent.click(firstQuestionButtons[0]);
  }

  return { clickSubmitButton, clickFirstButtonOfTheFirstQuestion };
}

describe("QuizPage", () => {
  it("SHOULD change the user answer to the first question WHEN the first answer button is clicked", async () => {
    // GIVEN
    const { clickFirstButtonOfTheFirstQuestion } = setup();

    const expectedQuizQuestion: QuizQuestionModel = {
      answers: ["a1", "a2", "a3", "a4"],
      correctAnswer: "a1",
      question: "q1",
      userAnswer: "a1",
    };

    // WHEN
    await clickFirstButtonOfTheFirstQuestion();

    // THEN
    await waitFor(() => {
      expect(mockedAnswerQuizQuestion).toHaveBeenCalledExactlyOnceWith(
        expectedQuizQuestion,
        expectedQuizQuestion.answers[0],
      );
    });
  });

  it("SHOULD navigate to result page WHEN button Submit is clicked", async () => {
    // GIVEN
    const { clickSubmitButton } = setup();

    // WHEN
    await clickSubmitButton();

    // THEN
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledExactlyOnceWith(
        `/${ROUTES.RESULT}`,
      );
    });
  });
});
