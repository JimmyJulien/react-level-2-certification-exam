import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { QuizModel } from "../models/quiz.models";
import ROUTES from "../routing/routes";
import ResultPage from "./ResultPage";

const mockedNavigate = vi.fn();

vi.mock(import("react-router"), async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockedNavigate };
});

const mockedResetQuiz = vi.fn();

vi.mock(import("../hooks/useQuiz"), () => {
  return {
    __esModule: true,
    default: () => ({
      answerQuizQuestion: vi.fn(),
      isQuizComplete: vi.fn(),
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
      resetQuiz: mockedResetQuiz,
    }),
  };
});

function setup() {
  const { findAllByTestId, findByRole } = render(<ResultPage />);

  async function getButtonCreateNewQuiz() {
    return findByRole("button", { name: "Create a new quiz" });
  }

  async function getMainTitle() {
    return findByRole("heading", { level: 1 });
  }

  async function getQuestions() {
    return findAllByTestId("question");
  }

  async function getQuestionAnswerButtons(question: HTMLElement) {
    const questionContainer = within(question);
    return questionContainer.findAllByRole("button");
  }

  async function getScore() {
    return findByRole("presentation");
  }

  async function clickButtonCreateNewQuiz() {
    const buttonCreateQuiz = await getButtonCreateNewQuiz();
    await userEvent.click(buttonCreateQuiz);
  }

  return {
    clickButtonCreateNewQuiz,
    getButtonCreateNewQuiz,
    getMainTitle,
    getQuestionAnswerButtons,
    getQuestions,
    getScore,
  };
}

describe("ResultPage", () => {
  it("SHOULD have main title RESULTS", async () => {
    // GIVEN/WHEN
    const { getMainTitle } = setup();

    // THEN
    const mainTitle = await getMainTitle();
    expect(mainTitle.textContent).toBe("RESULTS");
  });

  it("SHOULD have 5 questions with 4 buttons for each question", async () => {
    // GIVEN/WHEN
    const { getQuestionAnswerButtons, getQuestions } = setup();

    // THEN
    const questions = await getQuestions();
    expect(questions.length).toBe(5);

    questions.forEach(async (question) => {
      const answerButton = await getQuestionAnswerButtons(question);
      expect(answerButton.length).toBe(4);
    });
  });

  it("SHOULD have a score of 3 on 5", async () => {
    // GIVEN/ WHEN
    const { getScore } = setup();

    // THEN
    const score = await getScore();
    expect(score.textContent).toBe("You scored 3 out of 5");
  });

  it("SHOULD reset quiz and navigate to config WHEN create new quiz button is clicked", async () => {
    // GIVEN
    const { clickButtonCreateNewQuiz } = setup();

    // WHEN
    await clickButtonCreateNewQuiz();

    // THEN
    await waitFor(() => {
      expect(mockedResetQuiz).toHaveBeenCalledOnce();
      expect(mockedNavigate).toHaveBeenCalledExactlyOnceWith(
        `/${ROUTES.CONFIG}`,
      );
    });
  });
});
