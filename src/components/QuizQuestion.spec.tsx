import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { QuizQuestionModel } from "../models/quiz.models";
import QuizQuestion from "./QuizQuestion";

function setup(isQuizComplete?: boolean) {
  const mockedOnPickAnswer = vi.fn();

  const props = {
    quizQuestion: {
      answers: ["a", "b", "c", "d"],
      correctAnswer: "a",
      question: "q",
    } satisfies QuizQuestionModel,
    onPickAnswer: mockedOnPickAnswer,
    isQuizComplete,
  };

  const { findAllByRole, findByRole } = render(<QuizQuestion {...props} />);

  async function getQuestion() {
    return findByRole("contentinfo");
  }

  async function getAnswerButtons() {
    return findAllByRole("button");
  }

  async function clickOnFirstAnswerButton() {
    const buttons = await getAnswerButtons();
    return userEvent.click(buttons[0]);
  }

  return {
    clickOnFirstAnswerButton,
    getQuestion,
    mockedOnPickAnswer,
  };
}

describe("QuizQuestion", () => {
  it("SHOULD pick an answer WHEN an answer button is clicked and the quiz is not complete", async () => {
    // GIVEN
    const { clickOnFirstAnswerButton, mockedOnPickAnswer } = setup(false);

    // WHEN
    await clickOnFirstAnswerButton();

    // THEN
    await waitFor(() => {
      expect(mockedOnPickAnswer).toHaveBeenCalledExactlyOnceWith("a");
    });
  });

  it("SHOULD not pick an answer WHEN an answer button is clicked and the quiz is complete", async () => {
    // GIVEN
    const { clickOnFirstAnswerButton, mockedOnPickAnswer } = setup(true);

    // WHEN
    await clickOnFirstAnswerButton();

    // THEN
    await waitFor(() => {
      expect(mockedOnPickAnswer).not.toHaveBeenCalled();
    });
  });
});
