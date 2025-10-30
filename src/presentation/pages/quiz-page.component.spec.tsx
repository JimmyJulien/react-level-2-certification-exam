import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { QuizQuestionModel } from "../../domain/models/quiz.models";
import { QuizStore } from "../../domain/stores/quiz.store";
import QuizPage from "./quiz-page.component";

const answerQuestionSpy = vi.fn();
const showResultSpy = vi.fn();

const QUIZ_QUESTIONS: QuizQuestionModel[] = [
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
];

vi.mock(
  import("../../domain/hooks/use-quiz-page.hook"),
  async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useQuizPage: () => ({
        answerQuestion: answerQuestionSpy,
        categories: [],
        difficulties: [],
        dispatch: vi.fn(),
        isQuizComplete: true,
        showResults: showResultSpy,
        state: {
          ...QuizStore.INITIAL_QUIZ_STATE,
          quizQuestions: QUIZ_QUESTIONS,
        },
      }),
    };
  },
);

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
  it("SHOULD render", async () => {
    setup();
  });

  it("SHOULD call answer question action WHEN an answer is clicked", async () => {
    // GIVEN
    const { clickFirstButtonOfTheFirstQuestion } = setup();

    // WHEN
    await clickFirstButtonOfTheFirstQuestion();

    // THEN
    expect(answerQuestionSpy).toHaveBeenCalledExactlyOnceWith(
      QUIZ_QUESTIONS[0],
      QUIZ_QUESTIONS[0].answers[0],
    );
  });

  it("SHOULD call show results action WHEN submit button is clicked", async () => {
    // GIVEN
    const { clickSubmitButton } = setup();

    // WHEN
    await clickSubmitButton();

    // THEN
    expect(showResultSpy).toHaveBeenCalledOnce();
  });
});
