import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { QuizStore } from "../../domain/stores/quiz.store";
import ResultPage from "./result-page.component";

const resetQuizSpy = vi.fn();

vi.mock(
  import("../../domain/hooks/use-result-page.hook"),
  async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useResultPage: () => ({
        dispatch: vi.fn(),
        getQuizScoreColor: vi.fn(),
        resetQuiz: resetQuizSpy,
        score: 3,
        state: {
          ...QuizStore.INITIAL_QUIZ_STATE,
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
        },
      }),
    };
  },
);

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

  it("SHOULD call reset quiz action WHEN create new quiz button is clicked", async () => {
    // GIVEN
    const { clickButtonCreateNewQuiz } = setup();

    // WHEN
    await clickButtonCreateNewQuiz();

    // THEN
    await waitFor(() => {
      expect(resetQuizSpy).toHaveBeenCalledOnce();
    });
  });
});
